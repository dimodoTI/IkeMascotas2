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
    validaMail
} from "../../libs/funciones"
import {
    updateProfile
} from "../../redux/autorizacion/actions";
import {
    setDatos
} from "../../redux/cliente/actions";

import {
    llamador
} from "../../redux/fotos/actions";

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
import {
    getCantidad
} from "../../redux/mascotas/actions";


const CLIENTE_LOGUEADO = "cliente.logueadoTimeStamp"

const UPDATEPROFILE_TIMESTAMP = "autorizacion.updateProfileTimeStamp"
const CLIENTE_TIMESTAMP = "cliente.timeStamp"
const FOTOS_TIMESTAMP = "fotos.timeStamp"

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp"
const GETCANTIDAD_TIMESTAMP = "mascotas.getCantidadTimeStamp"


export class pantallaUsuariodetalle extends connect(store, SCREEN, MEDIA_CHANGE, CLIENTE_LOGUEADO, UPDATEPROFILE_TIMESTAMP, FOTOS_TIMESTAMP, GETCANTIDAD_TIMESTAMP)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.idioma = "ES"
        this.area = "body"
        this.item = {}
        this.label = ""
        this.cuantasMascotas = 0
        this.cuantasVacunas = 0
        this.cuantasConsultas = 0
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
        :host([media-size="small"]) #gridContenedor{
            grid-row-start:1;
            grid-row-end:3;
        }
 
        #cuerpo{
            position: relative;
            display:grid;
            padding:1rem;
            grid-auto-flow:row;
            grid-gap:.8rem;
            align-content:start;
            overflow-y: auto; 
            overflow-x: hidden; 
            height:90%;
        }

        :host(:not([media-size="small"])) #cuerpo{
            width:70%;
            justify-self:center;
        }
        #cuerpo::-webkit-scrollbar {
            display: none;
        }
        #marco{
            position: relative;
            display:grid;
            grid-auto-flow:row;
            grid-gap:.5rem;
            background-color: var(--color-blanco);
            box-shadow: var(--shadow-elevation-2-box);
            border-radius:1rem;
            justify-items:center;
        }
        #foto{
            position: absolute;
            top:-2.5rem;
            width: 5rem;
            height: 5rem;
            border-radius:50%;              
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100%;
            display: grid;
            align-content: end;
            justify-content: center;
            padding-bottom: 1rem;
            z-index:10;
        }
        #fotoEdit{ 
            position: relative;
            width: 1.5rem;
            height: 1.5rem;
            background-image:var(--icon-foto-edit);
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100%;
            z-index:10;
        }
        #lblTitNombre{
            padding-top: 3rem;
            font-size: var(--font-header-h1-size);
            font-weight: var(--font-header-h1-weight);
        }
        #lblPlan,#lblCreada{
            font-size: var(--font-header-h1-menos-size);
            font-weight: var(--font-header-h1-menos-weight);
        }
        #lblPlan{
            align-self: end;
        }
        #divLinea{
            width:90%;
            height:.1rem;
            background-color:var(--color-gris);
            align-self: start;
        }
        #divDatos{
            display:grid;
            width:90%;
            grid-template-columns:30% 40% 30%;
            grid-template-rows:50% 50%;
            justify-items: center;
            grid-gap:.5rem;
            padding-bottom:1rem;           
        }
        #divMascotaTitulo,#divConsultaTitulo,#divVacunaTitulo{
            font-size: var(--font-header-h1-menos-size);
            font-weight: var(--font-header-h1-menos-weight);
        }
        #divMascotaCan,#divConsultaCan,#divVacunaCan{
            font-size: var(--font-header-h1-size);
            font-weight: var(--font-header-h1-weight);      
        }
        #divInformacion{
            font-size: var(--font-header-h1-menos-size);
            font-weight: var(--font-header-h1-weight);
            justify-self: start;
        }
        button {
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);
        }
        #divAyuda{
            font-size: var(--font-header-h1-menos-size);
            font-weight: var(--font-header-h1-weight);
            text-align:center;
        }        
        #pie{
            position:relative;
            grid-area: Pie; 
            display:grid;
            overflow-x: none; 
        }
        :host([media-size="small"]) #pie{
            display:none;
        }
        `
    }
    render() {
        return html `
        

            <div id="cuerpo">
                <div style="height:1rem;width:100%"></div>
                <div id="marco">
                    
                    <div id="foto" style="background-image:url(${this.item.foto});">
                        <div id="fotoEdit" @click="${this.abreFoto}"></div>
                    </div>
                    <div id="lblTitNombre">${this.item.nombre}</div>
                    <div id="lblPlan">${this.item.plan}</div>
                    <div id="lblCreada">${this.item.creada}</div>
                    <div id="divLinea"></div>
                    <div id="divDatos">
                        <div id="divMascotaCan">${this.cuantasMascotas}</div>
                        <div id="divConsultaCan">${this.item.consultas}</div>
                        <div id="divVacunaCan">${this.item.vacunas}</div>
                        <div id="divMascotaTitulo">${idiomas[this.idioma].usuariodetalle.mascota}</div>
                        <div id="divConsultaTitulo">${idiomas[this.idioma].usuariodetalle.consulta}</div>
                        <div id="divVacunaTitulo">${idiomas[this.idioma].usuariodetalle.vacuna}</div>
                    </div>
                </div>
                <div id="divInformacion">${idiomas[this.idioma].usuariodetalle.informacion}</div>

                <div class="ikeInput">
                    <label id="lblMail">${idiomas[this.idioma].usuariodetalle.lblMail}</label>
                    <input id="txtMail"  @input=${this.activar} type="email" placeholder=${idiomas[this.idioma].usuariodetalle.lblMail_ph} .value="${this.item.email}" disabled>
                    <label id="lblErrorMail" error oculto>Mail Incorrecto</label>
                </div>

                <div class="ikeInput">
                    <label id="lblNombre">${idiomas[this.idioma].usuariodetalle.lblNombre}</label>
                    <input id="txtNombre"  @input=${this.activar} placeholder=${idiomas[this.idioma].usuariodetalle.lblNombre_ph} .value="${this.item.nombre}" >
                    <label id="lblErrorNombre" error oculto>${idiomas[this.idioma].usuariodetalle.lblNombreError}</label>
                </div>

                <div class="ikeInput">
                    <label id="lblApellido">${idiomas[this.idioma].usuariodetalle.lblApelldo}</label>
                    <input id="txtApellido"  @input=${this.activar} placeholder=${idiomas[this.idioma].usuariodetalle.lblApellido_ph} .value="${this.item.apellido}" >
                    <label id="lblErrorApellido" error oculto>${idiomas[this.idioma].usuariodetalle.lblApellidoError}</label>
                </div>



                <div class="ikeInput">
                    <label id="lblCelular">${idiomas[this.idioma].usuariodetalle.lblCelu}</label>
                    <input id="txtCelular"  @input=${this.activar} type="text" placeholder=${idiomas[this.idioma].usuariodetalle.lblCelu_ph} .value="${this.item.telefono}">
                    <label id="lblErrorCelular" error oculto>Celular Incorrecto</label>
                </div> 

                <button id="btnClave" btn2 style="justify-self:end" @click=${this.clickClave}>
                ${idiomas[this.idioma].usuariodetalle.btnClave}</button>
                <button id="btnEdit" btn1  @click=${this.clickEdit}>
                ${idiomas[this.idioma].usuariodetalle.btnEdit}</button>
                <button id="btnCobertura" btn3 @click=${this.clickCobertura}>
                ${idiomas[this.idioma].usuariodetalle.btnCobertura}</button>
                <button id="btnDelete" btn2 @click=${this.clickDelete}>
                ${idiomas[this.idioma].usuariodetalle.btnDelete}</button>

                <div id="divAyuda">${idiomas[this.idioma].usuariodetalle.lblAyuda}</div>

                <button id="btnAsistencia" btn3 @click=${this.clickAsistencia}>
                ${idiomas[this.idioma].usuariodetalle.btnAsistencia}</button>
                <div style="height:1rem;width:100%"></div>

            </div>
    

        `
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
        if (nombre.value.length < 4) {
            valido = false
            this.shadowRoot.querySelector("#lblErrorNombre").removeAttribute("oculto");
        }
        if (apellido.value == "") {
            valido = false
            this.shadowRoot.querySelector("#lblErrorApellido").removeAttribute("oculto");
        }
        if (celular.value.length < 8) {
            valido = false
            this.shadowRoot.querySelector("#lblErrorCelular").removeAttribute("oculto");
        }
        this.update()
        return valido
    }

    abreFoto() {
        store.dispatch(llamador("usuario"))
        store.dispatch(goTo("fotos"))
    }

    activar() {
        let nom = this.shadowRoot.getElementById("txtNombre");
        let mail = this.shadowRoot.getElementById("txtMail");
        let cel = this.shadowRoot.getElementById("txtCelular");
        if (nom.value != "" && mail.value != "" && cel.value != "") {
            if (this.shadowRoot.getElementById("btnEdit").hasAttribute("apagado")) {
                this.shadowRoot.querySelector("#btnEdit").removeAttribute("apagado", "");
            }
        } else {
            if (!this.shadowRoot.getElementById("btnEdit").hasAttribute("apagado")) {
                this.shadowRoot.querySelector("#btnEdit").setAttribute("apagado", "");
            }
        }
    }

    asignarValores(item) {
        item = {
            ...this.item
        }
        item.nombre = this.shadowRoot.querySelector("#txtNombre").value
        item.apellido = this.shadowRoot.querySelector("#txtApellido").value
        item.telefono = this.shadowRoot.querySelector("#txtCelular").value

        if (!store.getState().fotos.foto) {
            item.foto = store.getState().fotos.foto
        }

        return item
    }

    stateChanged(state, name) {

        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = state.screen.layouts[this.mediaSize].areas.find(a => a == this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-usuariodetalle-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
                this.item = store.getState().cliente.datos
                this.mascotas = store.getState().mascotas.entities
                this.vacunas = store.getState().mascotasvacunas.entities
                this.item.consultas = store.getState().reservas.reservaCantidad
                this.item.vacunas = this.vacunas ? this.vacunas.length : 0
                this.update();
            }
        }

        if (name == CLIENTE_LOGUEADO) {
            this.cuantasMascotas = state.mascotas.cantidad
            this.update()
        }

        if (name == GETCANTIDAD_TIMESTAMP) {
            this.cuantasMascotas = state.mascotas.cantidad
            this.update()
        }


        if (name == UPDATEPROFILE_TIMESTAMP) {
            store.dispatch(setDatos(this.asignarValores(this.item)))
        }

        if (name == FOTOS_TIMESTAMP && state.fotos.quien == "usuario") {
            const foto = this.shadowRoot.querySelector("#foto")
            const imagen = state.fotos.foto
            foto.style.backgroundImage = "url('" + imagen + "')"
            this.item.foto = imagen

        }

        this.update()

    }

    clickAtras() {
        //store.dispatch(modoPantalla(store.getState().ui.pantallaQueLLamo, "usuariodetalle"))
        store.dispatch(goTo())
    }

    clickClave() {
        store.dispatch(goTo("crearclave"))
    }
    clickEdit() {
        if (this.activar) {
            if (this.valido()) {
                const nombre = this.shadowRoot.querySelector("#txtNombre").value
                const apellido = this.shadowRoot.querySelector("#txtApellido").value
                const documento = this.item.documento
                let foto = this.item.foto
                if (!store.getState().fotos.foto) {
                    foto = store.getState().fotos.foto
                }

                const telefono = this.shadowRoot.querySelector("#txtCelular").value
                store.dispatch(updateProfile(nombre, apellido, documento, foto, telefono, store.getState().cliente.datos.token))
            }
        }
    }
    clickCobertura() {
        //store.dispatch(modoPantalla("plandetalle", "usuariodetalle"))
    }
    clickDelete() {}
    clickAsistencia() {}

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
            mediaSize: {
                type: String,
                reflect: true,
                attribute: 'media-size'
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

window.customElements.define("pantalla-usuariodetalle", pantallaUsuariodetalle);