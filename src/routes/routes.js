import { Path } from "./models.js"

export const rootPath = "/"

/**
 * @type {Path[]}
 */
export const routes = [
    {
        name: "Home",
        path: "/",
        element: `
            <h2>Random Man</h2>
            <user-card gender="male"></user-card>
        `
    },
    {
        name: "Man",
        path: "man",
        element: `
            <h2>Random Man</h2>
            <user-card gender="male"></user-card>
        `
    },
    {
        name: "Woman",
        path: "woman",
        element: `
            <h2>Random Woman</h2>
            <user-card gender="female"></user-card>
        `
    },
    {
        name: "Fixed",
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