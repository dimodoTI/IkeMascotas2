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
    ATRAS,
    ARCHIVO,
    TRASH
} from "../../../assets/icons/icons"


import {
    cardArchivo
} from "../css/cardArchivo"




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
    upload,
    delCliente,
    borrarAdjunto as patchAdjuntos
} from "../../redux/adjuntos/actions"

import {
    button
} from "../css/button"
import {
    anularReserva
} from "../../redux/reservas/actions";

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp"
const RESERVASENATENCION_TIMESTAMP = "reservas.enAtencionTimeStamp"
const ADJUNTOS_DELCLIENTE_TIMESTAMP = "adjuntos.delClienteTimeStamp"
const ADJUNTOS_DELVETERINARIO_TIMESTAMP = "adjuntos.delVeterinarioTimeStamp"
export class pantallaDiagnosticosDetalles extends connect(store, SCREEN, MEDIA_CHANGE, RESERVASENATENCION_TIMESTAMP, ADJUNTOS_DELCLIENTE_TIMESTAMP, ADJUNTOS_DELVETERINARIO_TIMESTAMP)(LitElement) {
    constructor() {
        super();
        this.idioma = "ES"
        this.reservas = null
        this.area = "body"
        this.current = "diagnosticoDetalles"
        this.hidden = true

        this.reservaEnAtencion = {
            Id: 0,
            Atencion: {
                Diagnostico: "",
                Veterinario: {}
            },
            Mascota: {
                Nombre: ""
            }

        }
        this.adjuntosCliente = []
        this.adjuntosVenterinario = []


    }

    static get styles() {
        return css `

        ${cardArchivo}
        ${button}

        :host{
            display: grid;
            position: relative;
            background-color: var(--color-gris-fondo) !important;
            overflow-x:none;
            overflow-y:auto;
        }

        :host([hidden]){
            display: none; 
        }
        :host(:not([media-size="small"])){
            grid-template-rows: 100%;
        }
        :host([media-size="small"]){
            grid-template-rows: 9fr 1fr;
        }
        #gridContenedor{
            display:grid;
            grid-template-rows:18fr 82fr;           
        }
        #cuerpo{           
            display:grid;
            position:relative;
          
            padding: 0 1rem 0 1rem;
            grid-template-rows: 2rem 8rem 6rem 1rem;
            overflow-x:none;
            overflow-y:auto;

        }
        #cuerpo::-webkit-scrollbar {
            display: none;
        }

        #divAtencion{
            display:grid;
            padding: .5rem 1rem .5rem 1rem;
            font-size: var(--font-label-size);
            font-weight: var(--font-label-weight);
            background-color: transparent;
            grid-gap: .2rem;
            border-radius: .4rem;            
        }

        :host([media-size="small"]) #control{
            height:calc((100vh * .82) * .9);
        }
        :host(:not([media-size="small"])) #control{
            height:calc(100vh * .82);
        }
        #divTitulo{
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);   
            align-self:center;
        }
        #lblDiagnostico{
            font-size: var(--font-label-size);
            font-weight: var(--font-label-weight);   
        }
        #txtDiagnostico{
            font-family:var(--font-label-family);
            font-size:var(--font-label-size);
            font-weight:var(--font-label-weight);
        }
        #divRecetas{
            display:grid;
            height: fit-content;
            grid-gap:1vh;
            overflow-x:none;
            overflow-y:auto;
            margin : 1vh 0 1vh 0;
            align-content: baseline;
        }
        #divRecetas::-webkit-scrollbar {
            display: none;
        }
        #divTituloConsulta{
            display:grid;
            align-content: center;
            width: 100%;
            height:5vh;
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);   
            padding-left:1rem

        }
        #divDetalle{
            display:grid;
            padding: .5rem 1rem .5rem 1rem;
            font-size: var(--font-label-size);
            font-weight: var(--font-label-weight);
            background-color:   transparent;
            grid-gap: .2rem;
            border-radius: .4rem;
        }
        `
    }

