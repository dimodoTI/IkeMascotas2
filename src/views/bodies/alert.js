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
    goTo
} from "../../redux/routing/actions"
import {
    isInLayout
} from "../../redux/screens/screenLayouts";
import {
    showAlert,
    hideAlert
} from "../../redux/ui/actions"

import {
    button
} from "../css/button"

const ALERT = "ui.alert.timeStamp"
const SCREEN = "screen.timeStamp";
const MEDIA_CHANGE = "ui.media.timeStamp"

export class pantallaAlert extends connect(store, ALERT, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.idioma = "ES",
            this.tipo = 0
    }

    static get styles() {
        return css `
        ${label}
        ${button}

        :host{
            position: absolute;
            display:grid;
            top:0rem;
            left:0rem;
            bottom:0rem;
            right:0rem;
            height:100vh;
            width:100vw;
            z-index:1000;
        }
        :host([hidden]){
            display: none; 
        }
        #fondo{
            position: absolute;
            display:grid;
            top:0rem;
            left:0rem;
            bottom:0rem;
            right:0rem;
            height:100%;
            width:100%;            
            background-color:var(--color-negro) !important;
            opacity:.3;
            backdrop-filter: blur(2px);
        }
        #datos{
            position:relative;
            display:grid;
            max-width: fit-content;
            min-width: 14rem;
            justify-self: center;
            max-height: fit-content;
            min-height: 8rem;
            align-self: center;
            border-radius: 1rem;
            box-shadow: var(--shadow-elevation-3-box);
            grid-template-rows: 5% 15% 15% 15%;
            grid-gap:0.5rem;
            background-color:var(--color-gris-fondo) !important;
            align-items:center; 
        }

        #x{
            position: relative;
            align-self: flex-start;
            justify-self: flex-end;
            padding: .6rem 1rem 0 0 ;
        }

        #titulo{
            position:relative;
            text-align:center;
            font-size: var(--font-header-h1-menos-size);
            font-weight: var(--font-header-h1-menos-weight);
        }
        #cuerpo{
            position:relative;
            text-align:center;
            width:80%;
            justify-self: center;
            align-self: flex-start;
            font-size: var(--font-header-h2-size);
            font-weight: var(--font-header-h2-weight);
        }

        .sino{
            display:none;
            grid-template-columns:1fr 1fr   ;
            width:70%;
            justify-self:center;
            grid-gap: .5rem;
            align-self: flex-start;
        }
        .sino[tipo="1"]{
            display:grid
        }

        .aceptar{
            display:none;
            width:50%;
            justify-self:center;
        }

        .aceptar[tipo="0"]{
            display:grid
        }

        `
    }
    render() {
        return html `
            <div id="fondo"  @click=${this.clickBoton1}></div>
            <div id="datos" >
                <div id="x"  @click=${this.clickBoton1}>
                X
                </div>               
                <label id="titulo" >
                </label>
                <label id="cuerpo">
                </label>
                <div class="aceptar" tipo="${this.tipo}">
                    <button type="button" id="btnAceptar"  btn3 @click="${this.esconder}">Aceptar</button>
                </div>
                
                <div  class="sino" tipo="${this.tipo}">
                    <button btn3 id="yes" @click="${this.botonesSiNo}" value=1>Si</button>
                    <button btn3 id="no" @click="${this.botonesSiNo}" value=0>No</button>
                </div>
            </div>
        `
    }
    stateChanged(state, name) {
        if (name == ALERT) {
            this.hidden = state.ui.alert.hidden
            if (!this.hidden) {
                var titulo = this.shadowRoot.querySelector("#titulo")
                var cuerpo = this.shadowRoot.querySelector("#cuerpo")
                titulo.innerHTML = state.ui.alert.header
                cuerpo.innerHTML = state.ui.alert.message.reduce((text, msg) => {
                    return text + "• " + msg.campo + ": " + msg.mensaje + "\n"
                }, "")
                this.tipo = state.ui.alert.tipo

            }
            this.update();
        }
    }

    botonesSiNo(e) {
        store.dispatch(hideAlert(e.currentTarget.value))
    }


    esconder() {
        store.dispatch(hideAlert(0))
    }

    clickBoton1() {
        store.dispatch(hideAlert(0))
    }


    firstUpdated() {}

    static get properties() {
        return {
            mediaSize: {
                type: String,
                reflect: true,
                attribute: 'media-size'
            },
            hidden: {
                type: Boolean,
                reflect: true,
            },

        }
    }
}

window.customElements.define("pantalla-alert", pantallaAlert);