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
    cardCalendario
} from "../css/cardCalendario"

import {
    ATRAS,
    CHAT
} from "../../../assets/icons/icons"


import {
    edit as mascotasEdit,
    getCombo
} from "../../redux/mascotas/actions"



import {
    enAtencion as getEnAtencion
} from "../../redux/reservas/actions"
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
    pantallaListaReserva
} from "./listaReserva"
import {
    limpiarFoto
} from "../../redux/fotos/actions";



const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp"

const VACUNAS_MASCOTAS_TIMESTAMP = "mascotasvacunas.timeStamp"

const CALENDARIO_TIMESTAMP = "calendario.timeStamp"
const COMBO_MASCOTAS = "mascotas.getComboTimeStamp"
export class pantallaMascotaVer extends connect(store, SCREEN, MEDIA_CHANGE, VACUNAS_MASCOTAS_TIMESTAMP, CALENDARIO_TIMESTAMP, COMBO_MASCOTAS)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.area = "body"
        this.idioma = "ES"

        this.calendario = []
        this.mascotasVacuna = []



        this.items = {
            "Id": 0,
            "idUsuario": 0,
            "idRaza": 0,
            "Nombre": "",
            "FechaNacimiento": "",
            "Foto": "",
            "Castrada": true,
            "Activo": true,
            "MascotasVacuna": [{
                "Id": 0,
                "MascotaId": 0,
                "VacunaId": 0,
                "Fecha": "",
                "Realizada": true,
                "Activo": true,
                "Vacuna": {
                    "Id": 0,
                    "MascotaTipoId": 0,
                    "Descripcion": "",
                    "Activo": true,
                    "Calendarios": {
                        "Id": 0,
                        "MascotasTipoId": 0,
                        "VacunaId": 0,
                        "Enfermedades": "",
                        "Edad": "",
                        "Optativa": true,
                        "Periodicidad": "",
                        "Activo": true
                    }
                }
            }],
            "Raza": {
                "Id": 0,
                "idMascotasTipo": 0,
                "Descripcion": "",
                "Activo": true,
                "MascotasTipo": {
                    "Id": 0,
                    "Descripcion": "",
                    "Activo": true
                }
            },
            "Reservas": [{
                "Id": 0,
                "TramoId": 0,
                "MascotaId": 0,
                "UsuarioId": 0,
                "FechaAtencion": "",
                "HoraAtencion": "",
                "FechaGenerarion": "",
                "Motivo": "",
                "Estado": 0,
                "Activo": true,



                "Atencion": {
                    "Id": 0,
                    "ReservaId": 0,
                    "VeterinarioId": 0,
                    "InicioAtencion": "",
                    "FinAtencion": "",
                    "Diagnostico": "",
                    "Observaciones": "",
                    "Estado": 0,
                    "Calificacion": 0,
                    "ComentarioCalificacion": "",
                    "Activo": true
                }
            }]


        }
    }

    static get styles() {
        return css `
        ${button}

        ${cardCalendario}
        ${cardMascotaHorizontal}

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
        #cuerpo{
            background-color: transparent;
            display:grid;
            padding:1rem;
            grid-auto-flow:row;
            grid-gap:.1rem;
            overflow-y: auto; 
            overflow-x: hidden; 
           
        }
        #cuerpo::-webkit-scrollbar {
            display: none;
        }
        :host(:not([media-size="small"])) #cuerpo{
/*             width:70%;
            justify-self:center; */
            grid-template-columns: repeat(auto-fit,minmax(10rem,1fr));
        }
        #foto{
            display:grid;
            height: calc(60vw - 2rem);
            width: 100%;
            background-color: var(--color-gris-claro);
            border-radius: .5rem;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: cover;
        }
        .subTitulo{
            font-size: var(--font-bajada--size);
            font-weight: bold;
            padding-bottom: 1rem;
        }
        .informacion{
            font-size: var(--font-bajada-size);
            font-weight: var(--font-header-h1-weight);
        }
        #btn-edit{
            width:100%;
            height:2rem;
            justify-self: center;
            margin-top: 1rem;
            margin-bottom: 1rem;
        }
        #pie{
            position:relative;

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
                <div id="foto" style="background-image:url(${this.items.Foto})">
                </div>
                <label class="subTitulo">${idiomas[this.idioma].mascotaver.informacion}</label>
                <label class="informacion">${idiomas[this.idioma].mascotaver.tipo +  this.items.Raza.MascotasTipo.Descripcion}</label>
                <label class="informacion">${idiomas[this.idioma].mascotaver.edad + this.calculaEdad(this.items.FechaNacimiento)}</label>
                <button id="btn-edit" btn1 @click=${ this.clickEdit}>
                    ${ idiomas[this.idioma].mascotaver.btn1}
                </button >

                <div>
                <label class="subTitulo" >${idiomas[this.idioma].mascotaver.consulta}</label>
                    <pantalla-listareserva class="body"></pantalla-listareserva>
                </div>
                <button style="margin-top:1rem" id="btn-edit" btn3 @click=${ this.clickConsulta}>
                ${ idiomas[this.idioma].listaReserva.agendarReserva}
            </button >
                
                <div style="padding:.5rem 0 .5rem 0">
                    <label class="subTitulo" >${idiomas[this.idioma].mascotaver.vacuna}</label>
                    <div style="display:grid;grid-gap:.8rem;">
                        ${this.vacunas()}
      
                    </div> 
                    <button id="btn-edit" btn3 @click=${ this.clickVacunas}>
                        ${ idiomas[this.idioma].mascotaver.btn3}
                    </button >
                </div>


            </div>`
    }


    diagnostico(e) {
        store.dispatch(getEnAtencion({
            filter: "Id eq " + e.currentTarget.item.Id,
            expand: "Atencion,Mascota",
            token: store.getState().cliente.datos.token
        }))
    }

    vacunas() {



        return this.mascotasVacuna.map(dato => {



            const calendario = this.calendario.filter(u => u.VacunaId == dato.VacunaId)
            return html `
            

            <div id="ccDivEtiqueta" style="width:90%;justify-self:center">
            <div id="ccDivVacuna">${dato.Vacuna?dato.Vacuna.Descripcion:""}</div>
            <div id="ccDivPara">
                ${calendario.length>0?calendario[0].Enfermedades:""}
            </div>
            <div class="labelRedondeado" id="ccDivCachorro">
                ${calendario.length>0?calendario[0].Edad:""}
            </div>
            <div class="labelRedondeado" id="ccDivObligatorio">${calendario.length>0?calendario[0].Optativa?idiomas[this.idioma].calendario.optativa:idiomas[this.idioma].calendario.obligatoria:""}</div>
            <div class="labelRedondeado" id="ccDivPeriodicidad">${calendario.length>0?calendario[0].Periodicidad:""}</div>
        </div>`
        })



    }

    renderVacuna(dato) {


        const calendario = this.calendario.filter(u => u.VacunaId == dato.VacunaId)

        return html `
        
        <div id="ccDivEtiqueta" style="width:90%;justify-self:center">
            <div id="ccDivVacuna">${dato.Vacuna.Descripcion}</div>
            <div id="ccDivPara">
                ${calendario.length>0?calendario[0].Enfermedades:""}
            </div>
            <div class="labelRedondeado" id="ccDivCachorro">
                ${calendario.length>0?calendario[0].Edad:""}
            </div>
            <div class="labelRedondeado" id="ccDivObligatorio">${calendario.length>0?calendario[0].Optativa?idiomas[this.idioma].calendario.optativa:idiomas[this.idioma].calendario.obligatoria:""}</div>
            <div class="labelRedondeado" id="ccDivPeriodicidad">${calendario.length>0?calendario[0].Periodicidad:""}</div>
        </div>`

        this.update()
    }

    clickEdit() {
        store.dispatch(mascotasEdit("M", this.items))
        store.dispatch(limpiarFoto())
        store.dispatch(goTo("mascotaeditar"))
    }
    clickConsulta() {

        store.dispatch(getCombo({
            orderby: "Nombre",
            select: "Id,Nombre",
            token: store.getState().cliente.datos.token
        }))

    }
    clickVacunas() {
        store.dispatch(mascotasEdit("M", this.items))
        store.dispatch(goTo("vacunaMascota"))
    }
    clickFoto() {
        this.shadowRoot.querySelector("#divTapa").style.display = "grid";
        this.shadowRoot.querySelector("#divMensaje").style.display = "grid";
    }
    clickCancelar() {
        this.shadowRoot.querySelector("#divTapa").style.display = "none";
        this.shadowRoot.querySelector("#divMensaje").style.display = "none";
    }
    calculaEdad(nacimiento) {

        const hoy = new Date()
        const fecNac = new Date(nacimiento)
        const dif = ((((hoy.getTime() - fecNac.getTime()) / 1000) / 60) / 60) / 24
        return Math.floor((dif / 365.2425))

    }

    stateChanged(state, name) {

        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = state.screen.layouts[this.mediaSize].areas.find(a => a == this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-mascotaver-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.current = state.screen.name
                this.hidden = false

                this.items = state.mascotas.entities.currentItem
                if (!this.items.Foto) {
                    this.items.Foto = ""
                }

            }
            this.update();
        }



        if (name == VACUNAS_MASCOTAS_TIMESTAMP) {
            this.mascotasVacuna = state.mascotasvacunas.entities
            this.update()
        }

        if (name == CALENDARIO_TIMESTAMP) {
            this.calendario = state.calendario.entities

        }

        if (name == COMBO_MASCOTAS && this.current == state.screen.name) {
            store.dispatch(goTo("consultaMascota"))
        }


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

window.customElements.define("pantalla-mascotaver", pantallaMascotaVer);