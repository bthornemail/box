
export default function proxy() {
    const canvasA = document.getElementById("modulus-canvas");
    const canvasB = document.getElementById("index-canvas");

    const mainButton = document.getElementById("modulus-button");
    const workerButton = document.getElementById("index-button");

    const ctxA = canvasA.getContext("2d");
    const canvasWidth = ctxA.width;
    const canvasHeight = ctxA.height;

    // Create a counter for Canvas A
    let counter = 0;
    // Redraw Canvas A counter
    function redrawCanvasA() {
        ctxA.clearRect(0, 0, canvasA.width, canvasA.height);
        ctxA.font = "24px Verdana";
        ctxA.textAlign = "center";
        ctxA.fillText(counter, canvasA.width / 2, canvasA.height / 2);
    }



    // Set up a worker thread to render Canvas B
    const worker = new Worker("worker.js");

    // This function creates heavy (blocking) work on a thread
    function fibonacci(num) {
        if (num <= 1) {
            return 1;
        }
        return fibonacci(num - 1) + fibonacci(num - 2);
    }
    // Call our Fibonacci function on the main thread
    function slowMainThread() {
        fibonacci(42);
    }

    // A 'slowDown' message we can catch in the worker to start heavy work
    function slowdownWorker() {
        worker.postMessage("slowDown");
    }

    mainButton.addEventListener("click", slowMainThread);
    workerButton.addEventListener("click", slowdownWorker);

    // Use the OffscreenCanvas API and send to the worker thread
    const canvasWorker = canvasB.transferControlToOffscreen();
    worker.postMessage({ canvas: canvasWorker }, [canvasWorker]);

    setInterval(() => {
        redrawCanvasA();
        counter++;
    }, 100);
    // const root = document.getElementById("root");
    // var sheets = [].slice.call(document.getElementsByTagName("link"));
    // var head = document.getElementsByTagName("head")[0];
    // for (var i = 0; i < sheets.length; ++i) {
    //     var elem = sheets[i];
    //     head.removeChild(elem);
    //     var rel = elem.rel;
    //     if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
    //         var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
    //         elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
    //     }
    //     head.appendChild(elem);
    // }


    // if ('WebSocket' in window) {
    //     var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
    //     var address = protocol + window.location.host + window.location.pathname + '/ws';
    //     var socket = new WebSocket(address);
    //     socket.onmessage = function (msg) {
    //         console.log(msg)
    //         // if (msg.data == 'reload') window.location.reload();
    //         // if (msg.data == 'reload') window.location.reload();
    //         // else if (msg.data == 'refreshcss') refreshCSS();
    //     };
    //     console.log('Proxy WebSocket enabled.');
    //     socket.onopen = function () {
    //         console.log('Proxy WebSocket opened.');
    //         socket.send('hello');
    //         socket.dispatchEvent(new Event('listening', {
    //             bubbles: true, cancelable: true,
    //             data: 'listening',
    //             type: 'listening',
    //             content: 'listening',
    //             composed: true,
    //         }));
    //     };
    //     socket.addEventListener("listening", function (e) {
    //         console.log('Proxy WebSocket event data:', e);
    //         console.log('Proxy WebSocket listening.');
    //     });
    //     socket.onclose = function () {
    //         console.log('Proxy WebSocket closed.');
    //     };
    // }
}
