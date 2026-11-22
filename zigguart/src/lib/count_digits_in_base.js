"use strict";


/**
 * Count digits of a number written in a certain base.
 *
 * Like mpz_sizeinbase() but slower and exact.
 */
export default function count_digits_in_base(x, base) {
  base = BigInt(base);
  x = BigInt(x);
  let place_values = []
  let high = base;
  while (high <= x) {
    place_values.push(high);
    high *= high;
  }
  place_values.reverse();
  high = 1n;
  let count = 0n;
  for (const place_value of place_values) {
    count = (count << 1n);
    const higher = high * place_value;
    if (higher <= x) {
      high = higher;
      count |= 1n;
    }
  }
  return count + 1n;
}