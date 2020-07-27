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
    recupero
} from "../../redux/autorizacion/actions";

import {
    validaMail
} from "../../libs/funciones"

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

const RECUPERO_OK_ERROR = "cliente.recuperandoTimeStamp"
const COMMAND_ERROR = "autorizacion.commandErrorTimeStamp"

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp"
export class pantallaRecuperaClave extends connect(store, SCREEN, MEDIA_CHANGE, RECUPERO_OK_ERROR, COMMAND_ERROR)(LitElement) {
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
        ${button}
        ${ikeInput}

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
        #cuerpo::-webkit-scrollbar{
            display: none;
        }
        `
    }
    render() {
        return html `

        <div id="cuerpo">
            <div class="ikeInput">
                <label id="lblMail">${idiomas[this.idioma].recuperaclave.mail}</label>
                <input id="txtMail"  @input=${this.activar} type="email" placeholder=${idiomas[this.idioma].recuperaclave.mail_ph}>
                <label id="lblErrorMail" error oculto>${idiomas[this.idioma].recuperaclave.errorMail.err1}</label>
            </div>

            <div class="ikeInput">
                <label id="lblDocumento">${idiomas[this.idioma].recuperaclave.documento}</label>
                <input id="txtDocumento" @input=${this.activar} type="number" placeholder=${idiomas[this.idioma].recuperaclave.documento_ph}>
                <label id="lblErrorDocumento" error oculto>${idiomas[this.idioma].recuperaclave.errorDocumento.err1}</label>
            </div>
            <button id="btn-recuperar" btn1 apagado @click=${this.clickBoton2}>
                ${idiomas[this.idioma].recuperaclave.btn1}
            </button>
        </div>
        `
    }
    activar() {
        this.activo = true
        const email = this.shadowRoot.querySelector("#txtMail")
        const documento = this.shadowRoot.querySelector("#txtDocumento")
        if (documento.value.length < 4) {
            this.activo = false
        }
        if (email.value.length < 4) {
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
        const documento = this.shadowRoot.querySelector("#txtDocumento")
        const email = this.shadowRoot.querySelector("#txtMail")
        if (documento.value.length < 8) {
            valido = false
            this.shadowRoot.querySelector("#lblErrorDocumento").removeAttribute("oculto");
        }
        if (!validaMail(email.value)) {
            valido = false
            this.shadowRoot.querySelector("#lblErrorMail").removeAttribute("oculto");
        }
        this.update()
        return valido
    }


    clickBoton2() {
        if (this.activo) {
            if (this.valido()) {
                store.dispatch(recupero(this.shadowRoot.querySelector("#txtMail").value))
            }
        }
    }

    stateChanged(state, name) {

        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = state.screen.layouts[this.mediaSize].areas.find(a => a == this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-recuperaclave-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
            }
            this.update();
        }

        if (name == RECUPERO_OK_ERROR) {
            if (state.cliente.recuperando) {
                store.dispatch(goTo("recuperaclavemsg"))
            } else {
                alert("Datos incorrectos")
            }
        }
        if (name == COMMAND_ERROR) {
            alert("Problemas con la conexión. Intente mas tarde")
            return
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

        }
    }
}

window.customElements.define("pantalla-recuperaclave", pantallaRecuperaClave);