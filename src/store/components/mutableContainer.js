import { store } from "../store.js";

const template = document.createElement('template')
template.innerHTML = `
    <div>Placeholder</div>
`;

export class MutableContainer extends HTMLElement {
    static observedAttributes = ["state-slice", "state-variable"];


    constructor(){
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.appendChild(template.content.cloneNode(true));
        this.stateSlice = null 
        this.stateSlice = null 
    }
    
    connectedCallback(){
        this.stateSlice = this.getAttribute("state-slice") 
        this.stateVariable = this.getAttribute("state-variable") 
        store.subscribe(this.updateContent.bind(this));
    }

    updateContent(){
        const container = this.shadow.querySelector("div")
        
        if (!container || !this.stateSlice || !this.stateVariable){
            return
        }

        container.innerHTML = store.getState()[this.stateSlice][this.stateVariable]
    }
}