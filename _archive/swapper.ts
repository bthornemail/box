
function prompt(data: Buffer = Buffer.allocUnsafe(64).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ")) {

    return function command(inner, outer, extant, delta) {
        try {
            try {
                //delta({ cause: data.slice(0, 16) });
                throw new Error(`position: ${data.slice(0, 8)}\n`, { cause: data.slice(0, 8).map((v, i) => delta[i] ^ v) });
            } catch (ex) {
                console.error(`inner: ${data.slice(0, 10)}\n`, ex.message, "cause: ", ex.cause?.slice(4, 8).toString());

                inner(ex);
                throw ex;
            } finally {
                console.log(`<finally: ${data.slice(0, 16)}>\n`);
                extant({ message: "finally", cause: data.slice(0, 16) });
            }
        } catch (ex) {
            console.error(`outer: ${data.slice(10, 36)}\n`, ex.message, "cause: ", ex.cause?.slice(4, 8).toString());
            outer(ex);
        }
    }
    // Logs:
    // "inner" "oops"
    // "finally"
    // "outer" "oops"
}
const _$ = prompt();
const command = _$(
    (ex) => console.log("0", ex.cause),
    (ex) => console.log("1", ex.cause),
    (ex) => console.log("2", ex.cause),
    Buffer.allocUnsafe(64).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ").swap32()
)
_$(
    (ex) => console.log("0", ex.cause),
    (ex) => console.log("1", ex.cause),
    (ex) => console.log("2", ex.cause),
    Buffer.allocUnsafe(64).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ").swap32()
)
_$(
    (ex) => console.log("0", ex.cause),
    (ex) => console.log("1", ex.cause),
    (ex) => console.log("2", ex.cause),
    Buffer.allocUnsafe(64).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ").swap32()
)
_$(
    (ex) => console.log("0", ex.cause),
    (ex) => console.log("1", ex.cause),
    (ex) => console.log("2", ex.cause),
    Buffer.allocUnsafe(64).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ").swap32()
)
_$(
    (ex) => console.log("0", ex.cause),
    (ex) => console.log("1", ex.cause),
    (ex) => console.log("2", ex.cause),
    Buffer.allocUnsafe(64).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ").swap32()
)
_$(
    (ex) => console.log("0", ex.cause),
    (ex) => console.log("1", ex.cause),
    (ex) => console.log("2", ex.cause),
    Buffer.allocUnsafe(64).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ").swap32()
)
_$(
    (ex) => console.log("0", ex.cause),
    (ex) => console.log("1", ex.cause),
    (ex) => console.log("2", ex.cause),
    Buffer.allocUnsafe(64).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ").swap32()
)
// reversed
_$(
    (ex) => console.log("0", ex.cause),
    (ex) => console.log("1", ex.cause),
    (ex) => console.log("2", ex.cause),
    Buffer.allocUnsafe(64).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ").reverse()
)
_$(
    (ex) => console.log("0", ex.cause),
    (ex) => console.log("1", ex.cause),
    (ex) => console.log("2", ex.cause),
    Buffer.allocUnsafe(64).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ").reverse().swap16()
)
_$(
    (ex) => console.log("0", ex.cause),
    (ex) => console.log("1", ex.cause),
    (ex) => console.log("2", ex.cause),
    Buffer.allocUnsafe(64).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ").reverse().swap16().swap16()
)
_$(
    (ex) => console.log("0", ex.cause),
    (ex) => console.log("1", ex.cause),
    (ex) => console.log("2", ex.cause),
    Buffer.allocUnsafe(64).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ").reverse().swap32()
)
_$(
    (ex) => console.log("0", ex.cause),
    (ex) => console.log("1", ex.cause),
    (ex) => console.log("2", ex.cause),
    Buffer.allocUnsafe(64).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ").reverse().swap32().swap32()
)
_$(
    (ex) => console.log("0", ex.cause),
    (ex) => console.log("1", ex.cause),
    (ex) => console.log("2", ex.cause),
    Buffer.allocUnsafe(64).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ").reverse().swap64()
)
_$(
    (ex) => console.log("0", ex.cause),
    (ex) => console.log("1", ex.cause),
    (ex) => console.log("2", ex.cause),
    Buffer.allocUnsafe(64).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ").reverse().swap64().swap64()
)

// Single character
const char = "<";
const asciiValue = char.charCodeAt(0);
console.log(asciiValue); // Output: 65

// Entire string to an array of ASCII codes
const str = "<=>?";
const asciiArray = Array.from(str).map(char => char.charCodeAt(0));
console.log(asciiArray); // Output: [72, 101, 108, 108, 111]

// Single code
const charCode = String.fromCharCode(63);
console.log(charCode); // Output: "A"

// Array of ASCII codes to a string
const asciiCodes = new Array(128).map((_, i) => i ^ 60);
const text = String.fromCharCode(...asciiCodes);
console.log(text); // Output: "Hello"
