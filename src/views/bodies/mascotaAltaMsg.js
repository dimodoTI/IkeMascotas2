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
export class pantallaMascotaAltaMsg extends connect(store, SCREEN, MEDIA_CHANGE)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.idioma = "ES"
    }

    static get styles() {
        return css `
        ${label}
        ${button}
        :host{
            position: absolute;
            display:grid;
            top: 0rem;
            left: 0rem;  
            height:100%;
            width: 100%;
            background-color:transparent;
        }
        :host([hidden]){
            display: none; 
        }
        :host::-webkit-scrollbar {
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
            grid-template-rows:5fr 1fr 1fr 1fr 2fr;
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
            grid-template-rows:5fr 1fr 1fr 1fr 2fr;
            z-index:20;
        }
 
        #x{
            position: absolute;
            top: .5rem;
            right: .5rem;
            width: 1.5rem;
            height: 1.5rem;
            background-color: transparent;
            background-image:var(--icon-cerrar);
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100%;
            cursor: pointer;
            z-index:10;
        }
        #titulo{
            width:90%;
            align-items: flex-end;
            justify-content:center;
            text-align:center;
            font-size: var(--font-header-h1-size);
            font-weight: var(--font-header-h1-weight);
        }
        #leyenda{
            position:relative;
            width:90%;
            align-items: flex-start;
            justify-content:center;
            text-align:center;
            font-size: var(--font-header-h2-size);
            font-weight: var(--font-header-h2-weight);
        }
        button {
            width:90%;
            height: 2rem;
            align-items: flex-start;
            justify-content:center;
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);
        }
        #imagen{
            height:8rem;
            width:8rem;
            background-color:trasparent;
            background-image:var(--imagen-clave-mod);
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100%;
            align-self: end;
        }
    `
    }
    render() {
        return html `
        <div id="fondo"> </div>
        <div id="cuerpo">
            <div id="x" @click=${this.clickBoton1}>
            </div>               
            <div id="imagen">
            </div>
            <div id="titulo">
            ${idiomas[this.idioma].mascotaaltamsg.titulo}
            </div>
            <label id="leyenda">
            ${idiomas[this.idioma].mascotaaltamsg.leyenda}
            </label>
            <button id="btn-ingresar" btn1 @click=${this.clickBoton2}>
            ${idiomas[this.idioma].mascotaaltamsg.btn1}
            </button>
            <button id="btn-ingresar" btn2 @click=${this.clickBoton3}>
            ${idiomas[this.idioma].mascotaaltamsg.btn2}
            </button>
        </div>
        `
    }

    clickBoton1() {
        store.dispatch(goTo("mascota"))
    }
    clickBoton2() {
        store.dispatch(goPrev())
    }
    clickBoton3() {
        store.dispatch(goTo("principal"))
    }
    stateChanged(state, name) {
        this.mediaSize = state.ui.media.size
        this.hidden = true
        const haveBodyArea = state.screen.layouts[this.mediaSize].areas.find(a => a == this.area)
        const SeMuestraEnUnasDeEstasPantallas = "-mascotaAltaMsg-".indexOf("-" + state.screen.name + "-") != -1
        if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
            this.hidden = false
        }
        this.update();
    }
    firstUpdated() {}

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
            }
        }
    }
}

window.customElements.define("pantalla-mascotaaltamsg", pantallaMascotaAltaMsg);