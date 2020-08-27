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
    CAMPANA,
    CAMPANA_CONMARCA
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



const SET_CAMPANA = "chat.setCampana"
const GET_NOTIFICACION_CHAT_PENDIENTES_SUCCESS = "notificaciones.entityNotificacionChatPendienteTimeStamp"
export class campanaNotificaciones extends connect(store, SET_CAMPANA, GET_NOTIFICACION_CHAT_PENDIENTES_SUCCESS)(LitElement) {
    constructor() {
        super();
        this.hidden = false
        this.mensaje = false
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
            
            #campana{
                position:relative;
                display:grid;
                align-items:center
            }
        `
    }
    render() {
        return html `
            <div id="campana"  @click=${this. notificaciones}>${this.mensaje?CAMPANA_CONMARCA:CAMPANA}</div>
        `
    }

    notificaciones(e) {
        //store.dispatch(sinContestar(store.getState().cliente.datos.id))

        store.dispatch(getNotificacionChatPendientes(store.getState().cliente.datos.id))

    }

    stateChanged(state, name) {

        /*         if (name == SIN_CONTESTAR_TIMESTAMP) {
                    store.dispatch(goTo("notificacionReservas"))
                } */

        if (name == GET_NOTIFICACION_CHAT_PENDIENTES_SUCCESS) {
            store.dispatch(goTo("notificacionReservas"))
        }

        if (name == SET_CAMPANA) {
            this.mensaje = (store.getState().chat.setCampana)
            this.update()
        }

    }

    static get properties() {
        return {
            hidden: {
                type: Boolean,
                reflect: true
            }
        }
    }
}
window.customElements.define("campana-notificaciones", campanaNotificaciones);