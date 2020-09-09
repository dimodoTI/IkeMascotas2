import {
    html,
    LitElement,
    css,
    internalProperty
} from "lit-element";
import {
    store
} from "../../redux/store";
import {
    connect
} from "@brunomon/helpers";

import {
    ESTRELLA,
    ESTRELLABORDE
} from "../../../assets/icons/icons"
import {
    idiomas
} from "../../redux/datos/idiomas"
import {
    ikeInput
} from "../css/ikeInput"
import {
    button
} from "../css/button"

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
    calificarAtencion
} from "../../redux/reservas/actions"

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp"

export class pantallaVideoCalificacion extends connect(store, SCREEN, MEDIA_CHANGE)(LitElement) {
    constructor() {
        super();
        this.idioma = "ES"
        this.hidden = true
        this.calificacion = 0;
        this.area = "body"
        this.reserva = []
    }

    static get styles() {
        return css `
        ${ikeInput}
        ${button}
        :host{
            position:absolute;
            display: grid;
            background-color: trasparent;
            height: 100%;
            width: 100%;   
        }
        :host([hidden]){
            display: none; 
         }
        :host([media-size="small"]) #fondo{
           display:none; 
        }
        :host(:not([media-size="small"])) #fondo{
            position:absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            z-index:10;
            background-color: var(--color-negro);
            opacity:.7; 
        }
        :host([media-size="small"]) #cuerpo{
            display: grid;
            position:relative;
            justify-items:center;
            align-items: center;  
            height: 100%;
            width: 100%;   
            background-color: var(--color-gris-fondo);
            grid-template-rows: 10% 15% 10% 10% 5% 12% 15% 15% 5%;           
        }
        :host(:not([media-size="small"])) #cuerpo{
            position:absolute;
            top:15%;
            left:15%;
            display: grid;
            justify-items:center;
            align-items: center;  
            background-color: var(--color-gris-fondo);
            height: 70%;
            width: 70%;   
            grid-template-rows: 10% 15% 10% 10% 12% 20% 13% 10%;  
            z-index:20;
        }
        #cerrar{
            position:absolute;
            top: .5rem;
            right: .5rem;
            font-size: var(--font-titulo-h1-size);
            font-weight: var(--font-titulo-h1-weight);
        }
        #titulo{
            font-size: var(--font-titulo-h1-size);
            font-weight: bolder;
            text-align:center;
        }
        #leyenda{
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);
            padding: 0 1rem 0 1rem;
            text-align:center;
        }
        #calificaLbl{
            font-size: var(--font-titulo-h1-size);
            font-weight: var(--font-titulo-h1-weight);
            padding: 0 1rem 0 1rem;
            text-align:center;
        }
        #calificaImg{
            display:grid;
            grid-gap:0rem;
            justify-content: center;
            grid-template-columns:9% 9% 9% 9% 9% 9% 9% 9% 9% 9%;
        }
        #cuantos{
            justify-content:center;
        }
        .estrella{
            height:2rem;
            width:2rem;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 80%;
        }
        .estrella svg{
            fill : var(--color-amarillo);
            height: 1.5rem;
            width:1.5rem;
        }
        #comentarioLbl{
            font-size: var(--font-label-size);
            font-weight: var(--font-label-weight);
            justify-self: left;
            padding-left:2rem;
            align-self: center;
        }

        `
    }
    render() {
        return html `
        <div id="fondo"> </div>
        <div id="cuerpo">
            <div id="cerrar" @click="${this.cerrar}">X</div>
            <div id="titulo">${idiomas[this.idioma].videoCalificacion.titulo}</div>
            <div id="leyenda">${idiomas[this.idioma].videoCalificacion.leyenda}</div>
            <div id="calificaLbl">${idiomas[this.idioma].videoCalificacion.calificaLbl}</div>
            <div id="calificaImg">
                <div class="estrella" cal="1" @click="${this.califica}">${this.calificacion == 0 ? ESTRELLABORDE : ESTRELLA}</div>
                <div class="estrella" cal="2" @click="${this.califica}">${this.calificacion < 2 ? ESTRELLABORDE : ESTRELLA}</div>
                <div class="estrella" cal="3" @click="${this.califica}">${this.calificacion < 3 ? ESTRELLABORDE : ESTRELLA}</div>
                <div class="estrella" cal="4" @click="${this.califica}">${this.calificacion < 4 ? ESTRELLABORDE : ESTRELLA}</div>
                <div class="estrella" cal="5" @click="${this.califica}">${this.calificacion < 5 ? ESTRELLABORDE : ESTRELLA}</div>
                <div class="estrella" cal="6" @click="${this.califica}">${this.calificacion < 6 ? ESTRELLABORDE : ESTRELLA}</div>
                <div class="estrella" cal="7" @click="${this.califica}">${this.calificacion < 7 ? ESTRELLABORDE : ESTRELLA}</div>
                <div class="estrella" cal="8" @click="${this.califica}">${this.calificacion < 8 ? ESTRELLABORDE : ESTRELLA}</div>
                <div class="estrella" cal="9" @click="${this.califica}">${this.calificacion < 9 ? ESTRELLABORDE : ESTRELLA}</div>
                <div class="estrella" cal="10" @click="${this.califica}">${this.calificacion < 10 ? ESTRELLABORDE : ESTRELLA}</div>
            </div>
            <div id="cuantos">${this.calificacion}/10 </div>
            <div id="comentarioLbl">${idiomas[this.idioma].videoCalificacion.comentarioLbl}</div>
            <div id="comentarioTxt" style="width:90%;height:5rem;">
                <textarea id="txtComentario" style="width:100%;height:90%;"></textarea>
            </div>
            <div id="btnGuardar" style="width:90%;">
                <button btn1 @click="${this.guardar}" style="width:100%;">${idiomas[this.idioma].videoCalificacion.btn1}</button>
            </div>
            <div id="btnAhoraNo">
                <button btn2 @click="${this.ahoraNo}">${idiomas[this.idioma].videoCalificacion.btn2}</button>
            </div>
        </div>
        `
    }
    califica(e) {
        let valor = e.currentTarget.getAttribute("cal")
        if (valor == 1 && valor == this.calificacion) {
            this.calificacion = 0;
        } else {
            this.calificacion = valor;
        }
        this.update();
    }
    cerrar() {
        store.dispatch(goTo("principal"))
        //store.dispatch(modoPantalla(store.getState().ui.pantallaQueLLamo, "videocalificacion"))
    }

    guardar() {
        const comentario = this.shadowRoot.querySelector("#txtComentario")
        store.dispatch(calificarAtencion(this.reserva.Id, this.calificacion, comentario.value, store.getState().cliente.datos.token))
        this.calificacion = 0
        comentario.value = ""
        store.dispatch(goTo("principal"))
    }

    ahoraNo() {
        store.dispatch(goTo("principal"))
    }

    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            this.current = state.screen.name
            const haveBodyArea = state.screen.layouts[this.mediaSize].areas.find(a => a == this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-videoCalificacion-videoCalificacionM-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.current == state.screen.name
                this.hidden = false
                this.reserva = state.reservas.entities.enAtencion.registro
                this.update();
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
            calificacion: {
                type: Number,
                reflect: true
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
window.customElements.define("pantalla-videocalificacion", pantallaVideoCalificacion);