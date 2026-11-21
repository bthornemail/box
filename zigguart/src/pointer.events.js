import { applyChanges, getChanges } from "./node.js";
import { template } from "./template/templates.js";
function rawUpdateHandler(event) {
    console.log(`rawUpdateHandler: <Not implemented> ${event.pointerType}`);
    const properties = {
        isTrusted:event.isTrusted,
        altitudeAngle:event.altitudeAngle,
        azimuthAngle:event.azimuthAngle,
        clientX:event.clientX,
        clientY:event.clientY,
        pageX:event.pageX,
        pageY:event.pageY,
        screenX:event.screenX,
        screenY:event.screenY,
        offsetX:event.offsetX,
        offsetY:event.offsetY,
        width:event.width,
        height:event.height,
        pressure:event.pressure,
        tangentialPressure:event.tangentialPressure,
        tiltX:event.tiltX,
        tiltY:event.tiltY,
        layerX:event.layerX,
        layerY:event.layerY,
        pointerId:event.pointerId,
        pointerType:event.pointerType,
        timeStamp:event.timeStamp,
        twist:event.twist,
        type:event.type,
        timeStamp:event.timeStamp,
        movementX:event.movementX,
        movementY:event.movementY,
    };
    
    console.log(template`id:${event.id} type: ${event.pointerType}`);
}
function overHandler(event) {
    console.log(`overHandler: <Not implemented> ${event.pointerType}`);
}
function enterHandler(event) {
    console.log(`enterHandler: <Not implemented> ${event.pointerType}`);
}
function downHandler(event) {
    console.log(`downHandler: <Not implemented> ${event.pointerType}`);
}
function moveHandler(event) {
    console.log(`moveHandler: <Not implemented> ${event.pointerType}`);
}
function upHandler(event) {
    console.log(`upHandler: <Not implemented> ${event.pointerType}`);
}
function cancelHandler(event) {
    console.log(`cancelHandler: <Not implemented> ${event.pointerType}`);
}
function outHandler(event) {
    console.log(`outHandler: <Not implemented> ${event.pointerType}`);
}
function leaveHandler(event) {
    console.log(`leaveHandler: <Not implemented> ${event.pointerType}`);
}
function gotCaptureHandler(event) {
    console.log(`gotCaptureHandler: <Not implemented> ${event.pointerType}`);
}
function lostCaptureHandler(event) {
    console.log(`lostCaptureHandler: <Not implemented> ${event.pointerType}`);
}
function clickHandler(event) {
    console.log(`clickHandler: <Not implemented> ${event.pointerType}`);
}
function auxClickHandler(event) {
    console.log(`auxClickHandler: <Not implemented> ${event.pointerType}`);
}
function contextMenuHandler(event) {
    console.log(`contextMenuHandler: <Not implemented> ${event.pointerType}`);
}

function processId(event) {
    // Process this event based on the event's identifier 
    console.log(`processId: <Not implemented> ${event.id}`);

}
function processMouse(event) {
    // Process the mouse pointer event
    console.log(`processMouse: <Not implemented> ${event.pointerType}`);
}
function processPen(event) {
    // Process the pen pointer event 
    console.log(`processPen: <Not implemented> ${event.pointerType}`);

}
function processTouch(event) {
    // Process the touch pointer event   
    console.log(`processTouch: <Not implemented> ${event.pointerType}`);

}
function processTilt(tiltX, tiltY) {
    // Tilt data handler 
    console.log(`processTilt: <Not implemented> tiltX: ${tiltX} tiltY: ${tiltY}`);
}
function processPressure(pressure) {
    // Pressure handler 
    console.log(`processPressure: <Not implemented> ${pressure}`);

}
function processNonPrimary(event) {
    // Non primary handler 
    console.log(`processNonPrimary: <Not implemented> ${event.pointerType}`);

}

export function getPointer(el = document.getElementById("target")) {
    const id = -1;
    function nodeClickHandler(event) {
        console.log(`clickHandler:  ${event.pointerType}`);
        const tags = getChanges(el, confirm);
        const prompt = window.prompt(`Node:${el.id}\nTags:\n${tags}`);
        if (!prompt) return;
        const hasChanged = applyChanges(prompt, tags);
        alert(`Changes ${hasChanged ? "applied" : "not applied"} to ${tags}.`);
    }
    function nodeClickHandler(event) {
        console.log(`clickHandler:  ${event.pointerType}`);
        const tags = getChanges(el, confirm);
        const prompt = window.prompt(`Node:${el.id}\nTags:\n${tags}`);
        if (!prompt) return;
        const hasChanged = applyChanges(prompt, tags);
        alert(`Changes ${hasChanged ? "applied" : "not applied"} to ${tags}.`);
    }
    function downHandler(event) {
        console.log(`downHandler:  ${event.pointerType}`);
        // Calculate the touch point's contact area
        const area = event.width * event.height;

        // Compare cached id with this event's id and process accordingly
        if (id === event.identifier) processId(event);

        // Call the appropriate pointer type handler
        switch (event.pointerType) {
            case "mouse":
                processMouse(event);
                break;
            case "pen":
                processPen(event);
                break;
            case "touch":
                processTouch(event);
                break;
            default:
                console.log(`pointerType ${event.pointerType} is not supported`);
        }

        // Call the tilt handler
        if (event.tiltX !== 0 && event.tiltY !== 0) processTilt(event.tiltX, event.tiltY);

        // Call the pressure handler
        processPressure(event.pressure);

        // If this event is not primary, call the non primary handler
        if (!event.isPrimary) processNonPrimary(event);
    }

    // Register pointer event handlers
    el.onpointerover = overHandler;
    el.onpointerenter = enterHandler;
    el.onpointerdown = downHandler;
    el.onpointermove = moveHandler;
    el.onpointerup = upHandler;
    el.onpointercancel = cancelHandler;
    el.onpointerout = outHandler;
    el.onpointerleave = leaveHandler;
    el.onpointerrawupdate = rawUpdateHandler;
    el.ongotpointercapture = gotCaptureHandler;
    el.onlostpointercapture = lostCaptureHandler;
    el.onclick = nodeClickHandler;
    el.onauxclick = auxClickHandler;
    el.oncontextmenu = contextMenuHandler;
}
export function getProxyPointer(el = document.getElementById("target")) {
    function downHandler(ev) {
        // Element "target" will receive/capture further events
        el.setPointerCapture(ev.pointerId);
    }

    function cancelHandler(ev) {
        // Release the pointer capture
        el.releasePointerCapture(ev.pointerId);
    }

    // Register pointer event handlers
    el.onpointerover = overHandler;
    el.onpointerenter = enterHandler;
    el.onpointerdown = downHandler;
    el.onpointermove = moveHandler;
    el.onpointerup = upHandler;
    el.onpointercancel = cancelHandler;
    el.onpointerout = outHandler;
    el.onpointerleave = leaveHandler;
    el.onpointerrawupdate = rawUpdateHandler;
    el.ongotpointercapture = gotCaptureHandler;
    el.onlostpointercapture = lostCaptureHandler;
    el.onclick = clickHandler;
    el.onauxclick = auxClickHandler;
    el.oncontextmenu = contextMenuHandler;
}