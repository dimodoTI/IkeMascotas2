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
    enAtencion as getEnAtencion
} from "../../redux/reservas/actions"

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
        #cmhDivEtiqueta{
            width: 90%;
            justify-self:center;
        }
    `
    }
    render() {
        return html `
            <div id="grilla">
                ${this.item.map(dato => html`
                   <div id="cmhDivEtiqueta" >
                        <div id="cmhDivImagen" style="background-position:center;background:url(${dato.Mascota.Foto});background-repeat: no-repeat;background-position: center center;"></div>
                            <div id="cmhDivNombre">
                                ${dato.Mascota.Nombre}
                            </div>
                            <div id="cmhDivFecha">
                                ${dato.FechaAtencion.substring(8,10)+"/"+dato.FechaAtencion.substring(5,7)+"/"+dato.FechaAtencion.substring(0,4)+" "+ this.formateoHora( dato.HoraAtencion)}
                            </div>
                            <div id="cmhDivDiagnostico">
                                ${dato.Motivo}
                            </div>

                            <div></div>
                            <div id="cmhDivVerDetalle">
                                <button btn2 .item=${dato} @click=${this.verDetalle} style="width:4rem;padding:0;text-align:left;font-size: var(--font-label-size);font-weight: var(--font-label-weight);">${idiomas[this.idioma].listaReserva.verDetalle}</button>                    
                            </div>
                            
                            <div id="cmhDivChat" .item="${dato}" @click="${this.atencion}">${!dato.Atencion?VIDEO:ARCHIVO}</div>              
                        </div>
                    </div>
                    `)}
            </div>
            <button style="margin-top:1rem" id="btn-edit" btn3 @click=${ this.clickConsulta}>
                ${ idiomas[this.idioma].listaReserva.agendarReserva}
            </button >

        `
    }

    verDetalle(e) {
        /*         store.dispatch(getEnAtencion({
                    filter: "Id eq " + e.currentTarget.item.Id,
                    expand: "Atencion,Mascota",
                    token: store.getState().cliente.datos.token
                })) */
        store.dispatch(getEnAtencion({
            registro: e.currentTarget.item
        }))
        if (this.current == "mascotaver") {
            store.dispatch(goTo("diagnosticoDetallesM"))
        }
        if (this.current == "misConsultas") {
            store.dispatch(goTo("diagnosticoDetalles"))
        }
        // store.dispatch(goTo("diagnosticoDetalles"))
    }

    atencion(e) {
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
            }
        }
    }
}

window.customElements.define("pantalla-listareserva", pantallaListaReserva);