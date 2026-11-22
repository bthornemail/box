// Random tree
// import { getPointer } from "../src/pointer.events.js";
// import loadSVGElement from "./core/load_svg_element.js";

const N = 300;

const nodes = [...Array(N).keys()].map(i => ({ id: i }));

loadSVGElement("images/ziggurat.dot.svg", "root").then(() => {
  nodes = document.querySelectorAll(".node");
  console.degbug(nodes)
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
  // const links =[]
  const links = [...Array(N).keys()]
    .filter(id => id)
    .map(id => ({
      source: id,
      target: Math.round(Math.random() * (id - 1))
    }));

  // function sumArray(arr) {
  //   let sum = 0;
  //   let sum2 = 0;
  //   for (let i = 0; i < arr.length; i++) {

  //     sum += arr[i];
  //     for (let j = 0; j < arr.length; j++) {
  //       sum2 += arr[j];
  //       console.log(i, j);
  //     }
  //   }
  //   return sum + sum2;
  // }

  // console.time('Sum Nodes');
  // sumArray(nodes);
  // console.timeEnd('Sum Nodes');
  // console.time('Sum Links');
  // sumArray(links);
  // console.timeEnd('Sum Links');

  const gData = {
    nodes,
    links
  };

  // Example usage:
  // parseAudioBasic('sine_440hz.au');

  const elem = document.getElementById('3d-graph');

  const distance = 1400;

  let isRotationActive = true;

  const Graph = new ForceGraph3D(elem)
    .graphData(gData)
    .enableNodeDrag(false)
    .enableNavigationControls(true)
    .showNavInfo(false)
    .cameraPosition({ z: distance })
    // .jsonUrl('../datasets/miserables.json')
    .nodeLabel('id')
    .nodeAutoColorBy('group')
    .onNodeClick(node => {
      // Aim at node from outside it
      const distance = 40;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

      const newPos = node.x || node.y || node.z
        ? { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }
        : { x: 0, y: 0, z: distance }; // special case if node is in (0,0,0)

      Graph.cameraPosition(
        newPos, // new position
        node, // lookAt ({ x, y, z })
        3000  // ms transition duration
      );
      // camera orbit
      let angle = 0;
      setInterval(() => {
        if (isRotationActive) {
          Graph.cameraPosition({
            x: distance * Math.sin(angle),
            z: distance * Math.cos(angle)
          });
          angle += Math.PI / 300;
        }
      }, 10);

      document.getElementById('rotationToggle').addEventListener('click', event => {
        isRotationActive = !isRotationActive;
        event.target.innerHTML = `${(isRotationActive ? 'Pause' : 'Resume')} Rotation`;
      });

      let isAnimationActive = true;
      document.getElementById('animationToggle').addEventListener('click', event => {
        isAnimationActive ? Graph.pauseAnimation() : Graph.resumeAnimation();

        isAnimationActive = !isAnimationActive;
        event.target.innerHTML = `${(isAnimationActive ? 'Pause' : 'Resume')} Animation`;
      });
    });
  });