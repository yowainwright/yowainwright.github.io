#!/bin/sh

# The follow script is built to get you up and running with the right local development environment locally.
# However, it is highly recommended to use a Dev Container if possible!
# This is a key way to enusre local development is consistent across a team of engineers.

if [ ! -f .env ]; then
  cp .env_starter .env
  echo "created .env file from .env_starter"
  export $(grep -v '^#' .env | xargs)
else
  export $(grep -v '^#' .env | xargs)
fi

# Check to see if Homebrew, Go, and Pre-commit are installed, and install it if it is not
HAS_N=$(command -v n >/dev/null)
HAS_PNPM=$(command -v pnpm >/dev/null)



if $HAS_N; then
  if [ "$NODE_ENV" == "local" ]; then
    version=$(cat .node-version)
    n $version
  fi
  echo 'node version is up-to-date'
  exit 0
else
  echo "Please install N or ensure your version matches the .node-version file"
  exit 1
fi

PNPM_MSG="Please install PNPM or ensure your version matches the pnpm version within the .env file"

# load pnpm
if $HAS_PNPM; then
  PNPM_LOADED_VERSION=$(command pnpm --version)
  if [ "$PNPM_LOADED_VERSION" != "$PNPM_VERSION" ]; then
    read -r -p "pnpm versions are out of snyc. Run 'npm install -g pnpm@${PNPM_VERSION}'? [Y/n]" response
    response=${response,,}
    if [ $response = "y" ] || [ -z $response ]; then
      npm install -g pnpm@$PNPM_VERSION
      echo 'pnpm version updated globally'
      exit 0
    else
      echo $PNPM_MSG
    fi;
  else
    echo "pnpm version is up-to-date"
    exit 0
  fi
  exit 1
else
  echo $PNPM_MSG
  exit 1
fi
