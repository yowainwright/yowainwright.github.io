export function formatCount(count: number): string {
  if (count < 1000) {
    return count.toString();
  }

  if (count < 10000) {
    const k = count / 1000;
    return `${k.toFixed(1).replace(/\.0$/, '')}k`;
  }

  if (count < 1000000) {
    const k = count / 1000;
    return `${Math.floor(k)}k`;
  }

  if (count < 10000000) {
    const m = count / 1000000;
    return `${m.toFixed(1).replace(/\.0$/, '')}m`;
  }

  const m = count / 1000000;
  return `${Math.floor(m)}m`;
}
