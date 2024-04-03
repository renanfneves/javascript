export const PI = 3.14159265359;
export function pow(base, exponent) {
  if(exponent === 0) return 1;
  return base * pow(base, exponent - 1);
}
