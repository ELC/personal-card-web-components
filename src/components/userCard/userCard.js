import styleText from "./userCard.css?raw"
import htmlTemplate from "./userCard.html?raw"

import { RandomUserService } from "../../services/index.js";
import { validate } from "../../validations/validations.js";
import { User } from "./models.js";
import { store, updateUserAction } from "../../store/index.js";

const template = document.createElement('template')
template.innerHTML = `
    <style>
        ${styleText}
    </style>
    ${htmlTemplate}
`;

export class UserCard extends HTMLElement {

    /** @type {(User|null)} */
    #user = null

    static observedAttributes = ["first-name", "last-name", "email", "phone", "avatar", "gender", "omit-save"];

    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.appendChild(template.content.cloneNode(true));
        this.randomUserService = new RandomUserService()
    }

    connectedCallback() {
        this.setAttributes();
        this.configureSaveButton();
    }

    configureSaveButton() {
        const saveButton = this.shadow.querySelector("button");
        if (!saveButton) {
            return;
        }

        if (this.hasAttribute("omit-save")) {
            saveButton.style.display = "none";
            return;
        }

        saveButton.addEventListener("click", () => {
            if (!this.#user) {
                throw new Error("No user has been defined")
            }
            const customUserCard = `
                <user-card 
                    first-name=${this.#user.firstName}
                    last-name=${this.#user.lastName}
                    avatar=${this.#user.avatar}
                    email=${this.#user.email}
                    phone=${this.#user.phone}
                    omit-save
                ></user-card>`;
            store.dispatch(updateUserAction(customUserCard));
        })
    }

    async setAttributes() {
        const gender = this.getAttribute('gender')

        if (gender && !['male', 'female'].includes(gender)) {
            throw new Error("Gender must be either 'male' or 'female'")
        }

        const randomUser = await this.randomUserService.get(gender)
        const user = User.fromRandomUser(randomUser)

        const firstName = this.getAttribute('first-name') || user.firstName
        const lastName = this.getAttribute('last-name') || user.lastName
        const name = (firstName && lastName) ? `${firstName} ${lastName}` : user.name
        this.name.innerText = name

        const phone = this.getAttribute('phone') || user.phone
        this.phone.href = phone
        this.phone.innerHTML = phone

        const email = this.getAttribute('email') || user.email
        this.email.href = email
        this.email.innerHTML = email

        const avatar = this.getAttribute('avatar') || user.avatar;
        this.avatar.src = avatar;

        this.#user = new User(
            firstName,
            lastName,
            email,
            phone,
            // @ts-ignore
            gender,
            avatar
        )
    }


    /**
     * @returns {HTMLImageElement}
     */
    get avatar() {
        const avatar = this.shadow.querySelector('img');
        return validate(avatar);
    }

    /**
     * @returns {HTMLAnchorElement}
     */
    get phone() {
        let phone = this.shadow.getElementById('phone');
        phone = validate(phone);

        if (!(phone instanceof HTMLAnchorElement)) {
            throw new Error("Email must be an anchor tag")
        }

        return phone
    }

    /**
     * @returns {HTMLAnchorElement}
     */
    get email() {
        let email = this.shadow.getElementById('email');
        email = validate(email);

        if (!(email instanceof HTMLAnchorElement)) {
            throw new Error("Email must be an anchor tag")
        }

        return email
    }


    /**
     * @returns {HTMLHeadingElement}
     */
    get name() {
        let name = this.shadow.querySelector('h3');
        return validate(name);
    }
}