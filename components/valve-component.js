class ValveComponent {
  size = 32
  constructor({x = 0, y = 0, direction = 0, src}) {
    const el = document.createElement('div')
    el.id = generateId()
    el.classList.add('valveEl')
    el.style.top = `${y - this.size / 2}px`
    el.style.left = `${x - this.size / 4}px`
    el.style.width = `${this.size / 2}px`
    el.style.height = `${this.size}px`
    el.style.transform = `rotateZ(${direction}rad)`;

    el.addEventListener('click', (event) => {
      const action = this[state.mode]
      if(action) {
        action(event)
      }
    })

    this.el = el
    this.input = src
  }
}