    render() {
        return html `
            <div id="divAtencion">
                <label id="lblVeterinario">${idiomas[this.idioma].diagnosticoDetalles.veterinario + "  " + this.verVeterinario() }</label>
                <label id="lblComienzo">${idiomas[this.idioma].diagnosticoDetalles.lblComienzo + " " + this.comenzo()}</label>
                <label id="lblFinal">${idiomas[this.idioma].diagnosticoDetalles.lblFinal + " " + this.termino()}</label>
                <label  id="lblDiagnostico">${idiomas[this.idioma].diagnosticoDetalles.lblDiagnostico}</label>
                <textarea id="txtDiagnostico" rows="8" readonly>${this.reservaEnAtencion.Atencion ? this.reservaEnAtencion.Atencion.Diagnostico : ""}</textarea>
                <div style="font-size:.5rem">
                    *La atención veterinaria por video consulta es complementaria a la consulta presencial y no la remplaza.
                    En caso que después de esta consulta los síntomas no mejoraran dentro de las 48 hs deberá concurrir a una consulta presencial

                </div>
                <div id="divRecetas">
                    ${this.adjuntosVenterinario.map(dato => html`
                        <div id="ciDivEtiqueta">
                            <div id="ciDivContenido" style="grid-column-start:1;grid-column-end:3" .link="${dato.Url}" @click=${this.irA}>
                                <div id="ciDivIcomo">${ARCHIVO}</div>
                                <div id="ciDivNombre">${dato.Nombre}</div>
                            </div>
                        </div>
                    `)} 

                </div>
            </div>

            <div id="divTituloConsulta">
                ${idiomas[this.idioma].diagnosticoDetalles.tituloconsulta}
            </div>
            <div id="divDetalle">
                <label id="lblExpediente">${idiomas[this.idioma].diagnosticoDetalles.expediente + " " + this.reservaEnAtencion.Id}</label>
                <label id="lblPaciente">${idiomas[this.idioma].diagnosticoDetalles.paciente + " " + this.verNombre()}</label>           
                <label id="lblMotivo">${idiomas[this.idioma].diagnosticoDetalles.motivo + " " + this.reservaEnAtencion.Motivo}</label>           
                <label id="lblFecha">${idiomas[this.idioma].diagnosticoDetalles.fecha + " " + this.verFecha(this.reservaEnAtencion.FechaAtencion)}</label>           
                <label id="lblHora">${idiomas[this.idioma].diagnosticoDetalles.hora + " " + this.reservaEnAtencion.HoraAtencion}</label>           
                <label id="lblVeterinario">${idiomas[this.idioma].diagnosticoDetalles.usuario + " " + this.verUsuario()}</label>           
                <div style="padding-top:.5rem;display:grid;grid-gap:.5rem">
                    ${this.adjuntosCliente.map(dato => html`
                        <div id="ciDivEtiqueta">
                            <div id="ciDivContenido" style="grid-column-start:1;grid-column-end:3" >
                                <div id="ciDivIcomo" .link="${dato.Url}"  @click=${this.irA}>${ARCHIVO}</div>
                                <div id="ciDivNombre" .link="${dato.Url}"  @click=${this.irA}>${dato.Nombre}</div>
                                <div id="ciDivIconoBorrar" .item="${dato}" @click="${this.borrarAdjunto}">${TRASH}</div>
                            </div>
                        </div>
                    `)}
                    <form id="form" name="form" action="/uploader" enctype="multipart/form-data" method="POST" style="justify-self: center;">
                        <input id="files" name="files" type="file" size="1" style="display:none" @change="${this.uploadFiles}" />
                        <button type="button" id="btn-adjuntar" btn3 @click=${this.adjuntar} >
                                ${idiomas[this.idioma].consulta.btn1}
                        </button>
                       
                    </form>   
                    <button id="btnBorrar" btn2 ?anular="${this.veoSiBorro()}"  @click="${this.borrarReserva}">Borrar Reserva</button>
                </div>
            </div>          
        `
    }



    veoSiBorro() {

        if (this.reservaEnAtencion.Atencion) return true


        let fechaHoy = new Date()
        fechaHoy = (new Date(fechaHoy.getTime() - (fechaHoy.getTimezoneOffset() * 60000))).toJSON()
        const retorno = this.reservaEnAtencion.FechaAtencion.substr(0, 10) < fechaHoy.substr(0, 10)
        return retorno
    }


