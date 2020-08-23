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
    enAtencion as getEnAtencion,
    reservaParaChat
} from "../../redux/reservas/actions"

import {
    chatReserva,
    patch as patchChat
} from "../../redux/chat/actions"

import {
    headerMuestraTapa
} from "../../redux/ui/actions"

import {
    leido,

    getNotificacionChatPendientes
} from "../../redux/notificacion/actions"

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";

const LEIDO_TIMESTAMP = "notificacion.updateTimeStamp"


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

        
        #cchatDivContenedorEtiqueta{
            display: grid; 
            position: relative;
            height:20vh;
            
            border-radius:.4rem ;           
            grid-template-columns:4% 96%;
            box-shadow: var(--shadow-elevation-4-box);
            width: 97%;
            background-color:var(--color-blanco);
            padding: 0;
            margin-left: .3rem;
        }

        #tipoNotificacion{
            
            border-radius:.4rem 0 0 .4rem; 
            padding:0
        }

        #tipoNotificacion[tipo="0"]{
            background-color:var(--color-gris)
        }

        #tipoNotificacion[tipo="1"]{
            background-color:var(--color-verde)
        }

        #tipoNotificacion[tipo="2"]{
            background-color:var(--color-celeste)
        }       



        #cchatDivEtiqueta{
            display: grid; 
            position: relative;
            border-radius: 0 .4rem .4rem 0;
            background-color:var(--color-blanco);
            padding-left:   2vw;
            
            grid-template-rows: 15% 35% 35% 15%;
            grid-gap:.1vh;

        }
      

        #cchatDivNombre{
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);            
            padding-left: .2rem;
            text-align: left;
            color: var(--color-azul);   
        }         

         #cchatDivNombre[tipo=0]{
            color: var(--color-rojo); 
        } 

    

        #cchatDivFecha{
            font-size: var(--font-label-size);
            font-weight: var(--font-label-weight);            
            color: var(--color-gris-oscuro);
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

            
         #pregunta, #notificacion{
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
             border: solid 1px var(--color-gris-oscuro);
             border-radius: .5rem;
             box-shadow: var(--shadow-elevation-4-box);
         }

         #cchatAccion{
            display:grid;
            grid-template-columns: 1fr 1fr 1fr ;
            font-size:var(--font-label-size);
            font-weight:var(--font-label-weight);
            color: var(--color-azul-oscuro);
         }

         

         #cchatDivVerDetalle{
            padding-left: .5rem;
            text-align:left;
         }

         


         #cchatLblVerDetalle{
            justify-self:left;
            text-decoration: underline;
            cursor:pointer;
            color:var(--color-celeste);
            font-size: var(--font-label-size);
            font-weight: bold;
         }

         #cchatLblNuevaPregunta{
            justify-self:center;
            text-decoration: underline;
            cursor:pointer;
         }

         #cchatLblNuevaPregunta[tipo="0"] {
            display:none;
         }

         #cchatLblElimar{
            justify-self: right;
            text-decoration: underline;
            cursor:pointer;
         }

         #nuevaPregunta{
            padding:.5rem;
            font-family:var(--font-label-family);
            font-size:var(--font-label-size);
            font-weight:var(--font-label-weight);
         }

    `

    }
    render() {
        return html `
            <div id="grilla">
                ${this.item.map(dato => this.renderGrilla(dato))}                  
            </div>

            <div id="pregunta">
                <textarea id="nuevaPregunta" placeholder="Escriba su pregunta">
                </textarea>
                <div style="grid-gap:.3rem;display:grid;grid-template-columns:50% 50%">
                    <button style="height:7vh" id="grabar" btn1 @click="${this.grabar}" >Grabar</button>
                    <button  id="cancelar" btn3 style="color:red;height:7vh" @click="${this.cancelar}">Cancelar</button>
                </div>  
            </div>

            <div id="notificacion">
                <div id="tituloNotificacion">
                </div>
                <textarea id="cuerpo" readonly >
                </textarea>
                <div id="linkNotificacion"  @click="${this.irLink}" style="font-size:var(--font-label-size)"></div>
                <div style="grid-gap:.3rem;display:grid;grid-template-columns:50% 50%">
                    <button style="height:7vh" id="leer"  btn1 @click="${this.leer}" >Leer</button>
                    <button  id="cancelar" btn3 style="color:red;height:7vh" @click="${this.cancelar}">Cancelar</button>
                </div>  
            </div>
                    
        `
    }


    renderGrilla(dato) {
        if (dato.tipo == 0 || dato.tipo == 1) {
            return html `
                 <div id="cchatDivContenedorEtiqueta">
                    <div id="tipoNotificacion" tipo=${dato.tipo}>
                    </div>
                    <div id="cchatDivEtiqueta">
                        <div id="cchatFechaNombre">
                            <div id="cchatDivNombre" tipo=${dato.tipo}>
                                ${dato.item.mascota}
                            </div>
                            <div id="cchatDivFecha">
                                ${this.formateoFecha(dato.fecha)}
                            </div>
                        </div>
                        <div id="cchatDivDiagnostico">
                            ${dato.item.motivo.substring(0,80)}
                        </div>                        

                        <div id="cchatDivTexto">
                            ${dato.item.texto.substring(0,80)}
                        </div>
                        <div id="cchatAccion">
                            <div id="cmhDivVerDetalle" style="justify-self:left;padding-left:.3rem" .item="${dato}" @click="${this.verDetalle}">
                                <label id="cchatLblVerDetalle">${idiomas[this.idioma].notificacionReservas.verDetalle}</label>            
                            </div>
                            <div id="cmhDivNuevaPregunta"  style="justify-self:center" >
                                <label id="cchatLblNuevaPregunta" @click="${this.preguntar}" tipo="${dato.tipo}">${idiomas[this.idioma].notificacionReservas.nuevaPregunta}</label>                          
                            </div>
                            <div id="cmhDivEliminar" style="justify-self:right;padding-right:.3rem">
                                <!-- <label id="cchatLblElimar">${idiomas[this.idioma].notificacionReservas.eliminar}</label> -->
                            </div>

                        </div>
                    </div>
                </div>      
            </div>`

        } else {
            return html `
                <div id="cchatDivContenedorEtiqueta">    
                    <div id="tipoNotificacion" tipo=${dato.tipo}>
                    </div>
                    <div id="cchatDivEtiqueta">
                        <div id="cchatFechaNombre">
                            <div id="cchatDivNombre" tipo=${dato.tipo}>
                            </div>
                            <div id="cchatDivFecha">
                                ${this.formateoFecha(dato.fecha)}
                            </div>
                        </div>
                        <div id="cchatDivDiagnostico">
                            ${dato.item.titulo.substring(0,80)}
                        </div> 
                        <div id="cchatDivTexto">
                            ${dato.item.texto.substring(0,80)}
                        </div>
                        <div id="cchatAccion">
                            <div id="cmhDivVerDetalle" style="justify-self:left;padding-left:.3rem" .item="${dato}" @click="${this.verNotificacion}">
                                <label id="cchatLblVerDetalle">${idiomas[this.idioma].notificacionReservas.verDetalle}</label>            
                            </div>
                            <label id="cnotiLblLink">${dato.item.link}</label>
                        </div>

                    </div>
                </div>
            `

        }


    }

    formateoFecha(fecha) {
        return fecha.substring(8, 10) + "/" + fecha.substring(5, 7) + "/" + fecha.substring(0, 4)
    }

    verDetalle(e) {
        store.dispatch(chatReserva(e.currentTarget.item.item.reservaId))
        if (e.currentTarget.item.tipo == 1) {
            const datosPatch = [{
                "op": "replace",
                "path": "/Leido",
                "value": (new Date()).getTime()
            }]
            store.dispatch(patchChat(e.currentTarget.item.Id, datosPatch, store.getState().cliente.datos.token))
        }
        this.update()
    }


    preguntar(e) {
        store.dispatch(headerMuestraTapa(true))
        const nuevaPregunta = this.shadowRoot.querySelector("#nuevaPregunta")
        nuevaPregunta.value = ""
        const pregunta = this.shadowRoot.querySelector("#pregunta")
        pregunta.style.display = "grid"
        this.update()
    }

    verNotificacion(e) {
        store.dispatch(headerMuestraTapa(true))
        const notificacion = this.shadowRoot.querySelector("#notificacion")
        const tituloNotificacion = this.shadowRoot.querySelector("#tituloNotificacion")
        const cuerpo = this.shadowRoot.querySelector("#cuerpo")
        const link = this.shadowRoot.querySelector("#linkNotificacion")
        const leer = this.shadowRoot.querySelector("#leer")
        cuerpo.value = e.currentTarget.item.item.texto
        tituloNotificacion.innerHTML = e.currentTarget.item.item.titulo
        link.innerHTML = e.currentTarget.item.item.link
        link.link = e.currentTarget.item.item.link
        leer.value = e.currentTarget.item.item.detalleId
        notificacion.style.display = "grid"
        this.update()
    }

    irLink(e) {
        window.open(e.currentTarget.link)
    }

    leer(e) {
        store.dispatch(headerMuestraTapa(false))
        store.dispatch(leido(e.currentTarget.value, null, store.getState().cliente.datos.token))
        const notificacion = this.shadowRoot.querySelector("#notificacion")
        notificacion.style.display = "none"

        this.update()
    }

    cancelar(e) {
        store.dispatch(headerMuestraTapa(false))
        const pregunta = this.shadowRoot.querySelector("#pregunta")
        const notificacion = this.shadowRoot.querySelector("#notificacion")
        pregunta.style.display = "none"
        notificacion.style.display = "none"
        this.update()
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
                //this.item = state.chat.entitySinContestar
                this.item = state.notificacion.entityNotificacionChatPendiente
            }

            this.update();
        }

        /*         <div id="cnotiDivEtiqueta" >
                <div id="cnotiBarra" fondo=${dato.tipo == 0 ? 'gris' : 'celeste'}>
                </div>
                <div id= "cnotiContenido">
                    <div id="cnotiDivFecha">
                        ${dato.fecha.substring(8, 10) + "/" + dato.fecha.substring(5, 7) + "/" + dato.fecha.substring(0, 4)}
                    </div>
                    <div id="cnotiDivTitulo">
                        ${dato.item.titulo.substring(0, 80)}
                    </div>                        
                    <div id="cnotiDivTexto">
                        ${dato.item.texto.substring(0, 80)}
                    </div>
                    <div id="cnotiDivVerDetalle">
                        <label id="cnotiLblLink" @click=${this.verAtencion} .item=${dato}>${dato.item.link}</label>                 
                    </div>
                </div>

            </div> */

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
            },
            tipo: {
                type: String,
                reflect: true
            }
        }
    }
}

window.customElements.define("pantalla-notificacionreservas", pantallaNotificacionReservas);