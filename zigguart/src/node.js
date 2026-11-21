import { nodeJSONtemplate  } from "../src/template/templates.js"; 

export function applyChanges(prompt, tags) {
    console.table("prompt",prompt.split(" "));
    console.table("proposed changes",prompt.split(" ").length);
    console.table("tags",tags); 
    return true;
}
export function getChanges(element, prompt) {
    const bBox = element.getBBox();
    // const ctm = element.getCTM();
    // const screenCTM = element.getScreenCTM();
    // console.table("bbox", { x: bBox.x, y: bBox.y, width: bBox.width, height: bBox.height });
    // console.table("ctm", { a: ctm.a, b: ctm.b, c: ctm.c, d: ctm.d, e: ctm.e });
    // console.table("screenCTM", { a: screenCTM.a, b: screenCTM.b, c: screenCTM.c, d: screenCTM.d, e: screenCTM.e });
    const tag = nodeJSONtemplate`{ node:${element.id},x:${bBox.x},y:${bBox.y},width:${bBox.width},height:${bBox.height} }`;
    return tag;

}