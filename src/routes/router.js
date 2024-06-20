import { routes, rootPath } from "./routes.js";


class RouterFactory {
    /** @type {(Element|null)} */
    routerProvider = null

    initialize() {
        this.go(window.location.hash);
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

        const parsedRoute = route.toLowerCase().split("#").pop() || rootPath
        const matchedPath = routes.find(path => path.path.toLowerCase() == parsedRoute);
        const content = matchedPath ? matchedPath.element : "Oops, 404!"
        this.renderTemplate(content);
    }

    /**
     * 
     * @param {PopStateEvent} event 
     */
    processEvent(event) {
        if (!event.state) {
            this.go(rootPath)
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
        const destinationUrl = targetElement.getAttribute("href") || rootPath
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
    renderTemplate(innerHTML) {
        if (!this.routerProvider) {
            throw new Error("No router provided has been defined");
        }

        this.routerProvider.innerHTML = innerHTML;
    }
}

export const Router = new RouterFactory()
