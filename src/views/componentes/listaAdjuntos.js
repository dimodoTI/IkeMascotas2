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
    ATRAS,
    ARCHIVO,
    TRASH
} from "../../../assets/icons/icons"

import {
    sinContestar
} from "../../redux/chat/actions";

import {
    goNext,
    goPrev,
    goTo
} from "../../redux/routing/actions"

import {
    getNotificacionChatPendientes
} from "../../redux/notificacion/actions"





export const ADJUNTOS_DELCLIENTE_TIMESTAMP = "adjuntos.delClienteTimeStamp"

export class componenteAdjuntos extends connect(store)(LitElement) {
    constructor() {
        super();
        this.hidden = false
        this.mensaje = false
        this.adjuntos = []
    }

    static get styles() {
        return css `
            :host{
                position: absolute;
                display: block;
                border:none;
                background-color:transparent;
                outline:none;
                font-family:inherit;
                font-size:inherit;
                font-weight:inherit;
                width:100%;
                height: 2rem;
            }
            

        `
    }
    render() {
        return html `
             <div style="padding-top:.5rem;display:grid;grid-gap:.5rem">
                    ${this.adjuntos.map(dato => html`
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
                </div>
        `
    }

    notificaciones(e) {
        //store.dispatch(sinContestar(store.getState().cliente.datos.id))



    }

    stateChanged(state, name) {



        if (name == ADJUNTOS_DELCLIENTE_TIMESTAMP) {
            this.adjuntos = state.adjuntos.entityDelCliente ? state.adjuntos.entityDelCliente : []
        }



    }

    static get properties() {
        return {
            hidden: {
                type: Boolean,
                reflect: true
            },
            mediaSize: {
                type: Boolean,
                reflect: true,
                attibute: "media-size"

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
window.customElements.define("componente-adjuntos", componenteAdjuntos);