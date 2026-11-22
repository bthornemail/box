"use strict";

export default class SearchState {
  constructor(guess, base, cached_digit_depth) {
    guess = BigInt(guess);
    base = BigInt(base);
    this.base = base;

    this.digit_count = count_digits_in_base(guess, base);
    this.higher = base ** this.digit_count;

    this.cached_digit_depth = BigInt(cached_digit_depth);
    this.digit_value_cache = new Map();

    this.guess = null;  // Set this directly before calling check01().
    this.max_digit_depth = 0;
  }

  one_digit_higher() {
    this.digit_value_cache.set(this.digit_count, this.higher);
    // Can't cache everything!
    this.digit_value_cache.delete(this.digit_count - this.cached_digit_depth);
    console.assert(this.digit_value_cache.size <= this.cached_digit_depth,
      "Cache size should be bounded.");

    this.higher *= this.base;
    this.digit_count += 1n;
  }

  get_one_digit_lower(current_digit_index, current_digit_value) {
    let lower_digit_index = BigInt(current_digit_index) - 1n;
    let value = this.digit_value_cache.get(lower_digit_index);
    if (value) {
      return value;
    }
    value = current_digit_value / this.base;
    if (this.digit_count - 1n - lower_digit_index < this.cached_digit_depth) {
      this.digit_value_cache.set(lower_digit_index, value);
    }
    return value;
  }

  get_high_digit_value() {
    return this.get_one_digit_lower(this.digit_count, this.higher);
  }
}