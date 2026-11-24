
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
if ('WebSocket' in window) {
    var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
    var address = protocol + window.location.host + window.location.pathname + '/ws';
    var socket = new WebSocket(address);
    let counter = 0;
    socket.onmessage = function (msg) {
        console.log(msg + " message count " + counter)
        // if (msg.data == 'reload') window.location.reload();
        // if (msg.data == 'reload') window.location.reload();
        // else if (msg.data == 'refreshcss') refreshCSS();
    };
    console.log('Proxy WebSocket enabled.');
    socket.onopen = function () {
        console.log('Proxy WebSocket opened.');
        socket.send('hello' + counter);
        socket.dispatchEvent(new Event('listening', {
            bubbles: true, cancelable: true,
            data: 'listening',
            type: 'listening',
            content: 'listening',
            composed: true,
        }));
    };
    socket.addEventListener("listening", function (e) {
        console.log('Proxy WebSocket event data:', e);
        console.log('Proxy WebSocket listening.');
    });
    socket.onclose = function () {
        console.log('Proxy WebSocket closed.');
    };
    // Create a counter for Canvas A
    // // Redraw Canvas A counter
    // function redrawCanvasA() {
    //     ctxA.clearRect(0, 0, canvasA.width, canvasA.height);
    //     ctxA.font = "24px Verdana";
    //     ctxA.textAlign = "center";
    //     ctxA.fillText(counter, canvasA.width / 2, canvasA.height / 2);
    // }
    setInterval(() => {
        // redrawCanvasA();
        counter++;
    }, 100);
}
