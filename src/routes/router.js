import { Path } from "./routes.js";


/**
 * @callback render
 * @param {DocumentFragment} element
 * @returns {void}
 */

/**
* @typedef {Object} RenderableElement
* @property {render} render
*/


export class Router {
    /**
     * 
     * @param {Path[]} routes 
     * @param {RenderableElement} routerTemplate 
     * @param {string} rootPath 
    */
    constructor(routes, routerTemplate, rootPath = "/") {
        this.routes = routes;
        this.routerTemplate = routerTemplate;
        this.rootPath = rootPath;

        window.addEventListener("popstate", this.processEvent.bind(this));
    }

    /**
     * @param {string} route 
     * @param {boolean} addToHistory 
     */
    go(route, addToHistory = false) {
        if (addToHistory) {
            history.pushState({ route }, "", route);
        }

        const parsedRoute = route.toLowerCase().split("#").pop()
        const matchedPath = this.routes.find(path => path.path.toLowerCase() == parsedRoute);
        const content = matchedPath ? matchedPath.element : "Oops, 404!"
        this.renderTemplate(content);
    }

    /**
     * 
     * @param {PopStateEvent} event 
     */
    processEvent(event) {
        if (!event.state){
            this.go(this.rootPath)
            return;
        }
        this.go(event.state.route)
    }

    /**
     * @param {Event} event 
    */
    processLink(event) {
        event.preventDefault();
        const targetElement = /** @type {HTMLAnchorElement} */ (event.target);
        const destinationUrl = targetElement.getAttribute("href") || this.rootPath
        this.go(destinationUrl, true);
    }

    /**
     * @param {HTMLElement} element 
     */
    registerElement(element) {
        element.addEventListener("click", this.processLink.bind(this));
    }

    /**
     * @param {string} innerHTML
     */
    renderTemplate(innerHTML){
        const element = document.createElement("template")
        element.innerHTML = innerHTML;
        this.routerTemplate.render(element.content)
    }
}

export class RouterProvider extends HTMLElement {}
