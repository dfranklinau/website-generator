"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const chokidar_1 = __importDefault(require("chokidar"));
const fs_1 = __importDefault(require("fs"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const ws_1 = require("ws");
const node_buffer_1 = require("node:buffer");
const generate_1 = require("./generate");
const CONTENT = path_1.default.resolve('./content/');
const ROOT = path_1.default.resolve('./build/');
const PORT = 8000;
const WS_PORT = 8001;
const fetchResource = async (resource, options = { cwd: false }) => {
    const pathname = options.cwd
        ? path_1.default.resolve(__dirname, resource)
        : path_1.default.join(ROOT, resource);
    console.log(pathname);
    const body = await fs_1.default.promises.readFile(pathname);
    return {
        body,
        pathname,
    };
};
const httpServer = http_1.default.createServer(async (request, response) => {
    if (request.method !== 'GET') {
        response.writeHead(403);
        return response.end();
    }
    if (request.url === '/client.js') {
        const resource = await fetchResource('../development/client.js', {
            cwd: true,
        });
        response.writeHead(200, {
            'Content-Length': resource.body.length,
            'Content-Type': 'application/javascript',
        });
        return response.end(resource.body);
    }
    if (!request.url) {
        response.writeHead(403);
        return response.end();
    }
    const url = new URL(request.url, `http://${request.headers.host}`);
    let pathname = url.pathname;
    if (pathname.endsWith('/'))
        pathname += 'index.html';
    try {
        const resource = await fetchResource(pathname);
        if (resource.pathname.endsWith('.html')) {
            resource.body = node_buffer_1.Buffer.from(resource.body
                .toString()
                .replace('</body>', '<script src="/client.js"></script>'));
        }
        const mime = await import('mime');
        const mimeType = mime.default.getType(resource.pathname);
        if (!mimeType) {
            response.writeHead(403);
            return response.end();
        }
        response.writeHead(200, {
            'Content-Length': resource.body.length,
            'Content-Type': mimeType,
        });
        return response.end(resource.body);
    }
    catch (e) {
        response.writeHead(404);
        return response.end();
    }
});
function serve() {
    console.log(__dirname);
    httpServer.listen(PORT, () => {
        console.log(`HTTP server is running on port: ${PORT}`);
    });
    const wsServer = new ws_1.WebSocketServer({
        port: WS_PORT,
    });
    wsServer.on('listening', () => {
        console.log(`WebSocket Server is running on port: ${WS_PORT}`);
    });
    wsServer.on('reload', () => {
        console.log("reloading...");
        wsServer.clients.forEach((client) => client.send('RELOAD'));
    });
    chokidar_1.default.watch(`${ROOT}/**/*`).on('all', () => wsServer.emit('reload'));
    chokidar_1.default.watch(`${CONTENT}/**/*`).on('all', () => (0, generate_1.generate)());
}
exports.serve = serve;
//# sourceMappingURL=serve.js.map