const controlEls = getAllElements('.control')
const sandbox = document.querySelector('#sandbox')
const state = {
  mode: 'addSrc',
  nodes: {},
  edges: {}
}
sandbox.classList.add(state.mode)

const actions = {
  addSrc,
  removeEl,
  addSink
}

Object.entries(controlEls).forEach(([id, el]) => {
  el.addEventListener('click', () => {
    const output = document.querySelector('#controlOutput')
    const prevMode = state.mode
    state.mode = id

    sandbox.classList.remove(prevMode)
    sandbox.classList.add(state.mode)
    output.value = `Current Mode: ${el.textContent}`
  })
})

sandbox.addEventListener('click', handleSandboxClick)

function handleSandboxClick(event) {
  const action = actions[state.mode]
  if(action) {
    action(event)
  }
}

function addSrc(event) {
  console.log('addSrc', event)
  const { layerX, layerY } = event
  const sourceComponent = new SourceComponent({ x: layerX, y: layerY });
  const id = sourceComponent.el.getAttribute('id')
  state.nodes[id] = sourceComponent;
  sandbox.append(sourceComponent.el)
}

function addSink(event) {
  console.log('addSink', event)
  const { layerX, layerY } = event
  const sinkComponent = new SinkComponent({ x: layerX, y: layerY });
  const id = sinkComponent.el.getAttribute('id')
  state.nodes[id] = sinkComponent;
  sandbox.append(sinkComponent.el)
}

function removeEl(event) {
  if(event.target !== sandbox) {
    removeFromState(event.target)
    event.target.remove()
  }
}

function removeFromState(el) {
  const id = el.getAttribute('id')
  if(id) {
    delete state.nodes[id]
    Object.entries(state.edges)
      .filter(([start, end]) => start === id || end === id)
      .forEach(([start]) => delete state.edges[start])
  }

  Array.from(el.children).forEach(childEl => removeFromState(childEl))
}