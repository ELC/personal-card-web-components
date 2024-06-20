import { Router } from "../router.js";
import { routes } from "../routes.js";

export class RouterProvider extends HTMLElement {
    constructor(){
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.router = Router;
    }

    connectedCallback(){
        const template = document.createElement('template');
        
        for (let route of routes){
            const link = document.createElement("router-link");
            link.setAttribute("href", `#${route.path}`);
            link.setAttribute("text", route.name);
            template.content.appendChild(link);
        }
        const renderContainer = document.createElement("main");
        template.content.appendChild(renderContainer);
        
        this.shadow.appendChild(template.content.cloneNode(true));
        this.router.routerProvider = this.shadow.querySelector("main");
        this.router.initialize();
    }
}