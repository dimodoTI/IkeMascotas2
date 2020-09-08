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
    repeat
} from 'lit-html/directives/repeat.js';
import {
    ATRAS
} from "../../../assets/icons/icons"

import {
    goTo
} from "../../redux/routing/actions"
import {
    isInLayout
} from "../../redux/screens/screenLayouts";


const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";


export class pantallaPlanDetalle extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.plan = ["Atención ante emergencias.", "Análisis y estudios.", "Intervención quirúrgica.",
            "Internación.", "Guardería.", "Ayuda para localización de mascotas extraviadas.",
            "Envío de alimento a domicilio.", "Asesoramiento legal telefónico.", "Orientación en adiestramiento.",
            "Descuentos en farmacias y veterinarias."
        ]
        this.hidden = true
        this.idioma = "ES"
        this.area = "body"
    }

    static get styles() {
        return css `
        ${button}

        :host{
            display: grid;
            position: relative;
            background-color: var(--color-gris-claro) !important;
            overflow-x:none;
            overflow-y:auto;
            
            
        }
        :host([hidden]){
            display:none ;
        }

        :host([hidden]){
            display: none; 
        } 
        #cuerpo{
            display:grid;
            grid-gap: .2rem;
            height:100%;
            width:100%;
         
            background-color:var(--color-gris-fondo);
            overflow-x:none;
            overflow-y:auto;
        }
        #cuerpo::-webkit-scrollbar {
            display: none;
        }
        button {
            position: relative;
            width: 80%;
            color: var(--color-negro);
            background-color:transparent;
            border-radius:0;
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);
        }
        #planes{
            width: auto;
            position: relative;
            display: grid;
            grid-template-columns: 15% auto;
            grid-gap: .8rem;
            font-size: var(--font-header-h2-size);
            font-weight: var(--font-header-h2-weight);
            padding-bottom:1rem;
            padding-top: 1rem;
        }
        #planImg{
            height: auto;
            width: 100%;
            background-image: var(--icon-click);
            background-color: transparent;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 1rem 1rem;
        }
        #planDes{
            height: 1.5rem;
            width: 100%;
            font-size: var(--font-header-h2-size);
            font-weight: var(--font-header-h2-weight);
            display: flex;
            align-items:center; 
            justify-content:left;
        }        
        `
    }
    render() {
        return html `

        <div id="cuerpo">
            <div id="planes">
                
                ${repeat(this.plan, (item) => item, (item, index) => html`
                    <div id="planImg">
                    </div>
                    <div id="planDes">
                        ${item}
                    </div>
                `)}
                <button id="btn-poliza" btn1 @click=${this.clickBoton1}
                style="grid-column-start:1;grid-column-end:3;width:100%;margin-top:1rem">
                ${idiomas[this.idioma].planDetalle.btn1}
                </button>
                <button id="btn-planes" btn3 @click=${this.clickBoton2}
                style="grid-column-start: 1;grid-column-end:3;width:100%;margin-top:1rem">
                ${idiomas[this.idioma].planDetalle.btn2}
                </button>  
                <div style="height:2rem"></div>
            </div>
             
        </div>
        `
    }


    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = isInLayout(state, this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-planDetalle-planDetalleU-planDetalleC-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
                this.current = state.screen.name

            }
            this.update();
        }
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

window.customElements.define("pantalla-plandetalle", pantallaPlanDetalle);