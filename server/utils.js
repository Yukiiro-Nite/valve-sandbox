let last = 0
function generateId() {
  const now = Date.now()
  if(now <= last) {
    last += 1
  } else {
    last = now
  }
  return last.toString(36)
}

module.exports = {
  generateId
}