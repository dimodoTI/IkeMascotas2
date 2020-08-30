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
    button
} from "../css/button"


import {
    cardMascotaVertical
} from "../css/cardMascotaVertical"
import {
    btnFlotanteAlargado
} from "../css/btnFlotanteAlargado"

import {

    MASCOTA,

} from "../../../assets/icons/icons"

import {
    edit as editMascotas,
    get as getMascotas,
    getEdit as getEditMascota,
    getEdit
} from "../../redux/mascotas/actions"

import {
    get as getMascotasVacuna
} from "../../redux/mascotasvacunas/actions"

import {
    get as getReservas
} from "../../redux/reservas/actions"

const MASCOTAS_TIMESTAMP = "mascotas.timeStamp"
const MASCOTAS_ADDTIMESTAMP = "mascotas.addTimeStamp"
const MASCOTAS_UPDATETIMESTAMP = "mascotas.updateTimeStamp"
const MASCOTAS_REMOVETIMESTAMP = "mascotas.removeTimeStamp"



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
    limpiarFoto
} from "../../redux/fotos/actions";




const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp"
export class pantallaMascota extends connect(store, SCREEN, MEDIA_CHANGE, MASCOTAS_ADDTIMESTAMP, MASCOTAS_REMOVETIMESTAMP, MASCOTAS_TIMESTAMP, MASCOTAS_UPDATETIMESTAMP)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.area = "body"
        this.idioma = "ES"

        this.items = []
    }

    static get styles() {
        return css `
        ${label}
        ${button}
        ${cardMascotaVertical}
        ${btnFlotanteAlargado}

        :host{
            position: absolute;
            top: 0rem;
            left: 0rem;  
            height:100%;
            width: 100%;
            background-color:var(--color-gris-fondo);
            display:grid;
        }
        :host([hidden]){
            display: none; 
        } 
        #campana{
            position:relative;
            background-image: var(--icon-campana-con-marca);
            background-color: transparent;
            background-repeat: no-repeat;
            background-position: right center;
            background-size: 1rem 1rem;
        }
        #cuerpo{
            background-color: transparent;
            display: grid;
            width: 100%;
            grid-template-columns: repeat(auto-fit,minmax(8.5rem,1fr));
            justify-items: center;
            overflow-y: auto; 
            overflow-x: hidden; 
            grid-gap:1rem;
            padding-top: .5rem;
        }
        #cuerpo::-webkit-scrollbar {
            display: none;
        }
        :host(:not([media-size="small"])) #cuerpo{
            grid-template-columns: repeat(auto-fit,minmax(10rem,1fr));
        }
        label,button {
            position: relative;
            width: 95%;
            color: var(--color-negro);
            background-color:transparent;
            border-radius:0;
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);
        }      
        #pie{
            position:relative;
        }
    `
    }
    render() {
        return html `


            <div id="cuerpo">
                ${this.items.map(dato => html`
                    <div id="cmhDivEtiqueta" .item=${dato} @click="${this.editar}"> 
                        <div id="cmhDivImagen" style="background-image:url(${dato.Foto});grid-row-start:1;grid-row-end:4;position:center"></div>
                        <div id="cmhDivTipo">${dato.Raza.MascotasTipo.Descripcion}</div>
                        <div id="cmhDivNombre">${dato.Nombre}</div>
                        <div id="cmhDivRaza">${idiomas[this.idioma].mascota.raza + dato.Raza.Descripcion}</div>
                        <div id="cmhDivEdad">${idiomas[this.idioma].mascota.edad + this.calculaEdad(dato.FechaNacimiento)}</div>
                        <div id="cmhDivConsultas">${dato.Reservas?dato.Reservas.length:"0" + idiomas[this.idioma].mascota.consultas} Consultas</div>              
                    </div>
                `)}
            </div>        
        </div>

        <div id="bfaDivMas"  @click=${this.clickAgregarMascota}>
            ${MASCOTA}
            <label>${idiomas[this.idioma].mascota.btn}</label>
        </div>
        `
    }
    clickBotonNotificacion() {

    }
    clickAgregarMascota() {
        store.dispatch(editMascotas("A"))
        store.dispatch(limpiarFoto())
        store.dispatch(goTo("mascotaalta"))
    }

    editar(e) {

        store.dispatch(editMascotas("M", e.currentTarget.item))

        store.dispatch(getMascotasVacuna({
            filter: "MascotaId eq " + e.currentTarget.item.Id,
            expand: "Vacuna($expand=Calendarios)",
            token: store.getState().cliente.datos.token
        }))



        store.dispatch(getReservas({
            filter: "MascotaId eq " + e.currentTarget.item.Id.toString(),
            expand: "Atencion($expand=Veterinario),Mascota,Chats($top=1;$select=Id)",
            token: store.getState().cliente.datos.token,
            orderby: "FechaAtencion desc"
        }))

        store.dispatch(goTo("mascotaver"))

    }

    stateChanged(state, name) {

        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = state.screen.layouts[this.mediaSize].areas.find(a => a == this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-mascota-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
            }
            this.update();
        }

        if (name == MASCOTAS_ADDTIMESTAMP || name == MASCOTAS_REMOVETIMESTAMP || name == MASCOTAS_UPDATETIMESTAMP) {
            store.dispatch(getMascotas({
                token: state.cliente.datos.token,
                expand: "Raza($expand=MascotasTipo)"
            }))
        }



        if (name == MASCOTAS_TIMESTAMP) {

            this.items = state.mascotas.entities
            this.update()
        }
    }



    calculaEdad(nacimiento) {


        const hoy = new Date()
        const fecNac = new Date(nacimiento)
        const dif = ((((hoy.getTime() - fecNac.getTime()) / 1000) / 60) / 60) / 24
        return Math.floor((dif / 365.2425))

    }

    firstUpdated() {}

    static get properties() {
        return {
            hidden: {
                type: Boolean,
                reflect: true
            },
            label: {
                type: String,
                reflect: false
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

window.customElements.define("pantalla-mascota", pantallaMascota);