export type EmacsCommand = 'getBuffer' | 'insertText' | 'subscribe';

export interface EmacsRequest {
    command: EmacsCommand;
    bufferName: string;
    text?: string;
}

export interface EmacsResponse {
    status: 'success' | 'error';
    content?: string;
    message?: string;
}

export interface EmacsLiveDelta {
    type: 'bufferUpdate';
    bufferName: string;
    start: number;
    end: number;
    deletedLen: number;
    text: string;
}

export class EmacsUnifiedInterface {
    private ws: WebSocket;
    private responseResolver: ((value: EmacsResponse) => void) | null = null;
    private streamCallback: ((delta: EmacsLiveDelta) => void) | null = null;

    constructor(url: string = 'ws://localhost:9005') {
        this.ws = new WebSocket(url);
        this.setupListeners();
    }

    private setupListeners() {
        this.ws.onmessage = (event) => {
            const parsedData = JSON.parse(event.data.toString());

            // Route 1: Is it a streamed streaming packet from Emacs typing?
            if (parsedData.type === 'bufferUpdate') {
                if (this.streamCallback) {
                    this.streamCallback(parsedData as EmacsLiveDelta);
                }
                return;
            }

            // Route 2: Is it a standard Request/Response command confirmation?
            if (this.responseResolver) {
                this.responseResolver(parsedData as EmacsResponse);
                this.responseResolver = null;
            }
        };
    }

    public connect(): Promise<void> {
        return new Promise((resolve) => {
            if (this.ws.readyState === WebSocket.OPEN) resolve();
            else this.ws.onopen = () => resolve();
        });
    }

    private sendCommand(request: EmacsRequest): Promise<EmacsResponse> {
        return new Promise((resolve) => {
            this.responseResolver = resolve;
            this.ws.send(JSON.stringify(request));
        });
    }

    // API - Write to a buffer
    async insertText(bufferName: string, text: string): Promise<void> {
        const res = await this.sendCommand({ command: 'insertText', bufferName, text });
        if (res.status === 'error') throw new Error(res.message);
    }

    // API - Read complete buffer snapshots
    async getBufferContent(bufferName: string): Promise<string> {
        const res = await this.sendCommand({ command: 'getBuffer', bufferName });
        if (res.status === 'error') throw new Error(res.message);
        return res.content || '';
    }

    // API - Listen for changes to a buffer over time
    async watchBuffer(bufferName: string, onUpdate: (delta: EmacsLiveDelta) => void): Promise<void> {
        this.streamCallback = onUpdate;
        const res = await this.sendCommand({ command: 'subscribe', bufferName });
        if (res.status === 'error') throw new Error(res.message);
    }
};

(() => {
    console.log('hello')
    async function executeUnifiedBridge() {
        const emacs = new EmacsUnifiedInterface('ws://localhost:9005');
        await emacs.connect();
        console.log('Connected to unified Emacs context pipeline!');

        // 1. Send an initialization text block to a buffer
        await emacs.insertText('*scratch*', '\n;; Connection initialized from TypeScript App\n');

        // 2. Pull a snapshot of the buffer state
        const currentSnapshot = await emacs.getBufferContent('*scratch*');
        console.log('Initial Snapshot content:', currentSnapshot);

        // 3. Register to receive every edit live as users type inside Emacs
        await emacs.watchBuffer('*scratch*', (delta) => {
            console.log(`[Stream Event] Buffer altered at index positions: ${delta.start} -> ${delta.end}`);
            console.log(` -> Replaced ${delta.deletedLen} chars with text context: "${delta.text}"`);
        });
    }

    executeUnifiedBridge().catch(console.error);

})();
