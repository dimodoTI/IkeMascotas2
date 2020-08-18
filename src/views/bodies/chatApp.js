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

import {
    btnFlotanteRedondo
} from "../css/btnFlotanteRedondo"

import {
    add as addChat,
    ADD_PREGUNTA_SUCCESS
} from "../../redux/chat/actions"
import {
    headerMuestraTapa
} from "../../redux/ui/actions"



const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";

export class chatApp extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.area = "body"
        this.hidden = true
        this.idioma = "ES"
        this.esPregunta = false
        this.reserva = null


        this.accion = ""
        this.chat = {
            id: 0,
            quien: "",
            texto: "",
            hora: "",
            fecha: ""
        }
        this.activo = false;
        this.items = [];
    }
    static get styles() {
        return css `
        ${button}
        ${btnFlotanteRedondo}
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

        #pregunta{
             z-index:100;
             background-color:  var(--color-celeste-muy-claro);;
             position:absolute;
             display:none;            
             grid-gap:2vh;
             padding:1rem;
             top:10vh;
             height:30vh;
             left:5vw;
             right:5vw;
             border: solid 1px var(--color-gris);
             border-radius: 1rem;

         }

         #bfrDivMas{
            color:white;
            font-size:1rem;

    bottom:8vh;
             right:2vw
         }

         :host(:not([media-size="small"])) #bfrDivMas

         {
            top: 80%;
    left: 90%;
         }




         #bfrDivMas:not([es-pregunta]){
             display:grid;
             color:green
         }
         
        `
    }

    render() {
        return html `

            <div id=divRegistros>
                <div id="divChat">
                    ${this.items.map(dato => html`
                        <div id="chatCuerpo" class="classCuerpo${dato.Tipo==0?'yo':'otro'}">   
                            <div id="chatQuien" class="classQuien${dato.Tipo==0?'yo':'otro'}">${dato.Tipo==0?dato.Reserva.Mascota.Nombre:"Veterinario"}</div>
                            <div id="chatTexto">${dato.Texto}</div>
                            <div id="chatHora" class="classHora">${this.formateoFecha(dato.Fecha)}</div>
                        </div>
                    `)}
                </div>
              
            </div>
            <div id="bfrDivMas" media-size="${this.mediaSize}" es-pregunta=${this.esPregunta}  @click="${this.preguntar}">?</div>


            
            <div id="pregunta">
                
                    
                    <textarea id="nuevaPregunta" style="padding:.5rem;font-family:var(--font-label-family);
            font-size:var(--font-label-size);
            font-weight:var(--font-label-weight);" placeholder="Escriba su pregunta"></textarea>
            
                <div style="grid-gap:.3rem;display:grid;grid-template-columns:50% 50%">
                    <button style="height:7vh" id="grabar" btn1 @click="${this.grabar}" >Grabar</button>
                    <button  id="cancelar" btn3 style="color:red;height:7vh" @click="${this.cancelar}">Cancelar</button>
                </div>  
            </div>


        `
    }

    preguntar(e) {

        store.dispatch(headerMuestraTapa(true))

        const pregunta = this.shadowRoot.querySelector("#pregunta")
        pregunta.style.display = "grid"
        this.update()
    }

    cancelar(e) {

        store.dispatch(headerMuestraTapa(false))
        const pregunta = this.shadowRoot.querySelector("#pregunta")
        pregunta.style.display = "none"
        this.update()
    }

    grabar(e) {
        const pregunta = this.shadowRoot.querySelector("#pregunta")
        const nuevaPregunta = this.shadowRoot.querySelector("#nuevaPregunta")

        const reg = {
            Chat: {
                Fecha: new Date(),
                ReservaId: this.reserva.Id,
                UsuarioId: store.getState().cliente.datos.id,
                Texto: nuevaPregunta.value,
                Leido: 0,
                Respondido: 0,
                Tipo: 0
            },
            PreguntaId: 0
        }
        nuevaPregunta.innerHTML = ""
        pregunta.style.display = "none"
        store.dispatch(headerMuestraTapa(false))

        store.dispatch(addChat(reg, store.getState().cliente.datos.token, ADD_PREGUNTA_SUCCESS))
    }

    formateoFecha(fecha) {
        return fecha.substring(8, 10) + "/" + fecha.substring(5, 7) + "/" + fecha.substring(0, 4)
    }

    stateChanged(state, name) {


        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = isInLayout(state, this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-chatApp-chatAppM-chatAppR-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
                this.current = state.screen.name
                this.items = state.chat.entityChatReserva
                this.reserva = state.reservas.entityReservaParaChat
                if (this.items.length > 0) {
                    this.esPregunta = this.items[0].Tipo == 0 ? true : false

                }
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
            },
            esPregunta: {
                type: Boolean,
                reflect: true,
                attribute: "es-pregunta"
            }
        }
    }
}

window.customElements.define("chat-app", chatApp);