import { UserCard, CollapsableSection } from "./components/index.js"
import { RouterProvider, Link } from "./routes/index.js";

const template = document.createElement('template')
template.innerHTML = `
    <h1>Business Cards</h1>
    <router-provider></router-provider>
`;

export class App extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('app-main', App);
window.customElements.define('router-link', Link);
window.customElements.define('router-provider', RouterProvider);
window.customElements.define('user-card', UserCard);
window.customElements.define('collapsable-section', CollapsableSection);
