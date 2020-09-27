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
} from "../../redux/routing/actions";

import {
    get as getReservas
} from "../../redux/reservas/actions"

import {
    upload,
    delCliente,
    borrarAdjunto as patchAdjuntos
} from "../../redux/adjuntos/actions"

import {
    button
} from "../css/button"
import {
    cardArchivo
} from "../css/cardArchivo"

import {
    ATRAS,
    ARCHIVO,
    TRASH
} from "../../../assets/icons/icons"


const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp"
const ADJUNTOS_DELCLIENTE_TIMESTAMP = "adjuntos.delClienteTimeStamp"


export class pantallaConsultaMsg extends connect(store, SCREEN, MEDIA_CHANGE, ADJUNTOS_DELCLIENTE_TIMESTAMP)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.idioma = "ES"
        this.area = "body"
        this.items = []
        this.adjuntosCliente = []
    }

    static get styles() {
        return css `
        ${label}
        ${button}
        ${cardArchivo}
 
        :host{
            position: absolute;
            display:grid;
            top: 0rem;
            left: 0rem;  
            height:100vh;
            width: 100vw;
            background-color:var(--color-gris-fondo);             
            grid-gap:.4rem;
            justify-items:center;
        }
        :host([hidden]){
            display: none;  
        }
        #x{
            position: fixed;
            top: .5rem;
            right: .5rem;
            width: 1.5rem;
            height: 1.5rem;
            background-color: transparent;
            background-image:var(--icon-cerrar);
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100%;
            cursor: pointer;
            z-index:10;
        }
        #titulo{
            position:relative;
            display:grid;
            padding-bottom:2rem;
            align-items: flex-end;
            justify-content:center;
            text-align:center;
            font-size: var(--font-header-h1-size);
            font-weight: var(--font-header-h1-weight);
        }
        #subtitulo{
            width: 100%;
            justify-items: center;
        }
        #leyenda{
            position:relative;
            display:flex;
            width:90%;
            align-items: flex-start;
            justify-content:center;
            text-align:center;
            font-size: var(--font-header-h2-size);
            font-weight: var(--font-header-h2-weight);
        }
        #detalle{
            position:relative;
            display:flex;
            width:90%;
            align-items: flex-start;
            justify-content:center;
            text-align:center;
            font-size: var(--font-label-size);
            font-weight: var(--font-label-weight);
            padding-top:1rem;
        }
        `
    }
    render() {
        return html `
            <div id="x" @click=${this.clickBoton1}></div>



            <div id="contenedor" style="width:100%;padding:5rem;display:grid;grid-template-rows: 5% 5% 80%;grid-gap: .5rem;">
                <div id="titulo">
                    ${idiomas[this.idioma].consultaMsg.titulo}
                </div>
                <div id="horario" style="display:grid;justify-items:center">
                    <label> ${idiomas[this.idioma].consultaMsg.subTitulo + this.formateoFecha(this.items.FechaAtencion) + " " + idiomas[this.idioma].consultaMsg.hora + this.formateoHora(this.items.HoraAtencion)}</label>
                </div>
                <div id="divDetalle">
                    <div id="listaAdjuntos" style="padding-top:.5rem;display:grid;grid-gap:.5rem">
                        ${this.adjuntosCliente.map(dato => html`
                            <div id="ciDivEtiqueta" style="width:90%">
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
                    </div>
                </div>
            </div> 


        `
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

        formData.append("ReservaId", this.items.Id)
        store.dispatch(upload(this.items.Id, formData, store.getState().cliente.datos.token))
    }

    irA(e) {
        if (e.currentTarget.link) {
            window.open(e.currentTarget.link)
        }
    }

    formateoFecha(fecha) {

        let d = new Date(fecha);
        return d.getDate() + 1 + "-" + (d.getMonth() + 1) + "-" + d.getFullYear()
        // return fecha.substring(8, 10) + "/" + fecha.substring(5, 7) + "/" + fecha.substring(0, 4) + "    " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds()
    }

    formateoHora(hora) {
        let horaRetorno = "0000" + hora
        horaRetorno = horaRetorno.substring(horaRetorno.length - 4)
        return horaRetorno.substr(0, 2) + ":" + horaRetorno.substr(2, 2)

    }

    clickBoton1() {
        if (this.current == "consultaMsg") {
            store.dispatch(getReservas({
                token: store.getState().cliente.datos.token,
                expand: "Mascota($expand=MascotasVacuna,Raza($expand=MascotasTipo)),Atencion,Chats($count=true;$select=Id)",
                filter: "Activo",
                orderby: "FechaAtencion desc"
            }))
            store.dispatch(goTo("misConsultas"))
        } else {
            store.dispatch(getReservas({
                token: store.getState().cliente.datos.token,
                filter: "MascotaId eq " + this.items.Mascota.Id + " and Activo",
                expand: "Mascota($expand=MascotasVacuna,Raza($expand=MascotasTipo)),Atencion,Chats($count=true;$select=Id)",
                orderby: "FechaAtencion desc"
            }))
            store.dispatch(goTo("mascotaver"))
        }
    }

    stateChanged(state, name) {


        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = state.screen.layouts[this.mediaSize].areas.find(a => a == this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-consultaMsg-consultaMsgMascota-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.adjuntosCliente = []
                this.hidden = false
                this.items = store.getState().reservas.ultimaReserva
                this.current = state.screen.name
                this.update();
            }
        }

        if (name == ADJUNTOS_DELCLIENTE_TIMESTAMP) {
            this.adjuntosCliente = state.adjuntos.entityDelCliente ? state.adjuntos.entityDelCliente : []
            this.update()
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
            area: {
                type: String
            },
        }
    }
}

window.customElements.define("pantalla-consultamsg", pantallaConsultaMsg);