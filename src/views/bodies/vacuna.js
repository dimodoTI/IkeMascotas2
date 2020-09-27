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
    ikeInput
} from "../css/ikeInput"

import {
    select
} from "../css/select"


import {
    validaMail
} from "../../libs/funciones";

import {
    add as addMascotasvacunas
} from "../../redux/mascotasvacunas/actions"

const MASCOTAS_TIMESTAMP = "mascotas.timeStamp"

const VACUNAS_TIMESTAMP = "vacunas.timeStamp"
const MASCOTASEDIT_TIMESTAMP = "mascotas.editTimeStamp"
const MASCOTASGETEDIT_TIMESTAMP = "mascotas.getEditTimeStamp"

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
    showWarning
} from "../../redux/ui/actions"

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp"

export class pantallaVacuna extends connect(store, SCREEN, MEDIA_CHANGE, MASCOTAS_TIMESTAMP, VACUNAS_TIMESTAMP, MASCOTASEDIT_TIMESTAMP, MASCOTASGETEDIT_TIMESTAMP)(LitElement) {
    constructor() {
        super();
        this.area = "body"
        this.hidden = true
        this.idioma = "ES"
        this.vacunas = []
        this.mascotasTipo = []
        this.mascotas = []
        this.mascota = 0
        this.current = "vacuna"
        this.mascota = 0

        this.item = {
            Id: 0,
            MascotaId: 0,
            VacunaId: 0,
            Fecha: "",
            Realizada: true,
            Activo: true
        }

        this.label = ""
    }

    static get styles() {
        return css `
        ${ikeInput}
        ${button}
        ${select}

        :host{
            position: relative;
            display: grid;
            grid-auto-flow: row;
             overflow-x: hidden;
            overflow-y: hidden;
            background-color: #FAFAFA !important;
            gap: 0.8rem;    
            padding: 1rem;
      
        }
        :host([hidden]){
            display: none; 
        } 
     
        #cuerpo::-webkit-scrollbar {
            display: none;
        }
        :host(:not([media-size="small"])) {
            max-width: fit-content;
            min-width: 18rem;
            justify-self: center;
            max-height:99%;
            min-height:80%;
            align-self: center;
            border-radius: 1rem;
            box-shadow: var(--shadow-elevation-3-box);

            grid-gap:0;
        }
 
        :host([media-size="small"]) #pie{
            display:none;
        }
        `
    }
    render() {
        return html `


                <div id="selectMascota" class="select"> 
                    <label >${idiomas[this.idioma].vacuna.mascota}</label>
                    <select  id="mascota" @change="${this.cambioMascota}" style="width:100%;height:1.7rem;">   
                        <option  selected="true"value=0>${idiomas[this.idioma].vacuna.elegimascota}</option>
                        ${this.mascotas.map(mascota => html `<option .selected="${this.mascota==mascota.Id}" value=${mascota.Id}>${mascota.Nombre}</option>`)}
                    </select>
                    
                    <label id="mascotaError" error oculto>${idiomas[this.idioma].vacuna.mascotaerror}</label>
                </div>  

                <div id="selectVacuna" class="select"> 
                    <label >${idiomas[this.idioma].vacuna.vacuna}</label>
                    <select style="width:100%;height:1.7rem;" id="vacuna">  
                    <option  value=0>${idiomas[this.idioma].vacuna.elegivacuna}</option>
                        ${this.vacunas.map((p)=>{
                            return html `
                            <option value=${p.Id}>${p.Descripcion}</option>
                             `}
                                )}
                    </select>
                    
                    <label id="vacunaError" error oculto>${idiomas[this.idioma].vacuna.vacunaerror}</label>
                </div>  

                 
                <div class="ikeInput" >
                    <label id="lblFecha">${idiomas[this.idioma].vacuna.fecha}</label>
                    <input id="txtFecha"  type="date" placeholder=${idiomas[this.idioma].vacuna.fecha_ph}  >
                    <label id="lblErrorFecha" error oculto>${idiomas[this.idioma].vacuna.fechaerror}</label>
                </div>
    
                <button style="width:95%;height:2rem;justify-self: center;align-self: end;" id="btn-recuperar" btn1 @click=${this.clickBoton2}>
                    ${idiomas[this.idioma].vacuna.btn1}
                </button>
            </div>


    `
    }


