function* infinite() {
    let index = 0;

    while (true) {

        function* powers(n) {
            // Endless loop to generate
            for (let current = n; ; current *= n) {
                yield current;
            }
        }

        for (const power of powers(2)) {
            // Controlling generator
            if (power > 32) {
                //continue;
            }
            yield power;
            // 2
            // 4
            // 8
            // 16
            // 32
        }
        index++;
    }

}


if (import.meta.url === `file://${process.argv[1]}`) {

    const generator = infinite(); // "Generator { }"

    for (const power of process.argv[2]) {
        console.log(power);
        console.log(generator.next().value); // 0
    }
    console.log('This module is being run directly');
}