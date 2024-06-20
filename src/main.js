import { UserCard, CollapsableSection } from "./components/index.js"
import { RouterProvider, Router } from "./routes/router.js";
import { routes } from "./routes/routes.js";

const template = document.createElement('template')
template.innerHTML = `
    <h1>Business Cards</h1>

    <a href="#man">Man</a>
    <a href="#woman">Woman</a>
    <a href="#fixed">Fixed</a>
    <app-router></app-router>
`;

export class App extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.appendChild(template.content.cloneNode(true));
    }
    
    connectedCallback(){
        const router = new Router(routes, this)
        for (let link of this.shadow.querySelectorAll("a")) {
            router.registerElement(link);
        }
        router.go(router.rootPath)
    }
    
    /**
     * @param {DocumentFragment} content 
    */
   render(content) {
        const routerProvider = this.shadow.querySelector("app-router")
    
        if (!routerProvider) {
            throw new Error("No Router Provider present in template")
        }
        routerProvider.innerHTML = "";
        routerProvider.appendChild(content);
    }
}

window.customElements.define('app-main', App);
window.customElements.define('app-router', RouterProvider);
window.customElements.define('user-card', UserCard);
window.customElements.define('collapsable-section', CollapsableSection);