    cambioMascota(e) {


        const tipomascota = this.mascotas.filter(u => u.Id == parseInt(e.currentTarget.value, 10))[0].Raza.MascotasTipo.Id
        this.vacunas = store.getState().vacunas.entities.filter(r => r.MascotaTipoId == tipomascota)
        this.update()
    }

    activar() {

    }


    valido() {
        [].forEach.call(this.shadowRoot.querySelectorAll("[error]"), element => {
            element.setAttribute("oculto", "")
        })
        let valido = true
        const mascota = this.shadowRoot.querySelector("#mascota")
        const vacuna = this.shadowRoot.querySelector("#vacuna")
        const fecha = this.shadowRoot.querySelector("#txtFecha")


        if (mascota.value == "0") {
            store.dispatch(showWarning(this.current, 0))
            return false
            //valido = false
            //this.shadowRoot.querySelector("#mascotaError").removeAttribute("oculto");
        }

        if (vacuna.value == "0") {
            valido = false
            store.dispatch(showWarning(this.current, 1))
            return false
            //this.shadowRoot.querySelector("#vacunaError").removeAttribute("oculto");
        }

        if (fecha.value != "") {
            let fechaHoy = new Date()
            fechaHoy = (new Date(fechaHoy.getTime() - (fechaHoy.getTimezoneOffset() * 60000))).toJSON()
            let fechaVacuna = new Date(fecha.value)
            fechaVacuna = (new Date(fechaVacuna.getTime() - (fechaVacuna.getTimezoneOffset() * 60000))).toJSON()
            if (fechaVacuna > fechaHoy) {
                //this.shadowRoot.querySelector("#lblErrorFecha").removeAttribute("oculto");
                store.dispatch(showWarning(this.current, 2))

                valido = false
                return false
            }
        } else {
            //this.shadowRoot.querySelector("#lblErrorFecha").removeAttribute("oculto");
            store.dispatch(showWarning(this.current, 3))

            valido = false
            return false
        }

        this.update()
        return true
    }

    asignarValores(olditem) {
        let item = {
            ...olditem
        }

        item.MascotaId = parseInt(this.shadowRoot.querySelector("#mascota").value, 10)
        item.VacunaId = parseInt(this.shadowRoot.querySelector("#vacuna").value, 10)
        item.Fecha = this.shadowRoot.querySelector("#txtFecha").value
        item.Realizada = true
        item.Activo = true


        return item
    }

    clickBoton2() {
        if (this.valido()) {
            store.dispatch(addMascotasvacunas(this.asignarValores(this.item), store.getState().cliente.datos.token))
            if (this.current == "vacuna") {
                store.dispatch(goTo("vacunaMsg"))
            } else {
                store.dispatch(goTo("vacunaMsgMascota"))
            }
        }
    }

    refresh() {
        this.vacunas = []
        this.shadowRoot.querySelector("#mascota").value = 0
        this.update()
    }

    stateChanged(state, name) {

        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = state.screen.layouts[this.mediaSize].areas.find(a => a == this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-vacuna-vacunaMascota-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
                this.current = state.screen.name
                this.mascota = 0
                if (this.current == "vacunaMascota") {
                    this.mascota = state.mascotas.entities.currentItem.Id
                }
            }
            this.update();
        }
        if (name == MASCOTAS_TIMESTAMP) {
            this.mascotas = state.mascotas.entities
        }



        if (name == VACUNAS_TIMESTAMP) {
            this.refresh()
            this.vacunas = state.vacunas.entities
            this.update()
        }

        if (name == MASCOTASGETEDIT_TIMESTAMP) {
            /*    const mascota = state.mascotas.entities.currentTarget
               if (mascota.length > 0) { */
            this.refresh()
            const comboMascota = this.shadowRoot.querySelector("#mascota")
            comboMascota.value = state.mascotas.entities.currentEdit[0].Id.toString()

            this.vacunas = state.vacunas.entities.filter(u => u.MascotaTipoId == state.mascotas.entities.currentEdit[0].Raza.idMascotasTipo)
            comboMascota.disable
            this.update()
        }
    }


    static get properties() {
        return {
            hidden: {
                type: Boolean,
                reflect: true
            },
            label: {
                type: String,
                reflect: ""
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
            current: {
                type: String
            }
        }
    }
}

window.customElements.define("pantalla-vacuna", pantallaVacuna);