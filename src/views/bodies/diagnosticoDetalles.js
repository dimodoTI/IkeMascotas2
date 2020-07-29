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
    ATRAS,
    ARCHIVO,
    TRASH
} from "../../../assets/icons/icons"


import {
    cardArchivo
} from "../css/cardArchivo"


const RESERVASENATENCION_TIMESTAMP = "reservas.enAtencionTimeStamp"

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

export class pantallaDiagnosticosDetalles extends connect(store, SCREEN, MEDIA_CHANGE, RESERVASENATENCION_TIMESTAMP)(LitElement) {
    constructor() {
        super();
        this.idioma = "ES"
        this.reservas = null
        this.area = "body"
        this.current = "diagnosticoDetalles"
        this.reservaEnAtencion = {
            Id: 0,
            Atencion: {
                Diagnostico: ""
            },
            Mascota: {
                Nombre: ""
            }
        }

        this.archivo = [{
                nombre: "Documento.jpg"
            },
            {
                nombre: "Estudio.pdf"
            },
            {
                nombre: "Estudio.pdf"
            },
            {
                nombre: "Estudio.pdf"
            },
            {
                nombre: "Estudio.pdf"
            },
            {
                nombre: "Estudio.pdf"
            },
            {
                nombre: "Estudio.pdf"
            }
        ]
    }

    static get styles() {
        return css `

        ${cardArchivo}

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
        :host(:not([media-size="small"])){
            grid-template-rows: 100%;
        }
        :host([media-size="small"]){
            grid-template-rows: 9fr 1fr;
        }
        #gridContenedor{
            display:grid;
            grid-template-rows:18fr 82fr;           
        }
        #cuerpo{           
            display:grid;
            position:relative;
          
            padding: 0 1rem 0 1rem;
            grid-template-rows: 2rem 8rem 6rem 1rem auto;
            overflow-x:none;
            overflow-y:auto;

        }
        #cuerpo::-webkit-scrollbar {
            display: none;
        }
        #footer{
            grid-area: Pie; 
            display:grid;
            overflow-x: none; 
        }
        :host([media-size="small"]) #control{
            height:calc((100vh * .82) * .9);
        }
        :host(:not([media-size="small"])) #control{
            height:calc(100vh * .82);
        }
        #divTitulo{
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);   
            align-self:center;
        }
        #txtDiagnostico{
            width: 100%;
            height:95%;
            font-family:var(--font-label-family);
            font-size:var(--font-label-size);
            font-weight:var(--font-label-weight);
        }
        #divRecetas{
            display:grid;
            position:relative;
            grid-gap:2vh;
            overflow-x:none;
            overflow-y:auto;
            margin : 1vh 0 1vh 0;
            align-content: baseline;
        }
        #divRecetas::-webkit-scrollbar {
            display: none;
        }
        #divTituloConsulta{
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);   
            align-self:flex-end;    

        }
        #divDetalle{
            display:grid;
            padding: .5rem 1rem .5rem 1rem;
            font-size: var(--font-label-size);
            font-weight: var(--font-label-weight);
            background-color: var(--color-gris-claro);
            grid-gap: .2rem;
            border-radius: .4rem;
        }
        `
    }

    render() {
        return html `
       
                <div id="cuerpo">
                    <div id="divTitulo">
                        ${idiomas[this.idioma].diagnosticoDetalles.lblDiagnostico}
                    </div>
                    <div id="divDiagnostico">
                        <textarea id="txtDiagnostico" rows="8" readonly>${this.reservaEnAtencion.Atencion?this.reservaEnAtencion.Atencion.Diagnostico:""}</textarea>
                    </div>
                    <div id="divRecetas">
                        ${this.archivo.map(dato => html`
                            <div id="ciDivEtiqueta">
                                <div id="ciDivContenido" style="grid-column-start:1;grid-column-end:3">
                                    <div id="ciDivIcomo">${ARCHIVO}</div>
                                    <div id="ciDivNombre">${dato.nombre}</div>
                                </div>
                            </div>
                        `)} 
                    </div>
                    <div id="divTituloConsulta">
                        ${idiomas[this.idioma].diagnosticoDetalles.tituloconsulta}
                    </div>
                    <div id="divDetalle">
                        <label id="lblExpediente">${idiomas[this.idioma].diagnosticoDetalles.expediente + " " + this.reservaEnAtencion.Id}</label>
                        <label id="lblPaciente">${idiomas[this.idioma].diagnosticoDetalles.paciente + " " + this.verNombre()}</label>           
                        <label id="lblMotivo">${idiomas[this.idioma].diagnosticoDetalles.motivo + " " + this.reservaEnAtencion.Motivo}</label>           
                        <label id="lblFecha">${idiomas[this.idioma].diagnosticoDetalles.fecha + " " + this.verFecha(this.reservaEnAtencion.FechaAtencion)}</label>           
                        <label id="lblHora">${idiomas[this.idioma].diagnosticoDetalles.hora + " " + this.reservaEnAtencion.HoraAtencion}</label>           
                        <label id="lblVeterinario">${idiomas[this.idioma].diagnosticoDetalles.veterinario + " " + this.verVeterinario()}</label>           
                        <div style="padding-top:.5rem;display:grid;grid-gap:.5rem">
                        ${this.archivo.map(dato => html`
                            <div id="ciDivEtiqueta">
                                <div id="ciDivContenido" style="grid-column-start:1;grid-column-end:3">
                                    <div id="ciDivIcomo">${ARCHIVO}</div>
                                    <div id="ciDivNombre">${dato.nombre}</div>
                                </div>
                            </div>
                        `)}   
                    </div>
                </div>
                </div>
           
        `
    }


    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            this.current = state.screen.name
            const haveBodyArea = state.screen.layouts[this.mediaSize].areas.find(a => a == this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-diagnosticoDetalles-diagnosticoDetallesM-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
            }
            this.update();
        }
        if (name == RESERVASENATENCION_TIMESTAMP) {
            if (state.reservas.entities.enAtencion) {
                this.reservaEnAtencion = state.reservas.entities.enAtencion.registro;
                this.update()
            }
        }

    }

    verNombre() {
        let retorno = ""
        if (this.reservaEnAtencion.Mascota.Nombre) {
            retorno = this.reservaEnAtencion.Mascota.Nombre
        }
        return retorno

    }

    verFecha(fecha) {
        let d = new Date(fecha)
        return d.getUTCDate() + "-" + (d.getUTCMonth() + 1) + "-" + d.getUTCFullYear()
    }
    verVeterinario() {
        return store.getState().cliente.datos.apellido + ", " + store.getState().cliente.datos.nombre
    }
    clickAtras() {
        store.dispatch(modoPantalla("misconsultas"))
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
window.customElements.define("pantalla-diagnosticosdetalles", pantallaDiagnosticosDetalles);