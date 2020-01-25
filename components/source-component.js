class SourceComponent {
  size = 64
  radius = this.size / 2
  constructor({ x, y }) {
    const el = document.createElement('div')
    el.id = generateId()
    el.classList.add('sourceEl')
    el.style.top = `${y - this.radius}px`
    el.style.left = `${x - this.radius}px`
    el.style.width = `${this.size}px`
    el.style.height = `${this.size}px`

    el.addEventListener('click', (event) => {
      const action = this[state.mode]
      if(action) {
        action(event)
      }
    })

    this.el = el
  }

  addSrc = (event) => {
    event.stopPropagation();
    console.log(`${this.el.id} source element clicked!`)
  }

  addValve = (event) => {
    event.stopPropagation();
    const { layerX, layerY } = event;
    const direction = Math.atan2(layerY - this.radius, layerX - this.radius);
    const x = (Math.cos(direction) * this.radius) + this.radius;
    const y = (Math.sin(direction) * this.radius) + this.radius;
    console.log(x, y)

    const valve = new ValveComponent({ x, y, direction, src: this })
    this.el.append(valve.el)
  }
}