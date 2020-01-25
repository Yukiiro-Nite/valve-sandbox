const keys = {}

function handleInput(socket) {
  document.addEventListener('keydown', handleKeydown.bind(this, socket))
  document.addEventListener('keyup', handleKeyup.bind(this, socket))
}

function handleKeydown(socket, event) {
  if(!keys[event.key]) {
    addKey(event.key)
    sendUpdate(socket)
  }
}

function handleKeyup(socket, event) {
  if(keys[event.key]) {
    removeKey(event.key)
    sendUpdate(socket)
  }
}

function addKey(key) {
  keys[key] = true
}

function removeKey(key) {
  delete keys[key]
}

function sendUpdate(socket) {
  socket.emit('input', keys)
}