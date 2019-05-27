// Allows stuf.with.dots@something.something
export function isEmailValid(email): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}