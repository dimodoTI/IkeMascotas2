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
    cardMascotaHorizontal
} from "../css/cardMascotaHorizontal"
import {
    btnFlotanteAlargado
} from "../css/btnFlotanteAlargado"
import {
    btnNuevaConsulta
} from "../componentes/btnNuevaConsulta"

import {
    CHAT,
    CONSULTA,
    VIDEO,
    ARCHIVO
} from "../../../assets/icons/icons"


import {
    edit as editReservas,
    reservar,
    enAtencion as getEnAtencion
} from "../../redux/reservas/actions"



import {
    pantallaListaReserva
} from "./listaReserva"


import {
    goTo
} from "../../redux/routing/actions"
import {
    isInLayout
} from "../../redux/screens/screenLayouts";

import {
    get as getMascotas,
    getCombo
} from "../../redux/mascotas/actions"

/* const RESERVAS_TIMESTAMP = "reservas.timeStamp"

const RESERVASADD_TIMESTAMP = "reservas.addTimeStamp" */


const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
const COMBO_MASCOTAS = "mascotas.getComboTimeStamp"

export class pantallaMisConsultas extends connect(store, MEDIA_CHANGE, SCREEN, COMBO_MASCOTAS)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.area = "body"
        this.idioma = "ES"
        this.current = "misConsultas"
        this.items = []
        this.hayReserva = "N";
    }

    static get styles() {
        return css `
        ${label}
        ${button}
 
        ${cardMascotaHorizontal}
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
        label,button {
            position: relative;
            width: 95%;
            color: var(--color-negro);
            background-color:transparent;
            border-radius:0;
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);
        } 
        #cuerpo{
            background-color: transparent;
            display: grid;
            width: 95%;
            grid-template-columns: 100%;
            justify-self: center;
            overflow-y: auto; 
            overflow-x: hidden; 
            grid-gap:1rem;
            padding-top: .5rem;
            align-content:flex-start
        }
        #cuerpo::-webkit-scrollbar {
            display: none;
        }
        #avisoConsulta{
            width:95%;
            height:2rem;
        }
        #div-Titulo-02{
            justify-self:center;         
            font-size: var(--font-header-h1-size);
            font-weight: var(--font-header-h1-weight);  
        }
        :host(:not([media-size="small"])) #cmhDivEtiqueta{
            width: 65%;
            justify-self:center;
            align-items:stretch
        }
        #pie{
            position:relative;
           
        }




    `
    }
    render() {
        return html `
 
            <div id="cuerpo">    
<!--                 <btn-nueva-consulta id="avisoConsulta" media-size="${this.mediaSize}">
                </btn-nueva-consulta> -->

                <!-- <btn-nueva-consulta id="avisoConsulta" media-size="${this.mediaSize}" style="padding-bottom:.5rem" @click="${this.video}">
                    </btn-nueva-consulta> -->

                <div id="div-Titulo-02" >
                    ${idiomas[this.idioma].misConsultas.titulo02}
                </div> 
                <div style="display:grid">
                    <pantalla-listareserva></pantalla-listareserva></div>
            </div>
               

        <div id="bfaDivMas"  @click=${this.consulta}>
            ${CONSULTA}
            <label>${idiomas[this.idioma].misConsultas.btn}</label>
        </div>
        `
    }

    verReserva(fecha) {


        let hoy = new Date();
        let atencion = new Date(fecha);
        return hoy.getTime() === atencion.getTime();

    }


    formateoHora(hora) {
        let horaRetorno = "0000" + hora.toString()
        horaRetorno = horaRetorno.substring(horaRetorno.length - 4)
        return horaRetorno.substr(0, 2) + ":" + horaRetorno.substr(2, 2)

    }

    consulta() {

        store.dispatch(getCombo({
            orderby: "Nombre",
            select: "Id,Nombre",
            filter: "Activo",
            token: store.getState().cliente.datos.token
        }))



    }

    stateChanged(state, name) {

        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = isInLayout(state, this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-misConsultas-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.current = state.screen.name
                this.hidden = false
            }
            this.update();
        }

        if (name == COMBO_MASCOTAS && this.current == state.screen.name) {
            store.dispatch(goTo("consulta"))
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
            current: {
                type: String
            }
        }
    }
}

window.customElements.define("pantalla-misconsultas", pantallaMisConsultas);