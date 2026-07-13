#!/bin/bash
set -uo pipefail

TAILSCALE_APP="/Applications/Tailscale.app/Contents/MacOS/Tailscale"
REMOTE_ROOT=".offload"
SSH_OPTS=(-o BatchMode=yes -o ConnectTimeout=3 -o StrictHostKeyChecking=accept-new)
PROBE_SCRIPT='
ncpu=$(sysctl -n hw.ncpu)
load=$(sysctl -n vm.loadavg | awk "{print \$2}")
mem_gb=$(( $(sysctl -n hw.memsize) / 1073741824 ))
free_pages=$(vm_stat | awk "/Pages free/ {print \$3+0}")
free_gb=$(( free_pages * 16384 / 1073741824 ))
echo "$ncpu $load $mem_gb $free_gb"
'

tailscale_bin() {
  command -v tailscale 2>/dev/null && return 0
  [ -x "$TAILSCALE_APP" ] && echo "$TAILSCALE_APP" && return 0
  return 1
}

tailscale_status() {
  "$(tailscale_bin)" status 2>/dev/null
}

self_ip() {
  "$(tailscale_bin)" ip -4 2>/dev/null | head -1
}

parse_online_macs() {
  awk -v self="$1" '$1 != self && $4 == "macOS" && $5 !~ /offline/ { print $2 }'
}

online_macs() {
  tailscale_bin >/dev/null || { echo "[offload] tailscale not found" >&2; return 1; }
  tailscale_status | parse_online_macs "$(self_ip)"
}

ssh_probe() {
  ssh "${SSH_OPTS[@]}" "$1" /bin/bash -s <<<"$PROBE_SCRIPT" 2>/dev/null
}

ssh_ok() {
  ssh "${SSH_OPTS[@]}" "$1" true 2>/dev/null
}

port_open() {
  nc -z -G 3 "$1" 22 >/dev/null 2>&1
}

copy_key() {
  ssh-copy-id -o StrictHostKeyChecking=accept-new "$1"
}

run_remote() {
  ssh "${SSH_OPTS[@]}" "$1" "zsh -l -s" <<<"$2"
}

sync_project() {
  rsync -az --delete -e "ssh ${SSH_OPTS[*]}" "$2/" "$1:$REMOTE_ROOT/$3/"
}

pull_artifacts() {
  rsync -az -e "ssh ${SSH_OPTS[*]}" "$1:$REMOTE_ROOT/$2/$3/" "$4/$3/"
}

probe_all() {
  local dir="$1" host
  shift
  for host in "$@"; do
    ssh_probe "$host" > "$dir/$host" &
  done
  wait
}

format_host_report() {
  local host="$1" line="${2:-}" ncpu load mem free
  if [ -z "$line" ]; then
    echo "[offload] $host: unreachable (run offload.sh setup)"
    return 0
  fi
  read -r ncpu load mem free <<<"$line"
  echo "[offload] $host: ${ncpu} cores, load ${load}, ${free}/${mem}GB free"
}

rank_hosts() {
  awk '
    { ratio = $3 / $2 }
    best == "" || ratio < min { min = ratio; best = $1 }
    END { if (best != "") print best }
  '
}

project_root() {
  git rev-parse --show-toplevel 2>/dev/null || pwd
}

build_remote_script() {
  local name="$1"
  shift
  printf "cd %s/%s && " "$REMOTE_ROOT" "$name"
  printf "%q " "$@"
}

parse_run_args() {
  RUN_HOST=""
  RUN_PULL=""
  RUN_ARGS=()
  while [ $# -gt 0 ]; do
    case "$1" in
      --host) RUN_HOST="$2"; shift 2 ;;
      --pull) RUN_PULL="$2"; shift 2 ;;
      --) shift; RUN_ARGS=("$@"); return 0 ;;
      *) RUN_ARGS+=("$1"); shift ;;
    esac
  done
}

