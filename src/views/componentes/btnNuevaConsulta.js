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
    repeat
} from 'lit-html/directives/repeat.js';
import {
    button
} from "../css/button"
import {
    label
} from "../css/label"
import {
    idiomas
} from "../../redux/datos/idiomas"


const RESERVA_TIMESTAMP = "reserva.timeStamp"
export class btnNuevaConsulta extends connect(store, RESERVA_TIMESTAMP)(LitElement) {
    constructor() {
        super();
        this.item = {}
        this.mediaSize = ""
        this.idioma = "ES"
        this.hayReserva = "S"
    }

    static get styles() {
        return css `
        ${button}
        ${label}
        :host{
            width:100%;   
            height:100%;  
        }
        #div-consultaNueva{
            position: relative;
            background-color:var(--color-azul-oscuro);
            border-radius:.5rem;          
            display: grid;
            align-items:center;
            justify-items:center;
            grid-template-columns:100%;
            grid-template-rows: 100%;
            grid-gap:0rem;  
            grid-template-columns: 9fr 1fr
        }
        :host(:not([media-size="small"])) #div-consultaNueva{
            background-color:var(--color-amarillo);
        }
        #lbl-consultaNueva{
            color: var(--color-blanco);
            justify-self: flex-start;
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);
        }
        #btn-consultaNueva{
            justify-self: right;
        }
        #btn-consultaNueva:hover {    
            color: var(--color-blanco);
        }
        :host(:not([media-size="small"])) #btn-consultaNueva{
            color:var(--color-blanco);
        }
        `
    }
    render() {
        return html `
            <div id="div-consultaNueva" style="display:${this.hayReserva == 'S' ? 'grid' : 'none'};" >
                <label id="lbl-consultaNueva">${idiomas[this.idioma].principal.lblConsulta}</label>
                <button id="btn-consultaNueva" btn2 @click=${this.clickConsulta}>${idiomas[this.idioma].principal.btnConsulta}</button>
            </div>  
        `
    }
    clickConsulta() {
        store.dispatch(modoPantalla("video", store.getState().ui.pantallaQueLLamo))

    }
    stateChanged(state, name) {
        if (name == RESERVA_TIMESTAMP) {
            let reserva = state.reserva.entities;
            if (reserva) {
                if (reserva[0].tiene == "S") {
                    this.hayReserva = "S"
                }
            }
            this.update();
        }
    }
    static get properties() {
        return {
            mediaSize: {
                type: String,
                reflect: true,
                attribute: 'media-size'
            }
        }
    }
}

window.customElements.define("btn-nueva-consulta", btnNuevaConsulta);