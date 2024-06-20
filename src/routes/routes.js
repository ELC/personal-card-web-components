export class Path {

    /**
     * 
     * @param {string} path 
     * @param {string} element 
     */
    constructor(path, element) {
        this.path = path;
        this.element = element;
    }

}

/**
 * @type {Path[]}
 */
export const routes = [
    {
        path: "/",
        element: `
            <h2>Random Man</h2>
            <user-card gender="male"></user-card>
        `
    },
    {
        path: "man",
        element: `
            <h2>Random Man</h2>
            <user-card gender="male"></user-card>
        `
    },
    {
        path: "woman",
        element: `
            <h2>Random Woman</h2>
            <user-card gender="female"></user-card>
        `
    },
    {
        path: "fixed",
        element: `
            <h2>Fixed</h2>
            <user-card 
                name="Jane Doe"
                avatar="https://randomuser.me/api/portraits/women/1.jpg"
                email="janedeo@gmail.com"
                phone="333-333-3333"
            ></user-card>
        `
    }
]