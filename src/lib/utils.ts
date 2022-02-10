export function trimSrc(src: string) {
  return src.split(/[?#]/)[0];
}
