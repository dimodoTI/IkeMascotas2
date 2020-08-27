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
    goTo
} from "../../redux/routing/actions"
import {
    isInLayout
} from "../../redux/screens/screenLayouts";

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
export class pantallaCrearClaveMsg extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.area = "body"
        this.idioma = "ES"
    }

    static get styles() {
        return css `
        ${label}
        ${button}
        :host{
            position: relative;
            display:grid;
            grid-template-rows: 10% 30% 20% 40%;
            grid-gap:0.5rem;
            background-color:var(--color-gris-fondo) !important;
            justify-content:center;
            align-items:center; 
        }
        :host([hidden]){
            display: none; 
        }
        :host(:not([media-size="small"])){
            max-width: fit-content;
            min-width: 18rem;
            justify-self: center;
            max-height: fit-content;
            min-height: 18rem;
            align-self: center;
            border-radius: 1rem;
            box-shadow: var(--shadow-elevation-3-box);
        }
        #x{
            position: relative;
            align-self: flex-start;
            justify-self: flex-end;
        }
        #titulo{
            position:relative;
            text-align:center;
            align-self: flex-end;
            font-size: var(--font-header-h1-size);
            font-weight: var(--font-header-h1-weight);
        }
        #leyenda{
            position:relative;
            text-align:center;
            align-self: flex-start;
            font-size: var(--font-header-h2-size);
            font-weight: var(--font-header-h2-weight);
        }
        #btn-ingresar {
            height: 7vh;
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);
       }
        `
    }
    render() {
        return html `
            <div id="x" @click=${this.clickBoton1}>
            </div>               
            <label id="titulo">
            ${idiomas[this.idioma].crearClaveMsg.titulo}
            </label>
            <label id="leyenda">
            ${idiomas[this.idioma].crearClaveMsg.subTitulo}
            </label>
            <button id="btn-ingresar" btn1 @click=${this.clickBoton1}>
            ${idiomas[this.idioma].crearClaveMsg.btn1}
            </button>


        `
    }

    clickBoton1() {
        store.dispatch(goTo("inicioSesion"))
    }

    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = isInLayout(state, this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-crearClaveMsg-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
            }
            this.update();
        }
    }
    firstUpdated() {}

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
            },
            hidden: {
                type: Boolean,
                reflect: true,
            },
            area: {
                type: String
            }
        }
    }
}

window.customElements.define("pantalla-crearclavemsg", pantallaCrearClaveMsg);