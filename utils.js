function getAllElements(selector) {
  return Array.from(document.querySelectorAll(selector))
    .reduce((obj, el) => {
      if(el.id) {
        obj[el.id] = el
      }
      return obj
    }, {})
}

let last = 0
function generateId() {
  const next = Date.now()

  if(last >= next ) {
    last++
  } else {
    last = next
  }

  return last.toString(36)
}