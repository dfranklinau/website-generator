// Open a WebSocket connection which will reload the page when receiving a
// `RELOAD` message.
const socket = new WebSocket("ws://localhost:8001");
socket.addEventListener("message", event => {
  console.log(event);
  if (event.data === "RELOAD") window.location.reload()
});
