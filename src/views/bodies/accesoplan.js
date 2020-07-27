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
    ikeInput
} from "../css/ikeInput"

import {
    setDatos
} from "../../redux/cliente/actions"

import {
    goNext,
    goTo
} from "../../redux/routing/actions"
import {
    isInLayout
} from "../../redux/screens/screenLayouts";
import {
    showScreen
} from "../../redux/screens/actions";

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp"

export class pantallaAccesoPlan extends connect(store, SCREEN, MEDIA_CHANGE)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.idioma = "ES"
        this.area = "body"
        this.item = {
            mail: "",
            clave: "",
            recordar: ""
        }
    }

    static get styles() {
        return css `
        ${ikeInput}
        ${button}

        :host{
            position: relative;
            display: grid;
            grid-auto-flow: row;
             overflow-x: hidden;
            overflow-y: auto;
            background-color: #FAFAFA !important;
            grid-gap: 2rem;
            padding: 1rem;
        }
        :host([hidden]){
            display: none; 
        } 

        :host(:not([media-size="small"])){
            max-width: fit-content;
            min-width: 18rem;
            justify-self: center;
            max-height:99%;
            min-height:10rem;
            align-self: center;
            border-radius: 1rem;
            box-shadow: var(--shadow-elevation-3-box);
            grid-gap:0;

           
        }

        `
    }
    render() {
        return html `


            <div class="ikeInput">
                <label id="lblDocumento">${idiomas[this.idioma].accesoplan.documento}</label>
                <input id="txtDocumento" @input=${this.activar} type="number" placeholder=${idiomas[this.idioma].accesoplan.documento_ph}>
                <label id="lblErrorDocumento" error oculto>${idiomas[this.idioma].accesoplan.errorDocumento.err1}</label>
            </div> 
            <button id="btnIngresar" btn1 apagado  @click=${this.clickBoton1}>
            ${idiomas[this.idioma].accesoplan.btn1}</button>
            <button id="btnPlan" btn3 @click=${this.clickBoton2}>${idiomas[this.idioma].accesoplan.btn2}
            </button>
            <button id="btnInvitado" btn2 @click=${this.clickBoton3}>${idiomas[this.idioma].accesoplan.btn3}</button>
            <button id="btnTengoCuenta" btn2 @click=${this.clickBoton4}>${idiomas[this.idioma].accesoplan.btn4}</button>
            <button id="btnAyuda" btn2 @click=${this.clickBoton5}>${idiomas[this.idioma].accesoplan.btn5}</button>
   
        `
    }

    activar() {
        this.activo = true
        const documento = this.shadowRoot.querySelector("#txtDocumento")
        if (documento.value.length < 6) {
            this.activo = false
        }
        if (this.activo) {
            this.shadowRoot.querySelector("#btnIngresar").removeAttribute("apagado")
        } else {
            this.shadowRoot.querySelector("#btnIngresar").setAttribute("apagado", "")
        }
        this.update()
    }

    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = state.screen.layouts[this.mediaSize].areas.find(a => a == this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-accesoplan-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
            }
            this.update();
        }
    }

    valido() {
        [].forEach.call(this.shadowRoot.querySelectorAll("[error]"), element => {
            element.setAttribute("oculto", "")
        })
        let valido = true
        const documento = this.shadowRoot.querySelector("#txtDocumento")
        if (documento.value.length < 8) {
            valido = false
            this.shadowRoot.querySelector("#lblErrorDocumento").removeAttribute("oculto");
        }
        this.update()
        return valido
    }
    clickBoton1() {
        if (this.activo) {
            if (this.valido()) {
                const documento = this.shadowRoot.querySelector("#txtDocumento").value
                store.dispatch(setDatos({
                    documento: documento
                }))
                store.dispatch(goTo("usuarioregistro"));
            }
        }
    }
    clickBoton2() {
        //store.dispatch(modoPantalla("usuarioregistro", "accesoplan"))
        store.dispatch(goTo("usuariodetalle"))
    }
    clickBoton3() {
        store.dispatch(goTo("principal"))
    }
    clickBoton4() {
        store.dispatch(goTo("inicioSesion"))
    }
    clickBoton5() {
        store.dispatch(goTo("vercobertura"))
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
            area: {
                type: String
            }
        }
    }
}

window.customElements.define("pantalla-accesoplan", pantallaAccesoPlan);