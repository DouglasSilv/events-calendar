class Calendar extends HTMLElement {
  connectedCallback() {
    const helloWorld = 'Hello World';
    this.innerHTML = `<h1>${helloWorld}</h1>`;
    console.log('Calendar added to DOM');
  }
}

customElements.define('my-calendar', Calendar);