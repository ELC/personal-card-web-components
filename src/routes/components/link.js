import { Router } from "../router";

const template = document.createElement('template')
template.innerHTML = `
    <a></a>
`;

export class Link extends HTMLElement {
    static observedAttributes = ["href", "text"];

    constructor(){
        super();
        this.router = Router;
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.appendChild(template.content.cloneNode(true));
    }

    connectedCallback(){
        const destionationUrl = this.getAttribute("href")
        
        if (!destionationUrl){
            throw new Error("Link must have href attribute")
        }
        
        const link = this.shadow.querySelector("a")
        if (!link){
            throw new Error("Link Template must contain an anchor tag")
        }

        link.href = destionationUrl;
        link.innerText = this.getAttribute("text") || destionationUrl;
        
        this.router.registerElement(this)
    }
}