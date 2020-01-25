class ValveForm extends HTMLElement {
  constructor() {
    super();
    //initializations
  }

  connectedCallback() {
   this.innerHTML = `
    <form>
      <label>
        Valve Type
        <select name="valveType" id="valveTypeSelect"></select>
      </label>
    </form>
   `
  }
  attributeChangeCallback() { }
  disconnectedCallback() { }
}

customElements.define('valve-form', ValveForm);