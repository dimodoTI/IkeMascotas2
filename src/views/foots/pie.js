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
    button
} from "../css/button"
import {
    HOME,
    MASCOTA,
    VACUNA,
    CONSULTA,
    FOTO
} from "../../../assets/icons/icons";
import {
    idiomas
} from "../../redux/datos/idiomas"
import {
    goTo
} from "../../redux/routing/actions"
import {
    isInLayout
} from "../../redux/screens/screenLayouts";

import {
    get as getReservas
} from "../../redux/reservas/actions"
import {
    get as getMascotas
} from "../../redux/mascotas/actions"
const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
export class pieComponente extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.area = "foot"
        this.idioma = "ES"
    }

    static get styles() {
        return css `
        ${button}
        :host{
            display: grid;
            position:relative; 
            align-items:center; 
            justify-content:center;
            background-color: var(--color-blanco);
        }
        :host([hidden]){
            display: none; 
        } 
        :host([media-size="small"]){
            grid-template-rows: 100% ;
            grid-template-columns: 100% ;
        }
        :host(:not([media-size="small"])){
            grid-template-rows: 24% 76% ;
            grid-template-columns: 100% ;
        }
        #pieCabecera{
            width:100%;
            height:100%;
            background-image:var(--imagen-logo-splash);
            background-repeat: no-repeat;
            background-position: center;
            background-size: 7vw;
        }
        :host([media-size="small"]) #pieCabecera{
            display:none;
         }
        #pieMenu{
            display: grid;
            position:relative;
            align-items:center; 
            justify-content:center;
            background-color: var(--color-blanco);
        }
        :host([media-size="small"]) #pieMenu{
            grid-template-columns:repeat(5,2fr);
            grid-template-rows: 60% 40%;
            grid-gap:0.1rem;
        }
        :host(:not([media-size="small"])) #pieMenu{
            grid-template-columns: 40% 60%;
            grid-template-rows: 3rem 3rem 3rem 3rem 3rem ;
            grid-auto-flow: column;
            align-self: start;
            grid-gap:0rem;
        }
        .img{
            display:grid;
            justify-content: center;
            align-content: center;
            cursor:pointer;
            width:100%;
            height:100%;
        }
        :host(:not([media-size="small"])) .img{
            border-left: solid 4px transparent;
        }
        .img[select="SI"]{
            cursor: not-allowed;
            pointer-events: none;  
        }
        .img[select="NO"]{
            cursor: pointer;
            pointer-events: auto;  
        }
        :host(:not([media-size="small"])) .img[select="SI"]{
            border-left: solid 4px var(--color-azul-oscuro);
            background-color:var(--color-gris-fondo);
        }
        .lbl{
            width:100%;
            height:100%;
            display:grid;
            justify-content: center;
            align-content: center;
            font-size: var(--font-label-size);
            font-weight: var(--font-label-weight);
            color:var(--color-gris-medio);
            cursor:pointer;
        }
        :host(:not([media-size="small"])) .lbl{
            justify-content: start;
        }
        .lbl[select="SI"]{
            color:var(--color-azul-oscuro);
            background-color:var(--color-gris-fondo);
            cursor: not-allowed;
            pointer-events: none;  
        }
        svg{
            width:1rem;
            height:1rem;
            stroke:var(--color-gris);
        }
        :host(:not([media-size="small"])) svg{
            width:1.5rem;
            height:1.5rem;
         }
        .img[select="SI"] svg{
            fill:var(--color-azul-oscuro);
            stroke:var(--color-azul-oscuro);
        }
        .img[select="NO"] svg{
            fill:var(--color-gris);
            stroke:var(--color-gris);
        }
        #divAyudaPie{
            position:absolute;
            display:grid;
            left:0;
            bottom:1rem;
            grid-template-rows: 30% 40% 40%;
            width:100%;
            grid-gap:0rem;
            justify-items:center;
        }
        :host([media-size="small"]) #divAyudaPie{
            display:none;
        }
        .lblayudaPie{
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);
            width:100%;
            text-align:center;
        }
        #btn-ayudaPie{
            height:1.8rem;
            width:90%;
            font-size: var(--font-label-size);
            font-weight: var(--font-label-weight);
        }
        :host([media-size="medium"]) #btn-ayudaPie{
            font-size: var(--font-error-size);
        }

        `
    }

    render() {
        return html `
            <div id="pieCabecera">
            </div>
            <div id="pieMenu">
                <div id="img-home" sele ct=${this.opcion == 'uno' ? 'SI' : 'NO'} @click="${this.clickBoton1}" class="img">
                    ${HOME}
                </div>
                <div id="img-mascota" select=${this.opcion == 'dos' ? 'SI' : 'NO'}  @click="${this.clickBoton2}" class="img">
                    ${MASCOTA}
                </div>  
                <div id="img-consulta" select=${this.opcion == 'tres' ? 'SI' : 'NO'} @click="${this.clickBoton3}" class="img">
                    ${CONSULTA}
                </div>
                <div id="img-vacuna" select=${this.opcion == 'cuatro' ? 'SI' : 'NO'} @click="${this.clickBoton4}" class="img">
                    ${VACUNA}
                </div>  
                <div id="img-foto" select=${this.opcion == 'cinco' ? 'SI' : 'NO'} @click="${this.clickBoton5}" class="img">
                    ${FOTO}
                </div>          
                <div id="lbl-home" select=${this.opcion == 'uno' ? 'SI' : 'NO'} @click="${this.clickBoton1}"  class="lbl">
                    ${idiomas[this.idioma].pie.inicio}
                </div>
                <div id="lbl-mascota" select=${this.opcion == 'dos' ? 'SI' : 'NO'} @click="${this.clickBoton2}"  class="lbl">
                    ${idiomas[this.idioma].pie.mascota}
                </div>
                <div id="lbl-consulta" select=${this.opcion == 'tre' ? 'SI' : 'NO'} @click="${this.clickBoton3}"  class="lbl">
                    ${idiomas[this.idioma].pie.consulta}
                </div>
                <div id="lbl-vacuna" select=${this.opcion == 'cuatro' ? 'SI' : 'NO'} @click="${this.clickBoton4}"  class="lbl">
                    ${idiomas[this.idioma].pie.vacuna}
                </div>
                <div id="lbl-foto" select=${this.opcion == 'cinco' ? 'SI' : 'NO'} @click="${this.clickBoton5}"  class="lbl">
                    ${idiomas[this.idioma].pie.foto}
                </div>

            </div>
            <div id="divAyudaPie">
                <hr style="width:90%; border-top: 2px solid var(--color-gris-claro)">
                <div><label class="lblayudaPie">${idiomas[this.idioma].pie.lblAyuda01}</label></div>
                <button btn3 id="btn-ayudaPie" @click=${this.clickAyudaPie}>${idiomas[this.idioma].pie.btnAyuda}</button>
            </div>
        `
    }
    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveFootArea = isInLayout(state, this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-principal-mascota-misConsultas-calendario-diagnosticoDetalles-".indexOf("-" + state.screen.name + "-") != -1
            if (haveFootArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
            }
            this.update();
        }

    }
    clickBoton1() {
        store.dispatch(goTo("principal"))
        this.opcion = 'uno'
    }
    clickBoton2() {
        store.dispatch(getMascotas({
            token: store.getState().cliente.datos.token,
            expand: "Raza($expand=MascotasTipo),Reservas"
        }))
        store.dispatch(goTo("mascota"))
        this.opcion = 'dos'
    }
    clickBoton3() {
        this.opcion = "tres"
        store.dispatch(goTo("misConsultas"))
        store.dispatch(getReservas({
            expand: "Atencion,Mascota",
            token: store.getState().cliente.datos.token,
            orderby: "FechaAtencion desc"
        }))

    }

    clickBoton4() {
        store.dispatch(goTo("calendario"))
        this.opcion = 'cuatro'
    }

    static get properties() {
        return {
            opcion: {
                type: String,
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
            hidden: {
                type: Boolean,
                reflect: true,
            },
            area: {
                type: String
            }
        }
    }
}

window.customElements.define("pie-componente", pieComponente);