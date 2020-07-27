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
    miCheckbox
} from "../componentes/checkbox"

import {
    login,
    LOGON,
    LOGON_ERROR
} from "../../redux/autorizacion/actions";

import {
    ATRAS
} from "../../../assets/icons/icons";

import {
    goTo
} from "../../redux/routing/actions"

import {
    validaMail
} from "../../libs/funciones"

const LOGIN_OK_ERROR = "cliente.logueadoTimeStamp"
const COMMAND_ERROR = "autorizacion.commandErrorTimeStamp"

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
export class pantallaInicioSesion extends connect(store, MEDIA_CHANGE, SCREEN, LOGIN_OK_ERROR, COMMAND_ERROR)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.area = "body"
        this.idioma = "ES"

    }

    static get styles() {
        return css `
        ${button}
        ${ikeInput}
        :host{ 
            position: relative;
            display:grid;
            background-color: var(--color-gris-fondo) !important;
            grid-auto-flow:row;
            grid-gap:.8rem;
            overflow-x: hidden;
            overflow-y: auto;
            padding: 1rem
        }   
        :host::-webkit-scrollbar{
            display: none;
        }   
        :host([hidden]){
            display: none; 
        }
        :host(:not([media-size="small"])){
            max-width: fit-content;
            min-width: 18rem;
            justify-self: center;
            max-height: fit-content;
            min-height: 20rem;
            align-self: center;
            border-radius: 1rem;
            box-shadow: var(--shadow-elevation-3-box);
        }
        #chk{
            font-size: var(--font-header-h2-size);
            font-weight: var(--font-header-h2-weight);
        }
        `
    }

    render() {
        return html `
            <div class="ikeInput">
                <label id="lblMail">${idiomas[this.idioma].inicioSesion.mail}</label>
                <input id="txtMail"  @input=${this.activar} type="email" placeholder=${idiomas[this.idioma].inicioSesion.mail_ph} value="bruno@ike.com">
                <label id="lblErrorMail" error oculto>${idiomas[this.idioma].inicioSesion.errorMail.err1}</label>
            </div>

            <div class="ikeInput">
                <label id="lblClave">${idiomas[this.idioma].inicioSesion.clave}</label>
                <input id="txtClave" @input=${this.activar} type="password" value="bruno">
                <label id="lblErrorClave" error oculto>${idiomas[this.idioma].inicioSesion.errorClave.err1}</label>
            </div>

            <mi-checkbox id="chk" label="${idiomas[this.idioma].inicioSesion.datos}"></mi-checkbox>

            <button id="btn-siguiente" style="height:7vh" btn1 apagado @click=${this.clickBoton1}>
            ${idiomas[this.idioma].inicioSesion.btn1}
            </button>
            <button id="btn-cuenta" btn2 @click=${this.clickBoton2}>
            ${idiomas[this.idioma].inicioSesion.btn2}
            </button>
            <button id="btn-sinregistro" btn2 @click=${this.clickBoton3}>
            ${idiomas[this.idioma].inicioSesion.btn3}
            </button>
        `
    }

    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = state.screen.layouts[this.mediaSize].areas.find(a => a == this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-inicioSesion-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
            }
            this.update();
        }
    }


    activar() {
        this.activo = true
        const clave = this.shadowRoot.querySelector("#txtClave")
        const email = this.shadowRoot.querySelector("#txtMail")
        if (clave.value.length < 4) {
            this.activo = false
        }
        if (email.value.length < 4) {
            this.activo = false
        }
        if (this.activo) {
            this.shadowRoot.querySelector("#btn-siguiente").removeAttribute("apagado")
        } else {
            this.shadowRoot.querySelector("#btn-siguiente").setAttribute("apagado", "")
        }
        this.update()
    }

    valido() {
        [].forEach.call(this.shadowRoot.querySelectorAll("[error]"), element => {
            element.setAttribute("oculto", "")
        })
        let valido = true
        const clave = this.shadowRoot.querySelector("#txtClave")
        const email = this.shadowRoot.querySelector("#txtMail")
        if (clave.value.length < 3) {
            valido = false
            this.shadowRoot.querySelector("#lblErrorClave").removeAttribute("oculto");
        }
        if (!validaMail(email.value)) {
            valido = false
            this.shadowRoot.querySelector("#lblErrorMail").removeAttribute("oculto");
        }
        this.update()
        return valido
    }

    clickBoton1() {
        if (this.activo) {
            if (this.valido()) {
                const clave = this.shadowRoot.querySelector("#txtClave").value
                const email = this.shadowRoot.querySelector("#txtMail").value
                store.dispatch(login(email, clave))
                //store.dispatch(goTo("principal"))
                //store.dispatch(modoPantalla("principal", "inicioSesion"));
            }
        }
    }

    clickBoton2() {
        store.dispatch(goTo("recuperaclave"))
    }

    clickBoton3() {
        store.dispatch(goTo("principal"))

    }

    firstUpdated() {
        this.activar()
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
window.customElements.define("pantalla-iniciosesion", pantallaInicioSesion);