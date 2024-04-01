import chokidar from 'chokidar';
import fs from 'fs';
import http from 'http';
import path from 'path';
import { WebSocketServer } from 'ws';
import { Buffer } from 'node:buffer';
import { generate } from './generate';

const CONTENT = path.resolve('./content/');
const ROOT = path.resolve('./build/');
const PORT = 8000;
const WS_PORT = 8001;

// Define a method for fetching a file resource.
const fetchResource = async (
  resource: string,
  options: { cwd: boolean } = { cwd: false },
) => {
  const pathname = options.cwd
    ? path.resolve(__dirname, resource)
    : path.join(ROOT, resource);
  console.log(pathname);
  const body = await fs.promises.readFile(pathname);

  return {
    body,
    pathname,
  };
};

const httpServer = http.createServer(async (request, response) => {
  // Reject non-GET methods.
  if (request.method !== 'GET') {
    response.writeHead(403);
    return response.end();
  }

  // Handle script-injection for a client-side WebSocket script.
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

  // Reject when the URL is undefined.
  if (!request.url) {
    response.writeHead(403);
    return response.end();
  }

  // Parse relative URLs by passing a base and append an `index.html` to any
  // directory paths.
  const url = new URL(request.url, `http://${request.headers.host}`);
  let pathname = url.pathname;
  if (pathname.endsWith('/')) pathname += 'index.html';

  // Attempt to fetch the resource and return its contents if it exists, or a
  // 404 if there is an error.
  try {
    const resource = await fetchResource(pathname);

    // Inject a script tag at the end of response for HTML files, which will
    // enable WebSockets. Convert the resource's body to a string and then
    // convert it back to a file buffer.
    if (resource.pathname.endsWith('.html')) {
      resource.body = Buffer.from(
        resource.body
          .toString()
          .replace('</body>', '<script src="/client.js"></script>'),
      );
    }

    // Reject if a MIME type cannot be detected. Lazily load the `mime` package
    // due to CommonJS and ECMAScript module clashes.
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
  } catch (e) {
    response.writeHead(404);
    return response.end();
  }
});

export function serve() {
  console.log(__dirname);
  // Start the HTTP server.
  httpServer.listen(PORT, () => {
    console.log(`HTTP server is running on port: ${PORT}`);
  });

  // Start the WebSocket server.
  const wsServer = new WebSocketServer({
    port: WS_PORT,
  });

  wsServer.on('listening', () => {
    console.log(`WebSocket Server is running on port: ${WS_PORT}`);
  });

  // Send a message to each client when the WebSocket server receives a `reload`
  // event.
  wsServer.on('reload', () => {
    console.log("reloading...");
    wsServer.clients.forEach((client) => client.send('RELOAD'));
  });

  // Start file watching and emit a reload event to the WebSocket server when any
  // files change.
  chokidar.watch(`${ROOT}/**/*`).on('all', () => wsServer.emit('reload'));
  // @TODO: wait for the files to generate and then emit a reload event.
  chokidar.watch(`${CONTENT}/**/*`).on('all', () => generate());
  // @TODO: add support for copying files from other directores, e.g. static.
}
