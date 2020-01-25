const { generateId } = require('./utils')
const { createUser, getUser } = require('./users')

const idToToken = {}

function createToken(socket) {
  const authId = generateId()
  const authTime = Date.now()
  const token = { authId, authTime }

  setToken(socket, token)

  console.log(`[${socket.id}] Sending user auth id: ${authId}`)
  socket.emit('auth', token)
}

function authUser(socket, token) {
  // user has replied with the token that was sent,
  // create a new user for this socket
  const sentToken = getToken(socket)
  const repliedWithToken = sentToken
    && sentToken.authId === token.authId
    && sentToken.authTime === token.authTime
  if(repliedWithToken) {
    console.log(`[${socket.id}] replied with sent token: ${sentToken.authId}, creating new user`)
    createUser(socket, sentToken)
    return
  }

  // user has replied with an old user token,
  // set the current id and token maps to match the old auth token
  const user = getUser(token)
  const userToken = user && user.token
  const isUserToken = userToken
    && userToken.authId === token.authId
    && userToken.authTime === token.authTime
  if(isUserToken) {
    console.log(`[${socket.id}] is an old user: ${token.authId}, replacing ${sentToken.authId} with ${token.authId}`)
    removeToken(socket)
    // it's possible currently to have many sockets pointing to the same token, may need to change that later.
    setToken(socket, userToken)
    return
  }
  
  // user has replied with an invalid token,
  // send the last token we created for them
  if(sentToken) {
    console.log(`[${socket.id}] sent an invalid token: ${token.authId}, reauthing with what was sent earlier: ${sentToken.authId}`)
    socket.emit('reauth', sentToken)
    return
  }

  // somehow there was no token created for this socket id,
  // create a token and send auth
  console.log(`[${socket.id}] does not have a token, restarting auth cycle...`)
  createToken(socket)
}

function setToken(socket, token) {
  idToToken[socket.id] = token
}

function getToken(socket) {
  return idToToken[socket.id]
}

function removeToken(socket) {
  const id = socket.id

  delete idToToken[id]
}

module.exports = {
  createToken,
  authUser,
  getToken,
  removeToken
}