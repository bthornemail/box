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

const generator = infinite(); // "Generator { }"

console.log(generator.next().value); // 0
console.log(generator.next().value); // 1
console.log(generator.next().value); // 2

function prompt() {
    return function command() {
        try {
            try {
                throw new Error("oops");
            } catch (ex) {
                console.error("inner", ex.message);
                throw ex;
            } finally {
                console.log("finally");
            }
        } catch (ex) {
            console.error("outer", ex.message);
        }
    }
    // Logs:
    // "inner" "oops"
    // "finally"
    // "outer" "oops"
}
prompt();
