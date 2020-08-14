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
    idiomas
} from "../../redux/datos/idiomas";

import {
    MAS

} from "../../../assets/icons/icons"


import {
    goTo
} from "../../redux/routing/actions"
import {
    isInLayout
} from "../../redux/screens/screenLayouts";




const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";

export class chatApp extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.area = "body"
        this.hidden = true
        this.idioma = "ES"

        this.accion = ""
        this.chat = {
            id: 0,
            quien: "",
            texto: "",
            hora: "",
            fecha: ""
        }
        this.activo = false;
        this.chates = [];
    }
    static get styles() {
        return css `
        ${button}
        :host{
            display: grid;
            position:relative; 
            height:100%;
            width:100%;
            background-color: var(--color-blanco);
            grid-gap:0rem;
            overflow-y:auto;
        }
        :host([hidden]){
            display: none; 
        } 

        #divRegistros{
            display:grid;
            grid-gap: .2rem;
            height:100%;
            width:100%;
         
            background-color:var(--color-gris-fondo);
            overflow-x:none;
            overflow-y:auto;
        }

        #divChat{
            display: grid;
            flex-direction: column;
            grid-gap: .4rem;
            background-color:var(--color-gris-fondo);
            font-size: var(--font-label-size);
            font-weight: var(--font-label-weight); 
            overflow-x:none;
            overflow-y:auto;
            align-content: flex-start;
        }
        #divChat::-webkit-scrollbar {
            display: none;
        }
        #divEnviar{
            display:grid;
            width:100%;
            justify-self:center;
            grid-template-columns: 8fr 2fr;
            grid-gap:1rem;
            background-color:var(--color-gris-blanco);
            padding: .6rem 0 .1rem 0;
        }
        #divBotonTerminar{
            position:relative;
            display:grid;
            width:100%;
            padding: .2rem 0 .2rem 0;
        }
        #txtTexto{
            border-radius:.4rem;
            border: 1px solid var(--color-gris);
        }
        #chatCuerpo{
            display:grid;
            border-radius: .5rem;
            border: 1px solid var(--color-gris);
            grid-template-rows: 1rem auto 1rem;
            width:fit-content;
            height:fit-content;
            max-width:100vw;
        }
        .classCuerpoyo{
            justify-self:left;
            background-color: var(--color-blanco);
         }
        .classCuerpootro{
            justify-self:right;
            background-color: var(--color-celeste-claro);
        }
        #chatQuien{
            font-size: var(--font-label-size);
            font-weight: 900;
            padding: 0 .5rem 0 .5rem;
        }
        .classQuienyo{
            color: var(--color-azul);
            justify-self: left;
        }
        .classQuienotro{
            color: var(--color-naranja);
            justify-self: right;
        }
        #chatTexto{
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);
            color: var(--color-negro);
            align-self:center;
            padding: 0 .5rem 0 .5rem;
            word-wrap:break-word;
            max-width:80vw;
         }
        #chatHora{
            font-size: var(--font-label-size);
            font-weight: var(--font-label-weight);
            color: var(--color-gris-oscuro);
            align-self:flex-start;
            padding: 0 .5rem 0 .5rem;
        }

        .classHora{
            justify-self: right;
        }
  
        `
    }

    render() {
        return html `
            <div id=divRegistros>
                <div id="divChat">
                    ${this.chates.map(dato => html`
                        <div id="chatCuerpo" class="classCuerpo${dato.Tipo==0?'yo':'otro'}">   
                            <div id="chatQuien" class="classQuien${dato.Tipo==0?'yo':'otro'}">${dato.Tipo==0?dato.Reserva.Mascota.Nombre:"Veterinario"}</div>
                            <div id="chatTexto">${dato.Texto}</div>
                            <div id="chatHora" class="classHora">${this.formateoFecha(dato.Fecha)}</div>
                        </div>
                    `)}
                </div>
              
            </div>
        `
    }

    formateoFecha(fecha) {
        return fecha.substring(8, 10) + "/" + fecha.substring(5, 7) + "/" + fecha.substring(0, 4)
    }

    stateChanged(state, name) {


        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = isInLayout(state, this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-chatApp-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
                this.current = state.screen.name
                this.chates = state.chat.entityChatReserva
            }
            this.update();
        }

    }

    firstUpdated(changedProperties) {}


    scrollDiv() {
        const myElem = this.shadowRoot.getElementById("divChat")
        myElem.style.alignContent = "baseline"
        if (myElem.scrollHeight > myElem.offsetHeight) {
            myElem.style.alignContent = "stretch"
            const altoTotal = this.shadowRoot.getElementById("divChat").scrollHeight;
            this.shadowRoot.getElementById("divChat").scrollTop = altoTotal;
        } else {
            myElem.style.alignContent = "flex-end"
        }
        this.shadowRoot.getElementById("txtTexto").value = "";
    }
    clickDelete(e) {
        if (confirm('Delete')) {

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
            area: {
                type: String
            },
            current: {
                type: String
            }
        }
    }
}

window.customElements.define("chat-app", chatApp);