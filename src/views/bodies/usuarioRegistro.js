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
    ikeInput
} from "../css/ikeInput"

import {
    button
} from "../css/button"


import {
    logon
} from "../../redux/autorizacion/actions"
import {
    setDatos
} from "../../redux/cliente/actions";
import {
    validaMail
} from "../../libs/funciones"
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

const LOGON_OK = "autorizacion.logonTimeStamp"


const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp"
export class pantallaUsuarioRegistro extends connect(store, SCREEN, MEDIA_CHANGE, LOGON_OK)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.area = "body"
        this.idioma = "ES"
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
            position: relative;
            display: grid;
            grid-auto-flow: row;
             overflow-x: hidden;
            overflow-y: auto;
            background-color: #FAFAFA !important;
            gap: 0.8rem;    
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
        #cuerpo::-webkit-scrollbar {
            display: none;
        }
        button {
            position: relative;
        }
        `
    }
    render() {
        return html `

        
            <div class="ikeInput">
                <label id="lblNombre">${idiomas[this.idioma].usuarioregistro.lblNombre}</label>
                <input id="txtNombre"  @input=${this.activar} placeholder=${idiomas[this.idioma].usuarioregistro.lblNombre_ph}>
                <label id="lblErrorNombre" error oculto>Nombre Incorrecto</label>
            </div>

            <div class="ikeInput">
                <label id="lblApellido">${idiomas[this.idioma].usuarioregistro.lblApellido}</label>
                <input id="txtApellido"  @input=${this.activar} placeholder=${idiomas[this.idioma].usuarioregistro.lblApellido_ph}>
                <label id="lblErrorApellido" error oculto>Apellido Incorrecto</label>
            </div>

            <div class="ikeInput">
                <label id="lblMail">${idiomas[this.idioma].usuarioregistro.lblMail}</label>
                <input id="txtMail"  @input=${this.activar} type="email" placeholder=${idiomas[this.idioma].usuarioregistro.lblMail_ph}>
                <label id="lblErrorMail" error oculto>Mail Incorrecto</label>
            </div>

            <div class="ikeInput">
                <label id="lblCelular">${idiomas[this.idioma].usuarioregistro.lblCelu}</label>
                <input id="txtCelular"  @input=${this.activar} type="tel" placeholder=${idiomas[this.idioma].usuarioregistro.lblCelu_ph}>
                <label id="lblErrorCelular" error oculto>Celular Incorrecto</label>
            </div> 

            <button id="btnIngresar" btn1 apagado style="margin-top:1rem;margin-bottom:.8rem" @click=${this.clickBoton1}>
            ${idiomas[this.idioma].usuarioregistro.btn1}</button>
            <button id="btnPlan" btn3 @click=${this.clickBoton2}>${idiomas[this.idioma].usuarioregistro.btn2}
            </button>
            <!-- <button id="btnInvitado" btn2 @click=${this.clickBoton3} style="padding-bottom:.5rem;">${idiomas[this.idioma].usuarioregistro.btn3}</button> -->
            <div ></div>

       
        `
    }
    activar() {
        this.activo = true
        const nombre = this.shadowRoot.getElementById("txtNombre");
        const apellido = this.shadowRoot.getElementById("txtApellido");
        const mail = this.shadowRoot.getElementById("txtMail");
        const celular = this.shadowRoot.getElementById("txtCelular");
        /* const clave1 = this.shadowRoot.querySelector("#txtClave1")
        const clave2 = this.shadowRoot.querySelector("#txtClave2") */
        if (nombre.value.length < 2) {
            this.activo = false
        }
        if (apellido.value.length < 2) {
            this.activo = false
        }
        if (mail.value.length < 4) {
            this.activo = false
        }
        if (celular.value.length < 4) {
            this.activo = false
        }
        /* if (clave1.value.length < 4) {
            this.activo = false
        }
        if (clave2.value.length < 4) {
            this.activo = false
        } */
        if (this.activo) {
            this.shadowRoot.querySelector("#btnIngresar").removeAttribute("apagado")
        } else {
            this.shadowRoot.querySelector("#btnIngresar").setAttribute("apagado", "")
        }
        this.update()
    }

    valido() {
        [].forEach.call(this.shadowRoot.querySelectorAll("[error]"), element => {
            element.setAttribute("oculto", "")
        })
        let valido = true
        const nombre = this.shadowRoot.getElementById("txtNombre");
        const apellido = this.shadowRoot.getElementById("txtApellido");
        const mail = this.shadowRoot.getElementById("txtMail");
        const celular = this.shadowRoot.getElementById("txtCelular");
        //const clave1 = this.shadowRoot.querySelector("#txtClave1")
        //const clave2 = this.shadowRoot.querySelector("#txtClave2")
        if (nombre.value.length < 2) {
            valido = false
            this.shadowRoot.querySelector("#lblErrorNombre").removeAttribute("oculto");
        }
        if (apellido.value.length < 2) {
            valido = false
            this.shadowRoot.querySelector("#lblErrorApellido").removeAttribute("oculto");
        }
        if (!validaMail(mail.value)) {
            valido = false
            this.shadowRoot.querySelector("#lblErrorMail").removeAttribute("oculto");
        }
        if (celular.value.length < 8) {
            valido = false
            this.shadowRoot.querySelector("#lblErrorCelular").removeAttribute("oculto");
        }

        this.update()
        return valido
    }

    stateChanged(state, name) {

        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = state.screen.layouts[this.mediaSize].areas.find(a => a == this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-usuarioregistro-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
            }
            this.update();
        }

        if (name == LOGON_OK) {
            store.dispatch(goTo("recuperaclavemsg"))
        }
    }
    firstUpdated() {}
    clickBoton4() {

        //store.dispatch(())
    }
    clickBoton1() {
        if (this.activo) {
            if (this.valido()) {
                //store.dispatch(modoPantalla("principal", "usuarioregistro"))
                const nombre = this.shadowRoot.getElementById("txtNombre").value;
                const apellido = this.shadowRoot.getElementById("txtApellido").value;
                const mail = this.shadowRoot.getElementById("txtMail").value;
                const telefono = this.shadowRoot.getElementById("txtCelular").value;
                store.dispatch(setDatos({
                    nombre: nombre,
                    apellido: apellido,
                    email: mail,
                    telefono: telefono
                }))

                store.dispatch(logon(nombre, apellido, mail, store.getState().cliente.datos.documento, telefono))
            }
        }
    }
    clickBoton2() {
        store.dispatch(goTo("planDetalle"))
    }




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

window.customElements.define("pantalla-usuarioregistro", pantallaUsuarioRegistro);