class AppWelcome extends HTMLElement {
  connectedCallback() {
    this.innerHTML = buildAppWelcomeHTML();
    console.log('AppWelcome added to DOM');
  }
}

const buildAppWelcomeHTML = () => {
  const now = new Date();
  const dayOfTheMonth = now.getDate();
  const monthOfTheYear = MONTHS[now.getMonth()];
  const year = now.getFullYear();
  return `Olá! Hoje é dia ${dayOfTheMonth} de ${monthOfTheYear} de ${year}. Seja bem vindo(a)!`;
}

customElements.define('app-welcome', AppWelcome);