    borrarReserva(e) {

        this.reservaEnAtencion.Id

        store.dispatch(anularReserva(this.reservaEnAtencion.Id, store.getState().cliente.datos.token))
        if (this.current == "diagnosticoDetalles") {
            store.dispatch(goTo("misConsultas"))
        } else {
            store.dispatch(goTo("mascotaver"))
        }


    }

    borrarAdjunto(e) {

        const id = e.currentTarget.item.Id

        let datosPatch = [{
            "op": "replace",
            "path": "/Activo",
            "value": false
        }]

        store.dispatch(patchAdjuntos(id, datosPatch, store.getState().cliente.datos.token))
    }

    adjuntar(e) {
        this.shadowRoot.querySelector("#files").click()
    }

    uploadFiles() {
        var input = this.shadowRoot.querySelector("#files");
        var files = input.files;
        var formData = new FormData();

        for (var i = 0; i != files.length; i++) {
            formData.append("files", files[i]);
        }

        formData.append("ReservaId", this.reservaEnAtencion.Id)
        store.dispatch(upload(this.reservaEnAtencion.Id, formData, store.getState().cliente.datos.token))
    }

    irA(e) {
        if (e.currentTarget.link) {
            //window.open(e.currentTarget.link)
            window.open(e.currentTarget.link)
        }
    }


    verVeterinario() {
        var ret = ""
        if (this.reservaEnAtencion.Atencion) {
            ret = this.reservaEnAtencion.Atencion.Veterinario.Apellido + ", " + this.reservaEnAtencion.Atencion.Veterinario.Nombre
        }
        return ret
    }

    comenzo() {
        var ret = ""
        if (this.reservaEnAtencion.Atencion) {
            let d = new Date(this.reservaEnAtencion.Atencion.InicioAtencion);
            ret = d.getUTCDate() + "-" + (d.getUTCMonth() + 1) + "-" + d.getUTCFullYear();
            ret = ret + "  -  " + d.getHours() + ":" + d.getMinutes();
        }
        return ret
    }
    termino() {
        var ret = ""
        if (this.reservaEnAtencion.Atencion) {
            let d = new Date(this.reservaEnAtencion.Atencion.FinAtencion);
            ret = d.getUTCDate() + "-" + (d.getUTCMonth() + 1) + "-" + d.getUTCFullYear();
            ret = ret + "  -  " + d.getHours() + ":" + d.getMinutes();
        }
        return ret
    }


    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            this.current = state.screen.name
            const haveBodyArea = state.screen.layouts[this.mediaSize].areas.find(a => a == this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-diagnosticoDetalles-diagnosticoDetallesM-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
                this.update();
            }

        }
        if (name == RESERVASENATENCION_TIMESTAMP) {
            if (state.reservas.entities.enAtencion) {
                this.reservaEnAtencion = state.reservas.entities.enAtencion.registro;


                this.update()
            }
        }

        if (name == ADJUNTOS_DELCLIENTE_TIMESTAMP) {
            this.adjuntosCliente = state.adjuntos.entityDelCliente ? state.adjuntos.entityDelCliente : []
            this.update()
        }

        if (name == ADJUNTOS_DELVETERINARIO_TIMESTAMP) {
            this.adjuntosVenterinario = state.adjuntos.entitityDelVeterinario ? state.adjuntos.entitityDelVeterinario : []
            this.update()
        }
    }

    verNombre() {
        let retorno = ""
        if (this.reservaEnAtencion.Mascota.Nombre) {
            retorno = this.reservaEnAtencion.Mascota.Nombre
        }
        return retorno
    }

    verFecha(fecha) {
        let d = new Date(fecha)
        return d.getUTCDate() + "-" + (d.getUTCMonth() + 1) + "-" + d.getUTCFullYear()
    }

    verUsuario() {
        return store.getState().cliente.datos.apellido + ", " + store.getState().cliente.datos.nombre
    }
    clickAtras() {
        store.dispatch(goTo("misconsultas"))
    }
    static get properties() {
        return {
            hidden: {
                type: Boolean,
                reflect: true
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
            current: {
                type: String
            }
        }
    }

}
window.customElements.define("pantalla-diagnosticosdetalles", pantallaDiagnosticosDetalles);