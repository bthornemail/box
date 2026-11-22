
import { applyChanges, getChanges } from "../src/node.js";
import { template } from "../src/template/templates.js";
import { getPointer } from "../src/pointer.events.js";
async function loadSVGElement(url, containerId) {
    const response = await fetch(url);
    const svgText = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, 'image/svg+xml');
    const svgElement = doc.querySelector('svg');

    // Example: Modify an attribute before appending
    svgElement.setAttribute('class', 'custom-svg-class');
    document.getElementById(containerId).appendChild(svgElement);
}
export async function joinAndCompose(nodes){
    for (const node of nodes) {
        console.log(node.id);
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
    }
}
loadSVGElement("images/ziggurat.dot.svg", "root").then(() => {
    const nodes = document.querySelectorAll(".node");
    joinAndCompose(nodes);
    for (const node of nodes) {
        getPointer(node);
    }
});
