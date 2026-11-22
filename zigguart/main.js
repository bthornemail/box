
import { applyChanges, getChanges } from "../src/node.js";
import { template } from "../src/template/templates.js";
import { getPointer } from "../src/pointer.events.js";
import loadSVGElement from "./core/load_svg_element.js";

loadSVGElement("images/ziggurat.dot.svg", "root").then(() => {
    const nodes = document.querySelectorAll(".node");
    for (const node of nodes) {
        console.log(node.id);
        getPointer(node)
        /*
        node.addEventListener("click", (e) => {
            e.preventDefault();
            const confirm = window.confirm(`Would you like to modify:\n${node.id}`);
            if (!confirm) return;
            const tags = getChanges(node, confirm);
            const prompt = window.prompt(`Node:${node.id}\nTags:\n${tags}`);
            if (!prompt) return;
            const hasChanged = applyChanges(prompt, tags);
            alert(`Changes ${hasChanged ? "applied" : "not applied"} to ${tags}.`);
        });
        */
    }
});