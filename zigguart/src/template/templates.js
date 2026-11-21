export function template(str, ...params) {
    // console.log("Cooked:", str.join());
    // console.log("Raw:", str.raw.join());
    // console.log("Params:", params.join());
    // We can even return a string built using a template literal
    function getValue(d, i, j) {
        if (j === 0) {
            return d.x;
        }
        return d[1];
    }

    return `
    Cooked:
    ${str.join()}

    Raw:
    ${str.raw.join()}

    Params:
    ${params.join()}
    `;
}
export function nodeJSONtemplate(str, id, x, y, w, h) {
    console.log("Cooked:", str.join());
    console.log("Raw:", str.raw.join());
    // We can even return a string built using a template literal
    return `${str[0]}${id.slice(4)}${str[1]}${x}${str[2]}${y}${str[3]}${w}${str[4]}${h}${str[5]}`;
}