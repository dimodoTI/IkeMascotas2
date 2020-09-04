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
    cardMascotaHorizontal
} from "../css/cardMascotaHorizontal"
import {
    CHAT,
    VIDEO,
    ARCHIVO
} from "../../../assets/icons/icons"


import {
    goTo
} from "../../redux/routing/actions"
import {
    isInLayout
} from "../../redux/screens/screenLayouts";

import {
    enAtencion as getEnAtencion,
    reservaParaChat
} from "../../redux/reservas/actions"

import {
    chatReserva,
    CHAT_RESERVAM_SUCCESS,
    CHAT_RESERVAR_SUCCESS
} from "../../redux/chat/actions"



const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
const RESERVAS_TIMESTAMP = "reservas.timeStamp"


export class pantallaListaReserva extends connect(store, MEDIA_CHANGE, SCREEN, RESERVAS_TIMESTAMP)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.area = "body"
        this.idioma = "ES"
        this.item = []
        this.current = ""

    }

    static get styles() {
        return css `
        ${button}
        ${cardMascotaHorizontal}
        :host{
            position: relative;
            display: grid;
            padding: 0  !important;
            background-color: var(--color-gris-fondo) !important;
            height:100%;
            overflow-x: hidden;
            overflow-y: hidden;    
        }
        :host([hidden]){
            display: none; 
        }
        :host::-webkit-scrollbar {
            display: none;
        }
        button {
            position: relative;
            width: 95%;
            color: var(--color-negro);
            background-color:transparent;
            border-radius:0;
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);
        } 
        #tituloLista{
            padding-left:0.84rem;
            color:var(--color-azul-oscuro);
            font-size:var(--font-header-h2-size);
            font-weight:var(--font-header-h2-weight);
            background-color:var(--color-celeste-muy-claro);
            text-justify:left;
            display:flex;
            padding-bottom:.84rem;     
            align-items: flex-end;    
      
        }
        #grilla{
            display:grid;
            align-content: flex-start;
            grid-gap:.5rem;
            overflow-x:none;
            overflow-y:auto;
        }
        #grilla::-webkit-scrollbar {
            display: none;
        }

        .chat{
            height: 1rem;
    width: 100%;
    justify-items: center;
        }

        .chat svg {
            
            fill:var(--color-azul-oscuro);
            align-self:start
            }


            .acciones{
                display:grid;
                grid-template-columns:4fr 1fr 1fr
            }

  

    `
    }
    render() {
        return html `
            <div id="grilla">
                ${this.item.map(dato =>  html`
                   <div id="cmhDivEtiqueta" .item="${dato}" @click="${this.mostrarIcono}">
                        
                        <div id="cmhDivImagen" style="background-image:url(${dato.Mascota.Foto});grid-row-start:1;grid-row-end:4;"></div>
                        <div id="cmhDivNombre">${dato.Mascota.Nombre}</div>
                            <div id="cmhDivFecha">
                                ${dato.FechaAtencion.substring(8,10)+"/"+dato.FechaAtencion.substring(5,7)+"/"+dato.FechaAtencion.substring(0,4)+" "+ this.formateoHora( dato.HoraAtencion)}
                            </div>
                            <div id="cmhDivDiagnostico">
                                ${dato.Motivo}
                            </div>
                            <div id="cmhDivVerDetalle">
                                <button btn2  @click=${this.verDetalle} .item=${dato} style="width:4rem;padding:0;text-align:left;font-size: var(--font-label-size);font-weight: var(--font-label-weight);">${idiomas[this.idioma].listaReserva.verDetalle}</button>                    
                            </div>
                            <div id="cmhDivChat" @click=${this.atencion} .item=${dato} ?hiddenchat="${this.escondoVideo(dato.FechaAtencion,dato.Atencion)}">${VIDEO}</div>                    
                            <div id="cmhDivChat" @click=${this.chat} .item=${dato} ?hiddenchat="${!dato.Atencion}">${CHAT}</div>                    
                        </div>
                    </div>
                    `)}
            </div>
        `
    }

    escondoVideo(fecha, atencion) {

        if (atencion) return true


        let fechaHoy = new Date()
        fechaHoy = (new Date(fechaHoy.getTime() - (fechaHoy.getTimezoneOffset() * 60000))).toJSON()
        const retorno = fecha.substr(0, 10) != fechaHoy.substr(0, 10)
        return retorno
    }

    muestroChat(e) {
        let reto = false
        if (e.currentTarget.Atencion) {
            return reto
        }
        return reto
    }

    mostrarIcono(e) {
        const d = new Date()
        const fechaAtencion = e.currentTarget.item.FechaAtencion.substring(0, 10)
        const horaAtencion = this.formateoHora(e.currentTarget.item.HoraAtencion) + ":00"
        const fechaHoraAtencion = new Date(fechaAtencion + "T" + horaAtencion)
        let dif = d - fechaHoraAtencion

    }

    chat(e) {

        const registro = {
            Id: e.currentTarget.item.Id,
            Fecha: e.currentTarget.item.FechaAtencion,
            Mascota: e.currentTarget.item.Mascota.Nombre,
            Motivo: e.currentTarget.item.Motivo,
            /*             Diagnostico: e.currentTarget.item.Reserva.Atencion.Diagnostico,
                        InicioAtencion: e.currentTarget.item.Reserva.Atencion.InicioAtencion */
        }
        store.dispatch(reservaParaChat(registro))
        if (this.current == "mascotaver") {

            store.dispatch(chatReserva(e.currentTarget.item.Id, CHAT_RESERVAM_SUCCESS))
        }
        if (this.current == "misConsultas") {
            store.dispatch(chatReserva(e.currentTarget.item.Id, CHAT_RESERVAR_SUCCESS))
        }
    }


    verDetalle(e) {

        store.dispatch(getEnAtencion({
            registro: e.currentTarget.item
        }))
        if (this.current == "mascotaver") {
            store.dispatch(goTo("diagnosticoDetallesM"))
        }
        if (this.current == "misConsultas") {
            store.dispatch(goTo("diagnosticoDetalles"))
        }

    }

    atencion(e) {
        store.dispatch(getEnAtencion({
            registro: e.currentTarget.item
        }))
        if (e.currentTarget.item.Atencion) {

            if (this.current == "mascotaver") {
                store.dispatch(goTo("diagnosticoDetallesM"))
            }
            if (this.current == "misConsultas") {
                store.dispatch(goTo("diagnosticoDetalles"))
            }

        } else {
            if (this.current == "mascotaver") {
                store.dispatch(goTo("videoMasocotaVer"))
            } else {
                store.dispatch(goTo("videoConsulta"))
            }

        }

    }
    verReserva(fecha) {




        let hoy = new Date();
        let atencion = new Date(fecha);
        return hoy.getTime() === atencion.getTime();

    }
    clickAtencion(e) {
        let arr = e.currentTarget.item;

    }

    clickConsulta(e) {

        if (this.current == "mascotaver") {
            store.dispatch(goTo("consultaMascota"))
        } else {
            store.dispatch(goTo("consulta"))
        }

    }

    formateoHora(hora) {
        let horaRetorno = "0000" + hora.toString()
        horaRetorno = horaRetorno.substring(horaRetorno.length - 4)
        return horaRetorno.substr(0, 2) + ":" + horaRetorno.substr(2, 2)

    }

    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size

            this.hidden = true
            const haveBodyArea = isInLayout(state, this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-listaReserva-mascotaver-misConsultas-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
                this.current = state.screen.name
            }
            this.update();
        }
        if (name == RESERVAS_TIMESTAMP) {
            this.item = state.reservas.entities;
            this.update();

        }
    }
    firstUpdated() {}

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
            },
            current: {
                type: String
            },
            hide: {
                type: Boolean,
                reflect: true
            }
        }
    }
}

window.customElements.define("pantalla-listareserva", pantallaListaReserva);