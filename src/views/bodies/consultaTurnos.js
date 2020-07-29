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
    cardTurnosPaciente
} from "../css/cardTurnosPaciente"


import {
    get as getReservas,
    reservarFecha,
    add as addReservas

} from "../../redux/reservas/actions"
import {
    goPrev
} from "../../redux/routing/actions";


const TURNOSDISPONIBLES_TIMESTAMP = "turnosdisponibles.timeStamp"


const RESERVASADD_TIMESTAMP = "reservas.addTimeStamp"
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

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp"
export class pantallaConsultaTurnos extends connect(store, SCREEN, MEDIA_CHANGE, TURNOSDISPONIBLES_TIMESTAMP, RESERVASADD_TIMESTAMP)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.area = "body"
        this.idioma = "ES"
        this.libres = []
        this.item = []

        this.reserva = []


    }
    static get styles() {
        return css `
        ${button}
        ${cardTurnosPaciente}

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

        #cuerpo{

            display:grid;
            background-color: transparent;
            padding:1rem;
            grid-template-columns: repeat(auto-fit,minmax(3.5rem,1fr));
            grid-gap:.8rem;
        
            align-content: flex-start;
   
    
            overflow-y: auto; 
            overflow-x: hidden; 
        }
        #cuerpo::-webkit-scrollbar {
            display: none;
        }
        #lblProximo{
            font-size: var(--font-header-h1-menos-size);
            font-weight: bold;   
            padding:0 0 0 1rem;
            border-bottom: solid 1px var(--color-gris-claro);
            align-self: center;
        }
        #btnSeleccionar{
            width:90%;
            height:2rem;
            justify-self:center;
            align-self:center;
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

        .etiqueta{
            position:relative;
            display: grid; 
            height:3.5rem;
            width:100%;
            grid-template-columns: 50% 50%;
            grid-gap:0rem;
            align-items: center;
            border-radius:.4rem ; 
            box-shadow: var(--shadow-elevation-2-box);
            background-color:transparent;
        }
        .seleccionado{
            box-shadow: var(--shadow-elevation-4-box);
            background-color:var(--color-gris-claro);
        }
        `
    }
    render() {
        return html `
            
            <div><label style="padding:.8rem" id="lblProximo">${idiomas[this.idioma].consultaTurnos.proximo}</label></div>
            <div id="cuerpo">
                
                ${this.libres.map((item) => { 
                    
                    const dia = this.nroDia(item.fecha)
                    const mes = this.mes(item.fecha)
                    const fecha = item.fecha
                   
                    return item.horarios.map(horario=>{
                    return  html`
                        <div   class="etiqueta" .item="${item}" .horario="${horario}"  @click=${this.clickSeleccionar}>
                            <div id="atDivDia">
                                <label id="atLblDiaNumero">${dia}</label>
                                <label id="atLblMes">${mes}</label>
                            </div>
                            <div id="atDivHora">
                                <label id="atLblDiaTexto">${this.dow(fecha)}</label>
                                <label id="atLblHora" value="${horario.hora}">${this.formateoHora(horario.hora)}</label>
                            </div>
                        </div>`
                    })
                })}    
            </div>
            <div style="display:grid;"> 
            <button style="margin:1rem" id="btnSeleccionar" btn1 apagado @click=${this.clickBoton2}>
                ${idiomas[this.idioma].consultaTurnos.btn1}
            </button></div>

    `
    }

    clickSeleccionar(e) {
        const botones = this.shadowRoot.querySelectorAll(".etiqueta")
        botones.forEach((button) => {
            button.classList.remove("seleccionado")
        });
        e.currentTarget.classList.add("seleccionado")
        this.shadowRoot.querySelector("#btnSeleccionar").removeAttribute("apagado", "")
        const fecha = e.currentTarget.item.fecha
        const hora = e.currentTarget.horario.hora
        const tramo = e.currentTarget.horario.tramos[0]
        store.dispatch(reservarFecha(fecha, hora, tramo))

    }
    clickBoton1() {
        store.dispatch(goPrev())
    }


    clickBoton2() {
        //store.dispatch(modoPantalla("consultadetalle", "consultaturnos"))

        let reserva = store.getState().reservas.reserva

        reserva.UsuarioId = store.getState().cliente.datos.id
        reserva.FechaGeneracion = new Date()
        store.dispatch(addReservas(reserva, store.getState().cliente.datos.token))
    }

    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = state.screen.layouts[this.mediaSize].areas.find(a => a == this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-consultaTurnos-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
            }
            this.update();
        }

        if (name == TURNOSDISPONIBLES_TIMESTAMP) {
            this.libres = state.turnosdisponibles.entities._retorno
            this.update()
        }
        if (name == RESERVASADD_TIMESTAMP) {
            store.dispatch(getReservas({
                token: state.cliente.datos.token,
                expand: "Mascota($expand=MascotasVacuna,Raza($expand=MascotasTipo)),Atencion",
                orderby: "FechaAtencion desc"
            }))
            store.dispatch(goTo("misconsultas"))
        }
    }


    formateoHora(hora) {
        let horaRetorno = "0000" + hora.toString()
        horaRetorno = horaRetorno.substring(horaRetorno.length - 4)
        return horaRetorno.substr(0, 2) + ":" + horaRetorno.substr(2, 2)

    }
    nroDia(fecha) {
        let d = new Date(fecha)
        return d.getDate() + 1
    }
    dow(fecha) {
        let d = new Date(fecha);
        let dia = d.getDay() + 1
        return idiomas[this.idioma].diasCortos[dia]
    }
    mes(fecha) {
        let d = new Date(fecha);
        let m = d.getMonth()
        return idiomas[this.idioma].mesCortos[m]
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
            seleccionado: {
                type: Boolean,
                reflect: true,

            },
            layout: {
                type: String,
                reflect: true,
            },
            area: {
                type: String
            }

        }
    }
}

window.customElements.define("pantalla-consultaturnos", pantallaConsultaTurnos);