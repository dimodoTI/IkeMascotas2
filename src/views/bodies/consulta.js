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
    select
} from "../css/select"
import {
    cardArchivo
} from "../css/cardArchivo"

import {

    ARCHIVO,
    BASURA
} from "../../../assets/icons/icons"


import {
    RESERVAR,
    reservar,
    reservasAFuturo
} from "../../redux/reservas/actions";

import {
    get as
    getTurnosDisponibles
} from "../../redux/turnosdisponibles/actions"


const RESERVASRESERVAR_TIMESTAMP = "reservas.reservarTimeStamp"
const MASCOTASGETEDIT_TIMESTAMP = "mascotas.getEditTimeStamp"


import {
    goNext,
    goTo,
    goPrev
} from "../../redux/routing/actions"
import {
    isInLayout
} from "../../redux/screens/screenLayouts";
import {
    showScreen
} from "../../redux/screens/actions";
import {
    setTimer,
    showWarning
} from "../../redux/ui/actions";


const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp"
const RESERVAS_A_FUTURO_TIMESTAMP = "reservas.reservasAFuturoTimeStamp"

export class pantallaConsulta extends connect(store, MEDIA_CHANGE, SCREEN, RESERVAS_A_FUTURO_TIMESTAMP)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.idioma = "ES"
        this.area = "body"
        this.current = "consulta"
        this.item = []
        //this.item = { para: "", motivo: "", sintoma: "" }
        this.mascotas = []
        this.reserva = []
        this.mascota = 0

    }

    static get styles() {
        return css `
        ${button}

        ${select}
        ${cardArchivo}

        :host{
            position: absolute;
            top: 0rem;
            left: 0rem;  
            height:100%;
            width: 100%;
            background-color:var(--color-gris-claro);
            display:grid;
         }
        :host([hidden]){
            display: none; 
        } 
        :host([media-size="small"]) #gridContenedor{
            grid-row-start:1;
            grid-row-end:3;
        }
        #cuerpo{
            background-color: transparent;
            display:grid;
            padding:1rem;
            grid-auto-flow:row;
            grid-gap:.8rem;
            align-content:start;
            overflow-y: auto; 
            overflow-x: hidden; 
        }
        #cuerpo::-webkit-scrollbar {
            display: none;
        }
        :host(:not([media-size="small"])) #cuerpo{
            width: 50%;
            justify-self: center;
        }
        #selectMascota{
            font-size: var(--font-label-size);
            font-weight: var(--font-bajada-weight);   
        }
        #lblSintoma{
            font-size: var(--font-label-size);
            font-weight: var(--font-label-weight);
            justify-self: left;
            align-self: end;
        }
        #txtSintoma{
            width:100%;
            height:5rem;
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);           
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
        `
    }
    render() {
        return html `

            <div id="cuerpo">

                <div id="selectPara" class="select" style="width:100%;height:3.4rem"> 
                    <label >${idiomas[this.idioma].consulta.para}</label>
                    <select style="width:100%;height:1.7rem;" id="txtMascota">  
                    <option  value=0>${idiomas[this.idioma].consulta.elegimascota}</option>
                        ${this.mascotas.map((p)=>{
                            return html `
                            <option value=${p.Id} style="color:black" .selected="${this.mascota==p.Id}">${p.Nombre}</option>
                             `}
                                )}
                    </select>
                </div>  

                <div id="lblSintoma">${idiomas[this.idioma].consulta.sintoma}</div>
                <textarea id="txtSintoma" style="width:100%;height:5rem;" @input=${this.activar}></textarea>



                <button id="btnSeleccionar" btn1 apagado @click=${this.clickBoton2}>
                    ${idiomas[this.idioma].consulta.btn2}
                </button>
                <div style="height:1rem"></div> 
            </div>

    `
    }




    activar() {
        this.activo = true
        const mascota = this.shadowRoot.querySelector("#txtMascota")

        const sintoma = this.shadowRoot.querySelector("#txtSintoma")
        if (mascota.value.length < 1) {
            this.activo = false
        }

        if (sintoma.value.length < 4) {
            this.activo = false
        }
        if (this.activo) {
            this.shadowRoot.querySelector("#btnSeleccionar").removeAttribute("apagado")
        } else {
            this.shadowRoot.querySelector("#btnSeleccionar").setAttribute("apagado", "")
        }
        this.update()
    }
    valido() {
        [].forEach.call(this.shadowRoot.querySelectorAll("[error]"), element => {
            element.setAttribute("oculto", "")
        })
        let valido = true
        const mascota = this.shadowRoot.querySelector("#txtMascota")
        const sintoma = this.shadowRoot.querySelector("#txtSintoma")
        if (mascota.value == 0) {
            valido = false
        }

        if (sintoma.value.length < 8) {
            valido = false
        }
        this.update()
        return valido
    }
    clickBoton1() {
        store.dispatch(goPrev())
    }



    uploadFile(file) {
        let reader = new FileReader();
        let tipo = file.name.indexOf(".pdf") != -1 ? "pdf" : "otro"
        let imagen = ""
        let archivo = ""
        reader.onload = (e) => {

            archivo = e.currentTarget.result


        };
        reader.readAsDataURL(file)
    }

    adjuntar(e) {
        this.shadowRoot.querySelector("#files").click()
    }




    clickBoton2() {

        if (this.valido()) {
            const mascota = this.shadowRoot.querySelector("#txtMascota").value
            const motivo = this.shadowRoot.querySelector("#txtSintoma").value


            let fechaHoy = new Date()
            fechaHoy = (new Date(fechaHoy.getTime() - (fechaHoy.getTimezoneOffset() * 60000))).toJSON()
            store.dispatch(reservasAFuturo(mascota, store.getState().cliente.datos.token, fechaHoy))

        } else {
            store.dispatch(showWarning(this.current, 1))
        }

    }



    stateChanged(state, name) {

        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true

            const haveBodyArea = isInLayout(state, this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-consulta-consultaMascota-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
                this.current = state.screen.name
                this.mascotas = state.mascotas.combo
                const txtMascota = this.shadowRoot.querySelector("#txtMascota")
                txtMascota.value = 0
                const txtSintoma = this.shadowRoot.querySelector("#txtSintoma")
                txtSintoma.value = ""
                this.mascota = 0
                if (this.current == "consultaMascota") {
                    txtMascota.value = state.mascotas.entities.currentItem.Id.toString()
                }

            }
            this.update();
        }

        if (name == RESERVAS_A_FUTURO_TIMESTAMP) {
            if (state.reservas.reservasAFurturo.length == 0) {
                store.dispatch(getTurnosDisponibles())
                const mascota = this.shadowRoot.querySelector("#txtMascota").value
                const motivo = this.shadowRoot.querySelector("#txtSintoma").value
                store.dispatch((reservar(mascota, motivo)))
                if (this.current == "consulta") {
                    store.dispatch(goTo("consultaTurnos"))
                } else {
                    store.dispatch(goTo("consultaTurnosMascota"))
                }
            } else {
                store.dispatch(showWarning(this.current, 0))
            }
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

window.customElements.define("pantalla-consulta", pantallaConsulta);