export function roundTo(num: number, digits: number) {
  const factor = 10 ** digits;
  return Math.round(num * factor) / factor;
}
