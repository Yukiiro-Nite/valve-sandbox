class SinkComponent {
  size = 32
  radius = this.size / 2
  constructor({ x, y }) {
    const el = document.createElement('div')
    el.id = generateId()
    el.classList.add('sinkEl')
    el.style.top = `${y - this.radius}px`
    el.style.left = `${x - this.radius}px`
    el.style.width = `${this.size}px`
    el.style.height = `${this.size}px`

    el.addEventListener('click', (event) => {
      event.stopPropagation();
      const action = this[state.mode]
      if(action) {
        action(event)
      }
    })

    this.el = el
  }
}