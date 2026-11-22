const exponent = Buffer.allocUnsafe(8).fill(1);
const exception = new Array(16);
const space = new Array(32).map(() => new Array(16));
const domain = new Array(128 * 4);
const dimension = new Array(128);
const node = new Array(64);
for (let i = 0; i < dimension.length; i++) {
    // Single code
    const charCode = String.fromCharCode(i);
    switch (i % 4) {
        case 3:
            console.log("case 3", charCode, charCode.charCodeAt(0), i ^ 60);
            break;
        case 2:
            console.log("case 2", charCode, charCode.charCodeAt(0), i ^ 60);
            break;
        case 1:
            console.log("case 1", charCode, charCode.charCodeAt(0), i ^ 60);
            break;
        case 0:
            console.log("case 0", charCode, charCode.charCodeAt(0), i ^ 60);
            break;
        default:
            console.log("case default", charCode, charCode.charCodeAt(0), i ^ 60);
    }
}
