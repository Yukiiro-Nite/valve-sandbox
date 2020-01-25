const users = {}

function createUser(socket, token) {
  const currentUser = users[token.authId]
  if(!currentUser) {
    users[token.authId] = { socket, token }
  } else {
    socket.emit('error', { type: "auth", message: "User already exists" })
  }
}

function getUser(token) {
  if(!token) return;

  const user = users[token.authId]
  if(!user) {
    console.log(`No user exists for authId: ${token.authId}`)
    return
  }

  return user
}

module.exports = {
  createUser,
  getUser
}