
import { applyChanges, getChanges } from "../src/node.js";
import { template } from "../src/template/templates.js";
import { getPointer } from "../src/pointer.events.js";
import loadSVGElement from "../src/lib/load.svg.element.js";
import proxy from "../src/proxy.js";
export async function joinAndCompose(nodes) {
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
export function loadArticles() {
    const articles = document.querySelectorAll("article");
    for (const article of articles) {
        console.log(article.id);
        document.getElementById(article.id).removeAttribute("hidden");
    }

}
loadSVGElement("images/ziggurat.svg", "root").then(() => {
    const nodes = document.querySelectorAll(".node");
    joinAndCompose(nodes);
    // loadArticles();
    for (const node of nodes) {
        getPointer(node);
    }
});

proxy()