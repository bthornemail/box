"use strict";

export function check01(search) {
    const base = search.base;
    while (search.higher <= search.guess) {
        // Maintain search.higher as the next higher digit's place value,
        // assuming the digit is 1.
        search.one_digit_higher();
    }

    let digit_depth = 0;
    let passed = true;
    let high = search.get_high_digit_value();
    let r1 = search.guess;
    while (high > 1) {
        digit_depth += 1;
        if (r1 >= high) {
            const r2 = r1 - high;
            if (r2 >= high) {
                passed = false;
                break;
            }
            r1 = r2;
        }
        high = search.get_one_digit_lower(
            search.digit_count - BigInt(digit_depth),
            high);
    }
    passed = passed && (r1 <= 1);
    search.max_digit_depth = Math.max(search.max_digit_depth, digit_depth);

    if (!passed) {
        search.guess = search.guess - r1 + high * base;
    }
    return passed;
}


export function search01(bases, initial_guess, max_guess = null, cached_digit_depth = 100) {
    let guess = BigInt(initial_guess);
    let search_states = [];
    for (const base of bases) {
        search_states.push(new SearchState(guess, base, cached_digit_depth));
    }

    const print_digits_difference = 100n;
    let decimal_digit_count = count_digits_in_base(guess, 10);
    decimal_digit_count -= decimal_digit_count % print_digits_difference;
    let print_value_threshold = 10n ** BigInt(decimal_digit_count);


    let passing = false;
    let print_iteration_count = 0;
    while (!passing && (max_guess == null || guess <= max_guess)) {
        // Condition to display progress.
        while (guess >= print_value_threshold) {
            let max_digit_depths = [];
            for (let search of search_states) {
                max_digit_depths.push(search.max_digit_depth);
                search.max_digit_depth = 0;
            }
            console.log("Searched " + decimal_digit_count + " decimal digits." +
                " Checked +" + print_iteration_count + " iterations." +
                " Descended [" + max_digit_depths + "] digits max.");
            print_value_threshold *= 10n ** BigInt(print_digits_difference);
            decimal_digit_count += print_digits_difference;
            print_iteration_count = 0;
        }
        print_iteration_count += 1;

        // Run check for all bases.
        passing = true;
        for (let search of search_states) {
            search.guess = guess;
            if (!check01(search)) {
                passing = false;
            }
            guess = search.guess;
        }
    }
    if (!passing) {
        return null;
    }
    return guess;
}

if (import.meta.url === `file://${process.argv[1]}`) {
    // Find 82000.
    // let solution = search01([3,4,5], 2);
    // Find 82005.
    // let solution = search01([4,5], 82002);


    // Search a little farther.
    // let solution = search01([3,4,5], 82001, 10n**30000n, 35);
    // let solution = search01([4,5], 82006, 10n**20000n, 133);

    // Search a lot farther (no limit).
    //let solution = search01([3,4,5], 82001, null, 155);
    //let solution = search01([4,5], 82006, null, 155);

    // Search a lot farther (no limit) from where I stopped:
    //let solution = search01([3,4,5], 10n**11000000n, null, 155);
    //let solution = search01([4,5], 10n**4600000n, null, 155);

    if (solution != null) {
        console.log(solution);
    } else {
        console.log("No solution found.");
    }
}