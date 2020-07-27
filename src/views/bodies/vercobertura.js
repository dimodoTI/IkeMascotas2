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
    idiomas
} from "../../redux/datos/idiomas"
import {
    label
} from "../css/label"

import {
    button
} from "../css/button"

import {
    goNext,
    goTo,
    goPrev
} from "../../redux/routing/actions"
import {
    isInLayout
} from "../../redux/screens/screenLayouts";
import {
    showScreen
} from "../../redux/screens/actions";

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp"
export class pantallaVerCobertura extends connect(store, SCREEN, MEDIA_CHANGE)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.idioma = "ES"
        this.area = "body"
    }

    static get styles() {
        return css `
        ${label}
        ${button}

        :host{
            position: absolute;
            display:grid;
            grid-template-columns: auto;
            grid-template-rows: auto auto auto;
            grid-gap:0.5rem;
            top: 35%;
            left: 0rem;  
            height:auto;
            width: 100vw;
            background-color:var(--color-gris-claro);
            justify-content:center;
            align-items:center; 
        }
        :host([hidden]){
            display: none; 
        }
        #titulo{
            position:relative;
            text-align:center;
            font-size: var(--font-header-h1-size);
            font-weight: var(--font-header-h1-weight);
        }
        #leyenda{
            position:relative;
            text-align:center;
            font-size: var(--font-header-h2-size);
            font-weight: var(--font-header-h2-weight);
        }
        button, label {
            width:80vw;
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);
       }
        `
    }
    render() {
        return html `            
            <label id="titulo">
            ${idiomas[this.idioma].vercobertura.titulo}
            </label>
            <label id="leyenda" style="padding-bottom:1.5rem;">
            ${idiomas[this.idioma].vercobertura.subTitulo}
            </label>
            <button id="btn-planes" btn1 @click=${this.clickBoton1}>
            ${idiomas[this.idioma].vercobertura.btn1}
            </button>
            <button id="btn-asesor" btn3 @click=${this.clickBoton2}>
            ${idiomas[this.idioma].vercobertura.btn2}
            </button>
            <button id="btn-volver" btn2 @click=${this.clickBoton3}>
            ${idiomas[this.idioma].vercobertura.btn3}
            </button>
        `
    }

    clickBoton1() {
        //store.dispatch(modoPantalla("iniciosesion"))
    }
    clickBoton2() {
        //store.dispatch(modoPantalla("iniciosesion"))
    }
    clickBoton3() {
        store.dispatch(goPrev())
    }
    stateChanged(state, name) {

        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = state.screen.layouts[this.mediaSize].areas.find(a => a == this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-vercobertura-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
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
            layout: {
                type: String,
                reflect: true,
            },
            hidden: {
                type: Boolean,
                reflect: true,
            },
            area: {
                type: String
            },

        }
    }
}

window.customElements.define("pantalla-vercobertura", pantallaVerCobertura);