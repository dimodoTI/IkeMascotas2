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
    btnCalendario
} from "../css/btnCalendario"
import {
    cardCalendario
} from "../css/cardCalendario"
import {
    btnFlotanteAlargado
} from "../css/btnFlotanteAlargado"

import {
    VACUNA,
} from "../../../assets/icons/icons"
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

const MASCOTASTIPO_TIMESTAMP = "mascotastipo.timeStamp"
const CALENDARIO_TIMESTAMP = "calendario.timeStamp"
const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp"

export class pantallaCalendario extends connect(store, SCREEN, MEDIA_CHANGE, MASCOTASTIPO_TIMESTAMP, CALENDARIO_TIMESTAMP)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.idioma = "ES"
        this.area = "body"
        this.animal = 1


        this.items = []
        this.tipo = []


    }

    static get styles() {
        return css `
        ${label}

        ${cardCalendario}
        ${btnCalendario}
        ${btnFlotanteAlargado}
 
        :host{
            position: absolute;
            top: 0rem;
            left: 0rem;  
            height:100%;
            width: 100%;
            background-color:var(--color-gris-fondo);
            display:grid;
            overflow:hidden;
            padding-left:.5rem;
            padding-right:.5rem;
        }
        :host([hidden]){
            display: none; 
        }

        :host(:not([media-size="small"])) #cuerpo{
            width:70%;
            justify-self:center;
        }
        #campana{
            position:relative;
            background-image: var(--icon-campana-con-marca);
            background-color: transparent;
            background-repeat: no-repeat;
            background-position: right center;
            background-size: 1rem 1rem;
        }
        #cuerpoVacuna{
            background-color: transparent;
            display: grid;
            width: 100%;
            grid-template-columns: 100%;
            justify-items: center;
            overflow-y: auto; 
            overflow-x: hidden; 
            grid-gap:1rem;
            align-content:flex-start
        }
        #cuerpoVacuna::-webkit-scrollbar {
            display: none;
        }
        label {
            position: relative;
            width: 95%;
            color: var(--color-negro);
            background-color:transparent;
            border-radius:0;
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);
        }      
        #animales{
            display:grid;
            padding: 0 1rem 0 1rem;
            grid-template-columns:50% 50%;
            height:1.5rem;
            align-items:top;
        }
        #pie{
            position:relative;
            grid-area: Pie; 
            display:grid;
            overflow-x: none; 
        }

        .botonMarcado{
            cursor: not-allowed;
            pointer-events: none;
            border-color: var(--color-celeste);
            color: var(--color-celeste);
            border-width: thick;
        }

        .labelRedondeado{
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);  
            background-color: var(--color-celeste-claro);          
            color: var(--color-azul-oscuro);
            padding:0 .5rem 0 .5rem;
            justify-self: center;
            border-radius:1rem ;    
        }
 
        `
    }
    render() {
        return html `

        <div id="cuerpo">
            <div id="animales" style="padding-top:.4rem;padding-bottom: .5rem;">
                ${this.tipo.map(tipo => html `<div  class="btnCalendario ${tipo.Id==this.animal?"botonMarcado":""}" .item=${tipo} @click="${this.seleccionTipo}">
                    ${tipo.Descripcion}</div>`)}
            </div>

            <div id="cuerpoVacuna" style="width:95%;justify-self:center;">
            ${this.items
                .filter(item =>{
                    return item.MascotasTipoId==this.animal
                })
                .map(dato => this.renderItemVacuna(dato))}
            </div>        
        </div>        

        <div id="bfaDivMas" media-size="${this.mediaSize}"  @click=${this.clickBotonVacuna}>
            ${VACUNA}
            <label>${idiomas[this.idioma].calendario.btn}</label>
        </div>
        `
    }



    desmarcarBotones() {
        const botones = this.shadowRoot.querySelectorAll(".btnCalendario")
        botones.forEach((button) => {
            button.classList.remove("botonMarcado")
        });
    }

    seleccionTipo(e) {
        this.desmarcarBotones()
        e.currentTarget.classList.add("botonMarcado")
        this.animal = e.currentTarget.item.Id
        this.update()
    }

    renderItemVacuna(dato) {
        return html `                
        <div id="ccDivEtiqueta">
            <div id="ccDivVacuna">${dato.Vacuna.Descripcion}</div>
            <div id="ccDivPara">${dato.Enfermedades}</div>
            <div class="labelRedondeado" id="ccDivCachorro">${dato.Edad}</div>
            <div class="labelRedondeado" id="ccDivObligatorio">${dato.Optativa?idiomas[this.idioma].calendario.optativa:idiomas[this.idioma].calendario.obligatoria}</div>
            <div class="labelRedondeado" id="ccDivPeriodicidad">${dato.Periodicidad}</div>
        </div>`
        this.update()
    }


    clickBotonNotificacion() {
        store.dispatch(goTo("notificacion"))
    }
    clickBotonVacuna() {

        store.dispatch(goTo("vacuna"))
    }

    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = state.screen.layouts[this.mediaSize].areas.find(a => a == this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-calendario-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
            }
            this.update();
        }

        if (name == MASCOTASTIPO_TIMESTAMP) {
            let tipo = [
                ...state.mascotastipo.entities
            ]
            this.tipo = tipo.filter(u => (u.Descripcion.toLowerCase().includes("perro") || u.Descripcion.toLowerCase().includes("gato")))
            this.animal = this.tipo[0].Id
            this.update()
        }
        if (name == CALENDARIO_TIMESTAMP) {
            this.items = state.calendario.entities
            this.update()
        }

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
            animal: {
                type: String,
                reflect: true
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

window.customElements.define("pantalla-calendario", pantallaCalendario);