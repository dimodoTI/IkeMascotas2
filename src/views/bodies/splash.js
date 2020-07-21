import {
    html,
    LitElement,
    css
} from "lit-element";
import {
    store
} from "../../redux/store";
import {
    connect
} from "@brunomon/helpers";


import {
    showScreen
} from "../../redux/screens/actions";
import {
    goNext,
    goPrev,
    goTo
} from "../../redux/routing/actions"
import {
    isInLayout
} from "../../redux/screens/screenLayouts";

import {
    dispararTimer,
    CANCELAR_TIMER
} from "../../redux/ui/actions"


const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
export class pantallaSplash extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.hidden = false
        this.area = "body"
    }

    static get styles() {
        return css `
        :host{
            display: grid;
            justify-items:center;
            align-items: center;  
            background-color: trasparent;
            height: 100vh;
            width: 100vw;   
            background-color:var(--color-celeste);
            background-image:var(--imagen-logo-splash);
            background-repeat: no-repeat;
            background-position: center;
            background-size: 80%;
        }
        :host([media-size="medium"]){
            background-size: 50%;
        }
        :host([media-size="large"]){
            background-size: 40%;
        }
        :host([hidden]){
            display: none; 
        }
        #fondo{
            height: 100%;
            width: 100%;
            background-color:transparent;            
        }
        `
    }
    render() {
        return html `
        <div id="fondo" @click="${this.pasar}">
        </div>
        `
    }


    firstUpdated(changedProperties) {

        store.dispatch(showScreen("splash", ""))

    }

    stateChanged(state, name) {

        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            if (isInLayout(state, this.area)) {
                this.hidden = false
                store.dispatch(dispararTimer(3, "onboarding", "splash"))

            }

            this.update();
        }


    }

    static get properties() {
        return {
            mediaSize: {
                type: String,
                reflect: true,
                attribute: 'media-size'
            },
            hidden: {
                type: Boolean,
                reflect: true
            },

            area: {
                type: String
            }
        }
    }

}
window.customElements.define("pantalla-splash", pantallaSplash);