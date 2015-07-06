/**
 * utility.js
 */

export function forEach(arr, callback, ctx) {
  let i   = 0;
  let max = arr.length;

  for (; i < max; i += 1) {
    callback.call(ctx, arr[i], i, arr);
  }
}
