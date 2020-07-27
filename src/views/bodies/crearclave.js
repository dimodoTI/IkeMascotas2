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
    button
} from "../css/button"
import {
    ikeInput
} from "../css/ikeInput"


import {
    renovacion
} from "../../redux/autorizacion/actions";
import {
    getParameterByName
} from "../../libs/helpers"

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

const RENOVACION_OK_ERROR = "cliente.renovadoTimeStamp"
const COMMAND_ERROR = "autorizacion.commandErrorTimeStamp"

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp"
export class pantallaCrearClave extends connect(store, SCREEN, MEDIA_CHANGE, RENOVACION_OK_ERROR, COMMAND_ERROR)(LitElement) {
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
        this.label = ""
    }

    static get styles() {
        return css `
        ${ikeInput}
        ${button}

        :host{
            position: absolute;
            top: 0rem;
            left: 0rem;  
            height:100%;
            width: 100%;
            background-color:var(--color-gris-fondo);
            display:grid;
            
        }
        :host([hidden]){
            display: none; 
        } 
        #cuerpo{
            background-color: transparent;
            display:grid;
            padding:2rem;
            grid-auto-flow:row;
            grid-gap:.8rem;
            align-content:start
        }
        label {
            position: relative;
            width: 80%;
            color: var(--color-negro);
            background-color:transparent;
            border-radius:0;
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);
        }
        `
    }
    render() {
        return html `

        <div id="cuerpo">
            <div class="ikeInput">
                <label id="lblClave1">${idiomas[this.idioma].crearclave.clave1}</label>
                <input id="txtClave1"  @input=${this.activar} type="password">
                <label id="lblErrorClave1" error oculto>${idiomas[this.idioma].crearclave.errorClave1.err1}</label>
            </div>

            <div class="ikeInput">
                <label id="lblClave2">${idiomas[this.idioma].crearclave.clave2}</label>
                <input id="txtClave2" @input=${this.activar} type="password">
                <label id="lblErrorClave2" error oculto>${idiomas[this.idioma].crearclave.errorClave2.err1}</label>
                <label id="lblErrorClave22" error oculto>${idiomas[this.idioma].crearclave.errorClave2.err2}</label>
            </div>
            <button id="btn-recuperar" btn1 apagado @click=${this.clickBoton2}>
            ${idiomas[this.idioma].crearclave.btn1}
            </button>
        </div>
        `
    }
    activar() {
        this.activo = true
        const clave1 = this.shadowRoot.querySelector("#txtClave1")
        const clave2 = this.shadowRoot.querySelector("#txtClave2")
        if (clave1.value.length < 4) {
            this.activo = false
        }
        if (clave2.value.length < 4) {
            this.activo = false
        }
        if (this.activo) {
            this.shadowRoot.querySelector("#btn-recuperar").removeAttribute("apagado")
        } else {
            this.shadowRoot.querySelector("#btn-recuperar").setAttribute("apagado", "")
        }
        this.update()
    }
    valido() {
        [].forEach.call(this.shadowRoot.querySelectorAll("[error]"), element => {
            element.setAttribute("oculto", "")
        })
        let valido = true
        const clave1 = this.shadowRoot.querySelector("#txtClave1")
        const clave2 = this.shadowRoot.querySelector("#txtClave2")
        if (clave1.value.length < 8) {
            valido = false
            this.shadowRoot.querySelector("#lblErrorClave1").removeAttribute("oculto");
        }
        if (clave2.value.length < 8) {
            valido = false
            this.shadowRoot.querySelector("#lblErrorClave2").removeAttribute("oculto");
        }
        if (clave1.value != clave2.value) {
            valido = false
            this.shadowRoot.querySelector("#lblErrorClave22").removeAttribute("oculto")
        }
        this.update()
        return valido
    }
    clickBoton1() {
        store.dispatch(goTo("iniciosesion"))
    }
    clickBoton2() {
        if (this.activo) {
            if (this.valido()) {
                const ticket = getParameterByName("ticket")
                const clave1 = this.shadowRoot.querySelector("#txtClave1").value
                store.dispatch(renovacion(ticket, clave1))

            }
        }
    }
    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = state.screen.layouts[this.mediaSize].areas.find(a => a == this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-crearclave-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
            }
            this.update();
        }


        if (name == RENOVACION_OK_ERROR) {
            if (state.cliente.renovado) {
                store.dispatch(goTo("crearclavemsg"));
            } else {
                alert("Enlace vencido. Vuelva a solicitar el recupero de clave")
            }
        }
        if (name == COMMAND_ERROR) {
            alert("Problemas con la conexión. Intente mas tarde")
            return
        }

    }
    firstUpdated() {}

    static get properties() {
        return {
            hidden: {
                type: Boolean,
                reflect: true
            },
            label: {
                type: String,
                reflect: ""
            },
            layout: {
                type: String,
                reflect: true,
            },
            area: {
                type: String
            },
            mediaSize: {
                type: String,
                reflect: true,
                attribute: 'media-size'
            },
        }
    }
}

window.customElements.define("pantalla-crearclave", pantallaCrearClave);