import {
    html,
    LitElement,
    css
} from "lit-element";
import {
    connect
} from "@brunomon/helpers"
import {
    store
} from "../redux/store";

import {
    layoutsCSS
} from "./ui/layouts"

/* import {
    blueHeader
} from "./headers/blueHeader"
import {
    redFoot
} from "./foots/redFoot"
import {
    greenDashboard
} from "./bodies/greenDashboard" */
import {
    getLayout
} from "../redux/screens/screenLayouts";

import {
    pantallaSplash
} from "./bodies/splash"


const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
export class viewManager extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();

    }


    static get styles() {
        return css `
        :host{
            display: grid;                 
            height:100vh;
            width: 100vw;
            padding:0;
            background-color:var(--color-gris-claro);
            overflow:hidden;
        }

        ${layoutsCSS};


        `
    }



    render() {
        return html `
            <pantalla-splash class="body"></pantalla-splash>
<!--             <blue-header class="header"></blue-header>
            <green-dashboard class="body"></green-dashboard>
            <red-foot class="foot"></red-foot> -->

       
        `
    }

    stateChanged(state, name) {
        if ((name == MEDIA_CHANGE || name == SCREEN)) {
            this.mediaSize = state.ui.media.size
            this.layout = getLayout(state).name
        }

        this.update();
    }


    static get properties() {
        return {
            mediaSize: {
                type: String,
                reflect: true,
                attribute: 'media-size'
            },
            layout: {
                type: String,
                reflect: true,
            }
        }
    }
}

window.customElements.define("view-manager", viewManager);