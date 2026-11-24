export default async function loadSVGElement(url, containerId) {
    const response = await fetch(url);
    const svgText = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, 'image/svg+xml');
    const svgElement = doc.querySelector('svg');

    // Example: Modify an attribute before appending
    try {
        document.getElementById(containerId).appendChild(svgElement);
        // Additional SVG manipulation can be done here
    } catch (error) {
        svgElement.setAttribute('class', 'invalid-element');
        // console.error('Error loading SVG element:', error);
    }
}