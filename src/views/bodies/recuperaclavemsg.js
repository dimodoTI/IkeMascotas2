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
    goTo
} from "../../redux/routing/actions";


const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp"

export class pantallaRecuperaClaveMsg extends connect(store, SCREEN, MEDIA_CHANGE)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.idioma = "ES"
        this.area = "body"
    }

    static get styles() {
        return css `
        ${label}
 
        :host{
            position: absolute;
            display:grid;
            top: 0rem;
            left: 0rem;  
            height:100vh;
            width: 100vw;
            background-color:var(--color-gris-fondo);
            grid-template-rows:5fr 5fr;
            grid-gap:.4rem;
            justify-items:center;
        }
        :host([hidden]){
            display: none; 
        }
        #x{
            position: fixed;
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
            position:relative;
            display:flex;
            width:90%;
            align-items: flex-end;
            justify-content:center;
            text-align:center;
            font-size: var(--font-header-h1-size);
            font-weight: var(--font-header-h1-weight);
        }
        #leyenda{
            position:relative;
            display:flex;
            width:90%;
            align-items: flex-start;
            justify-content:center;
            text-align:center;
            font-size: var(--font-header-h2-size);
            font-weight: var(--font-header-h2-weight);
        }
        `
    }
    render() {
        return html `
            <div id="x" @click=${this.clickBoton1}>
            </div>               
            <div id="titulo">
            ${idiomas[this.idioma].recuperaclavemsg.titulo}
            </div>
            <label id="leyenda">
            ${idiomas[this.idioma].recuperaclavemsg.leyenda}
            </label>
        `
    }

    clickBoton1() {
        store.dispatch(goTo("principal"))
        //store.dispatch(modoPantalla("crearclave", "crearclavemsg"))
    }

    stateChanged(state, name) {


        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = state.screen.layouts[this.mediaSize].areas.find(a => a == this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-recuperaclavemsg-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
            }
            this.update();
        }

    }


    static get properties() {
        return {
            mediaSize: {
                type: String,
                reflect: true,
                attribute: 'media-size'
            },
            hidden: {
                type: Boolean,
                reflect: true
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

window.customElements.define("pantalla-recuperaclavemsg", pantallaRecuperaClaveMsg);