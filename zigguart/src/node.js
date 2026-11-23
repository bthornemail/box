"use strict";

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

export function getState(nodeDomElement, nodeIndex){
    
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