ensure_key() {
  ls "$HOME"/.ssh/id_*.pub >/dev/null 2>&1 && return 0
  ssh-keygen -t ed25519 -N "" -f "$HOME/.ssh/id_ed25519"
}

report_closed_port() {
  echo "[offload] $1: port 22 closed — enable Remote Login on that machine:"
  echo "          System Settings > General > Sharing > Remote Login"
  echo "          or on that machine: sudo systemsetup -setremotelogin on"
}

setup_host() {
  local host="$1"
  ssh_ok "$host" && { echo "[offload] $host: ready"; return 0; }
  port_open "$host" || { report_closed_port "$host"; return 0; }
  echo "[offload] $host: copying ssh key (enter that machine's password)"
  copy_key "$host"
}

cmd_setup() {
  local hosts host
  ensure_key
  hosts=$(online_macs) || return 1
  [ -z "$hosts" ] && { echo "[offload] no online macs in tailnet"; return 1; }
  for host in $hosts; do
    setup_host "$host"
  done
  echo ""
  cmd_status
}

collect_probes() {
  local dir="$1" host line
  shift
  for host in "$@"; do
    line=$(cat "$dir/$host" 2>/dev/null)
    [ -n "$line" ] && echo "$host $line"
  done
  return 0
}

cmd_status() {
  local hosts tmp host report
  hosts=$(online_macs) || return 0
  [ -z "$hosts" ] && { echo "[offload] no online macs in tailnet"; return 0; }
  tmp=$(mktemp -d)
  probe_all "$tmp" $hosts
  report=$(for host in $hosts; do
    format_host_report "$host" "$(cat "$tmp/$host" 2>/dev/null)"
  done)
  rm -rf "$tmp"
  echo "$report"
}

best_host() {
  local hosts tmp best
  hosts=$(online_macs) || return 1
  [ -z "$hosts" ] && return 1
  tmp=$(mktemp -d)
  probe_all "$tmp" $hosts
  best=$(collect_probes "$tmp" $hosts | rank_hosts)
  rm -rf "$tmp"
  [ -n "$best" ] && echo "$best"
}

run_on_host() {
  local host="$1" pull="$2" root name script exit_code
  shift 2
  root=$(project_root)
  name=$(basename "$root")
  echo "[offload] syncing $name -> $host" >&2
  sync_project "$host" "$root" "$name" || return 1
  script=$(build_remote_script "$name" "$@")
  echo "[offload] running on $host: $*" >&2
  run_remote "$host" "$script"
  exit_code=$?
  [ -n "$pull" ] && pull_artifacts "$host" "$name" "$pull" "$root"
  return $exit_code
}

cmd_run() {
  parse_run_args "$@"
  [ ${#RUN_ARGS[@]} -eq 0 ] && { usage; return 1; }
  local host="${RUN_HOST:-$(best_host)}"
  [ -z "$host" ] && { echo "[offload] no reachable host — run offload.sh setup" >&2; return 1; }
  run_on_host "$host" "$RUN_PULL" "${RUN_ARGS[@]}"
}

usage() {
  echo "usage: offload.sh <command>"
  echo "  setup                              trust and verify every online mac in the tailnet"
  echo "  status                             report cores, load, and free memory per host"
  echo "  hosts                              list online mac hostnames"
  echo "  best                               print the least-loaded host"
  echo "  run [--host h] [--pull dir] -- cmd rsync project to best host and run cmd there"
}

main() {
  local cmd="${1:-status}"
  [ $# -gt 0 ] && shift
  case "$cmd" in
    setup) cmd_setup "$@" ;;
    status) cmd_status "$@" ;;
    hosts) online_macs ;;
    best) best_host ;;
    run) cmd_run "$@" ;;
    *) usage; return 1 ;;
  esac
}

if [[ "${BASH_SOURCE[0]}" == "$0" ]]; then
  main "$@"
fi
