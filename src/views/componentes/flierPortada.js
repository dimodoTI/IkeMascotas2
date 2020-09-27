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
    idiomas
} from "../../redux/datos/idiomas"

import {
    goNext,
    goTo
} from "../../redux/routing/actions"

import {
    get as getReservas
} from "../../redux/reservas/actions"
import {
    get as getMascotas
} from "../../redux/mascotas/actions"

import {
    selectMenu
} from "../../redux/ui/actions"

//const PUBLICIDAD_TIMESTAMP = "publicidad.timeStamp"

const PUBLICIDAD_TIMESTAMP = "publicacion.timeStamp"

export class flierPortadaComponente extends connect(store, PUBLICIDAD_TIMESTAMP)(LitElement) {
    constructor() {
        super();
        this.item = []
        this.mediaSize = ""
        this.tipo = "C"
        this.idioma = "ES"
    }

    static get styles() {
        return css `
        ${button}
        :host{
            position: relative;
            display: grid; 
        }
        #div-agenda{
            width: 100%;
            height: 98%;
            border-radius:.5rem;          
            display: grid;
            align-items:top; 
            justify-content:flex-start;
            grid-template-columns:75%;
            grid-template-rows: 70% 30%;
            grid-gap:0rem;
            background-image:var(--imagen-fondo-agenda);
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
        }
        #lbl-agenda{
            width: 14rem;
            color: var(--color-negro);
            align-items:top; 
            justify-content: flex-start;
            font-size: var(--font-header-h1-size);
            font-weight: var(--font-header-h1-weight);
            font-size: calc(var(--font-header-h1-size) * 1.2);
            padding-top:1rem;
            padding-left:.6rem;
        }
        #btn-agenda{    
            justify-self: flex-start;
        }
        `
    }
    render() {
        if (this.item) {
            return html `
            ${
                repeat(this.item, (dato) => dato.Titulo, (dato, index) => html`
                <div id="div-agenda" >
                    <label id="lbl-agenda">${idiomas[this.idioma].publicidad.flier[dato.Titulo].lbl}</label>
                    <button id="btn-agenda" btn2 @click=${this.clickAgenda}>${idiomas[this.idioma].publicidad.flier[dato.Titulo].lblBtn}</button> 
                </div>                
            `)}
        `
        }
    }

    clickAgenda(e) {
        if (store.getState().mascotas.cantidad == 0) {
            store.dispatch(getMascotas({
                token: store.getState().cliente.datos.token,
                filter: "Activo",
                expand: "Raza($expand=MascotasTipo),Reservas"
            }))
            store.dispatch(goTo("mascota"))
            store.dispatch(selectMenu('dos'))
        } else {
            store.dispatch(getReservas({
                expand: "Atencion($expand=Veterinario),Mascota,Chats($top=1;$select=Id)",
                token: store.getState().cliente.datos.token,
                filter: "Activo",
                orderby: "FechaAtencion desc,HoraAtencion desc"
            }))
            store.dispatch(goTo("misConsultas"))
            store.dispatch(selectMenu('tres'))
        }
    }
    stateChanged(state, name) {

        if (name == PUBLICIDAD_TIMESTAMP) {
            this.item = state.publicacion.entities.filter(item => {
                return item.Tipo == this.tipo

            });
            this.update();
        }
    }
    static get properties() {
        return {
            tipo: {
                type: String,
                reflect: false
            },
            mediaSize: {
                type: String,
                reflect: true,
                attribute: 'media-size'
            }
        }
    }
}

window.customElements.define("flierportada-componente", flierPortadaComponente);