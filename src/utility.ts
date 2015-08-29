/**
 * utility.js
 */

export function forEach(arr: any[], callback: Function, ctx?: any): void {
  let i   = 0;
  let max = arr.length;

  for (; i < max; i += 1) {
    callback.call(ctx, arr[i], i, arr);
  }
}

export function trim(str: string): string {
  // refs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
  let rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  return str.replace(rtrim, '');
}
