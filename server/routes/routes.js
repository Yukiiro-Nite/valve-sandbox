const Path = require('path')
const { generateId } = require('../utils')
const { authUser, createToken, getToken, removeToken } = require('../auth')
const { getUser } = require('../users')

exports.config = {
  routes: {
    get: {
      '/object': (req, res) => {
        // this is an example of a simple response to a route
        res.send("This was set up with an object config!");
      },
      '/promise-resolve': (req, res, next) => {
        // this is an example of handling resolved promises with a postload handler
        res.responsePromise = new Promise((resolve, reject) => {
          setTimeout(() => resolve('this is a promise resolved'), 1000);
        });
        next();
      },
      '/promise-reject': (req, res, next) => {
        // this is an example of handling rejected promises with a postload handler
        res.responsePromise = new Promise((resolve, reject) => {
          setTimeout(() => reject('this is a promise rejection'), 1000);
        });
        next();
      }
    }
  },
  socketEvents: {
    connection(io, socket, msg) {
      console.log(`[${socket.id}] connected`)
      createToken(socket)
    },
    auth(io, socket, token) {
      console.log(`[${socket.id}] User authorizing as ${token.authId}`)
      authUser(socket, token)
    },
    input(io, socket, inputs) {
      applyInputs(socket, inputs)
    },
    disconnect(io, socket, msg) {
      console.log(`[${socket.id}] disconnected`)
      removeToken(socket)
    }
  }
}

function applyInputs(socket, inputs) {
  const user = getUser(getToken(socket))
  if(!user) return;

  console.log(`[${user.socket.id}] sent input: `, inputs)
}