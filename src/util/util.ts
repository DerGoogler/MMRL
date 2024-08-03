export function isLiteralObject<O = object>(a: O) {
  return !!a && a.constructor === Object;
}
