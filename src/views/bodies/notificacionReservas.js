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
    CHAT,
    VIDEO,
    ARCHIVO
} from "../../../assets/icons/icons"


import {
    goTo
} from "../../redux/routing/actions"
import {
    isInLayout
} from "../../redux/screens/screenLayouts";

import {
    enAtencion as getEnAtencion
} from "../../redux/reservas/actions"

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";



export class pantallaNotificacionReservas extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.area = "body"
        this.idioma = "ES"
        this.item = []
        this.current = ""

    }

    static get styles() {
        return css `
        ${button}
        ${cardMascotaHorizontal}
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
        :host::-webkit-scrollbar {
            display: none;
        }
        button {
            position: relative;
            width: 95%;
            color: var(--color-negro);
            background-color:transparent;
            border-radius:0;
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);
        } 
        #tituloLista{
            padding-left:0.84rem;
            color:var(--color-azul-oscuro);
            font-size:var(--font-header-h2-size);
            font-weight:var(--font-header-h2-weight);
            background-color:var(--color-celeste-muy-claro);
            text-justify:left;
            display:flex;
            padding-bottom:.84rem;     
            align-items: flex-end;    
      
        }
        #grilla{
            position:relative;
            display:grid;
            align-content: flex-start;
            grid-gap:.5rem;
            overflow-x:none;
            overflow-y:auto;
        }
        #grilla::-webkit-scrollbar {
            display: none;
        }
        #cmhDivEtiqueta{
            width: 90%;
            justify-self:center;
        }

        #cchatDivEtiqueta{
            display: grid; 
            position: relative;
            height:20vh;
            width:100%;
            background-color:var(--color-blanco);
            grid-template-columns: 100%;
            grid-template-rows: 15% 35% 35% 15%;
            grid-gap:.1vh;
            border-radius:.4rem ;           
            
            box-shadow: var(--shadow-elevation-4-box);
            padding: .2vh 0 .2vh 0;
        }

        #cchatDivNombre{
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);            
            padding-left: .2rem;
            text-align: left;
            color: var(--color-gris);   
        }         

        #cchatDivFecha{
            font-size: var(--font-label-size);
            font-weight: var(--font-label-weight);            
            color: var(--color-gris);
            text-align: right;
            padding-right:.3rem;
        }

        #cchatFechaNombre{
            display:grid;
            grid-template-columns: 50% 50%;

        }
        #cchatDivDiagnostico{
            align-self: flex-end;
            font-size: var(--font-header-h2-size);         
            padding-bottom: .8rem;
            padding-left: .2rem;

        }

         #cchatDivTexto{
            font-weight: bold;   
            font-size: var(--font-header-h2-size);
            padding-bottom: .8rem;
            padding-left: .2rem;

         }

         #pregunta{
             z-index:100;
             background-color:  var(--color-celeste-muy-claro);;
             position:absolute;
             display:none;
             
             grid-gap:2vh;
             padding:1rem;
             top:10vh;
             height:50vh;
             left:5vw;
             right:5vw;
             border: solid 1px var(--color-gris);
             border-radius: 1rem;

         }
         #cchatAccion{
            display:grid;
            grid-template-columns: 50% 50%;
         }





        
    `
    }
    render() {
        return html `
            <div id="grilla">
                ${this.item.map(dato => html`
                   <div id="cchatDivEtiqueta" >
                        <div id="cchatFechaNombre">
                            <div id="cchatDivNombre">
                                ${dato.Reserva.Mascota.Nombre}
                            </div>
                            <div id="cchatDivFecha">
                                ${dato.Fecha.substring(8,10)+"/"+dato.Fecha.substring(5,7)+"/"+dato.Fecha.substring(0,4)}
                            </div>
                        </div>
                        <div id="cchatDivDiagnostico">
                            ${dato.Reserva.Motivo.substring(0,80)}
                        </div>                        

                        <div id="cchatDivTexto">
                            ${dato.Texto.substring(0,80)}
                        </div>
                        <div id="cchatAccion">
                            <div id="cmhDivVerDetalle">
                                <button id="verDetalle" btn2 .item=${dato} @click=${this.verDetalle} style="padding:0;text-align:left;font-size: var(--font-label-size);font-weight: var(--font-label-weight);">${idiomas[this.idioma].notificacionReservas.verDetalle}</button>                    
                            </div>
                            <div id="cmhDivVerDetalle">
                                <button id="btnNuevaPregunta" btn2 .item=${dato} @click=${this.verDetalle} style="padding:0;text-align:rigth;font-size: var(--font-label-size);font-weight: var(--font-label-weight);">Nueva Pregunta</button>                    
                            </div>
                        </div>
                        </div>
                    </div>
                    
                    `)}
                    
                    
            </div>

            <div id="pregunta">
                
                    <label style="background-color:white;color:black;padding:.5rem" id="textoPregunta"></label>
                
    
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

    verDetalle(e) {
        const textoPregunta = this.shadowRoot.querySelector("#textoPregunta")
        const nuevaPregunta = this.shadowRoot.querySelector("#nuevaPregunta")
        const pregunta = this.shadowRoot.querySelector("#pregunta")
        const grabar = this.shadowRoot.querySelector("#grabar")
        pregunta.style.display = "grid"
        textoPregunta.innerHTML = e.currentTarget.item.Texto
        if (e.currentTarget.id != "btnNuevaPregunta") {
            nuevaPregunta.style.display = "none"
            grabar.style.display = "none"
            pregunta.style.gridTemplateRows = "8fr 1f"
        } else {
            textoPregunta.style.display = "grid"
            nuevaPregunta.style.display = "grid"
            grabar.style.display = ""
            pregunta.style.gridTemplateRows = "4fr 4fr 1f"
        }

        this.update()


    }

    cancelar() {
        const pregunta = this.shadowRoot.querySelector("#pregunta")
        const textoPregunta = this.shadowRoot.querySelector("#textoPregunta")
        textoPregunta.innerHTML = ""
        pregunta.style.display = "none"
    }

    atencion(e) {
        store.dispatch(getEnAtencion({
            registro: e.currentTarget.item
        }))
        if (e.currentTarget.item.Atencion) {

            if (this.current == "mascotaver") {
                store.dispatch(goTo("diagnosticoDetallesM"))
            }
            if (this.current == "misConsultas") {
                store.dispatch(goTo("diagnosticoDetalles"))
            }

        } else {
            if (this.current == "mascotaver") {
                store.dispatch(goTo("videoMasocotaVer"))
            } else {
                store.dispatch(goTo("videoConsulta"))
            }

        }

    }
    verReserva(fecha) {




        let hoy = new Date();
        let atencion = new Date(fecha);
        return hoy.getTime() === atencion.getTime();

    }
    clickAtencion(e) {
        let arr = e.currentTarget.item;

    }

    clickConsulta(e) {

        if (this.current == "mascotaver") {
            store.dispatch(goTo("consultaMascota"))
        } else {
            store.dispatch(goTo("consulta"))
        }

    }

    formateoHora(hora) {
        let horaRetorno = "0000" + hora.toString()
        horaRetorno = horaRetorno.substring(horaRetorno.length - 4)
        return horaRetorno.substr(0, 2) + ":" + horaRetorno.substr(2, 2)

    }

    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size

            this.hidden = true
            const haveBodyArea = isInLayout(state, this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-notificacionReservas-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
                this.current = state.screen.name
                this.item = state.chat.entitySinContestar
            }
            this.update();
        }

    }
    firstUpdated() {}

    static get properties() {
        return {
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
            },
            current: {
                type: String
            }
        }
    }
}

window.customElements.define("pantalla-notificacionreservas", pantallaNotificacionReservas);