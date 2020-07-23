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

import {
    pantallaOnboarding
} from "./bodies/onboarding"

import {
    pantallaInicioSesion
} from "./bodies/iniciosesion"
import {
    headerComponente
} from "./headers/header"

import {
    pantallaPrincipal
} from "./bodies/principal"

import {
    pieComponente
} from "./foots/pie"

/* import {
    pantallaRecuperaClave
} from "./bodies/recuperaclave"
 */

import {
    videoRTC
} from "./bodies/videoRTC"

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
            <splash-screen class="body"></splash-screen>
            <pantalla-onboarding class="body"></pantalla-onboarding>
            <pantalla-iniciosesion class="body"></pantalla-iniciosesion>
            <header-componente class="header"></header-componente>
            <pantalla-principal class="body"></pantalla-principal>
            <pie-componente class="foot"></pie-componente>
            <video-rtc class="body"></video-rtc>`

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