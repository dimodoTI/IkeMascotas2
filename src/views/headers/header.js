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
    ATRAS,
    CAMPANA,
    CAMPANA_CONMARCA
} from "../../../assets/icons/icons";
import {
    idiomas
} from "../../redux/datos/idiomas"
import {
    isInLayout
} from "../../redux/screens/screenLayouts";
import {
    goNext,
    goPrev,
    goTo
} from "../../redux/routing/actions"

import {
    campanaNotificaciones
} from "../componentes/campanaNotificaciones"

import {
    headerMuestraTapa
} from "../../redux/ui/actions"

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
const RECIBIR_MENSAJETIMESTAMP = "ui.recibirMensajetimeStamp"
const HEADER_TAPA = "ui.headerMuestraTapa"
export class headerComponente extends connect(store, MEDIA_CHANGE, SCREEN, RECIBIR_MENSAJETIMESTAMP, HEADER_TAPA)(LitElement) {

    constructor() {
        super();
        this.idioma = "ES";
        this.hidden = true
        this.area = "body"
        this.item = []
        this.pagina = store.getState().screen.name
        this.current = "principal"
        this.titulo = ""
        this.subTitulo = ""
        this.mensaje = false
    }


    static get styles() {
        return css `
        
            :host{
                position: relative;
                display:grid;
                grid-template-rows: 50% 50%;
                background-color: transparent;
            }

            :host([hidden]){
                display:none ;
            }
            #divTitulo{            
                position:relative;        
                height: 50%;
                display:flex;
                flex-flow: row;
                align-self: end;
            }
            :host(:not([media-size="small"])) #divTitulo {
                justify-content: center;
            }
/*             #divImg{
                display:none;
                padding-right: .4rem;
                align-self: end;
            }
            #divImg svg{
                height: 1.5rem;
                width: 1.5rem;
            } */


            #divImg{
                display:none;
                padding-right: .4rem;
                align-self: end;
            }
            #divImg svg{
                height: 1.5rem;
                width: 1.5rem;
            }


     

            :host([current="recuperaclave"]) #divImg, 
            :host([current="crearclave"]) #divImg, 
            :host([current="usuarioregistro"]) #divImg,
            :host([current="usuariodetalle"]) #divImg, 
            :host([current="mascotaalta"]) #divImg, 
            :host([current="mascotaeditar"]) #divImg,  
            :host([current="consulta"]) #divImg, 
            :host([current="consultaTurnos"]) #divImg, 
            :host([current="diagnosticoDetalles"]) #divImg, 
            :host([current="diagnosticoDetallesM"]) #divImg ,
            :host([current="vacuna"]) #divImg ,
            :host([current="vacunaMascota"]) #divImg ,
            :host([current="consultaMascota"]) #divImg ,
            :host([current="consultaTurnosMascota"]) #divImg ,
            :host([current="notificacionReservas"]) #divImg,
            :host([current="chatAppM"]) #divImg,
            :host([current="chatAppR"]) #divImg
            
            {
                display:grid;
            }
/*             #lblTitulo{               
                background-color: transparent;
                display: flex;
                align-items:center; 
                justify-content:left;
                text-align: left;
                font-size: var(--font-header-h1-size);
                font-weight: var(--font-header-h1-weight);

            } */


            #divTitulo{        
                position:relative;            
                height: 50%;
                display:flex;
                flex-flow: row;
                align-self: end;
            }

            :host(:not([media-size="small"])) #divTitulo {
                justify-content: center;
            }

            #lblLeyenda{           
                display: flex;
                justify-content:left;
                text-align: left;
                font-size:var(--font-bajada-size);
                font-weight: var(--font-bajada-weight);
            }
            :host(:not([media-size="small"])) #lblLeyenda {
                justify-content: center;
            }



        :host([current="mascotaeditar"]) #campana,  
            :host([current="consulta"]) #campana, 
             
            :host([current="diagnosticoDetalles"]) #campana, 
            :host([current="mascota"]) #campana, 
            :host([current="mascotaVer"]) #campana, 
            :host([current="vacuna"]) #campana ,
            :host([current="vacunaMascota"]) #campana ,
            :host([current="consultaMascota"]) #campana ,
            :host([current="chatApp"]) #campana ,
            :host([current=misConsultas]) #campana
            {
                display:grid;
            }

   
  
            #campana{
            position:absolute;
            display:none;
            align-items:center;
            top:0;
            right:0;
            width:6vh;
            height:6vh
            
           

        }

        #divTapa{
                position:absolute;
                display: none;
                top:0;
                left:0;
                bottom: 0;
                right: 0;        
                z-index:1020;            
                background-color: var(--color-gris);
                opacity:.4;
            }

            :host([header-muestra-tapa]) #divTapa{
                display: grid;           
            }



        `
    }

    render() {
        return html `
            <div id="divTitulo">
                <div id="divImg" @click=${this.atras}>
                     ${ATRAS}
                </div>
                <div id="divTxt">
                    <label id="lblTitulo">${this.titulo}</label>
                    

                </div>
              
            </div>
            <div>
                <label id="lblLeyenda">${this.subTitulo}</label>
            </div>
            <div id="divTapa"></div>
            <campana-notificaciones id="campana"></campana-notificaciones>
            `
    }

    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE || name == HEADER_TAPA)) {
            this.headerMuestraTapa = state.ui.headerMuestraTapa
            this.current = state.screen.name
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = isInLayout(state, this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-inicioSesion-accesoplan-recuperaclave-usuarioregistro-mascota-mascotaalta-mascotaeditar-calendario-vacuna-vacunaMascota-usuariodetalle-crearclave-misConsultas-consulta-consultaMascota-videos-consultaTurnos-consultaTurnosMascota-diagnosticoDetalles-diagnosticoDetallesM-notificacionReservas-chatApp-chatAppM-chatAppR-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
                this.titulo = idiomas[this.idioma][this.current].titulo
                this.subTitulo = idiomas[this.idioma][this.current].subTitulo
            }

            this.update();
        }

        if (name == RECIBIR_MENSAJETIMESTAMP) {
            this.mensaje = true
            this.update()
        }
    }

    atras() {
        switch (this.current) {
            case "videos":
                store.dispatch(goTo("agendas"))
                break;
            case "usuarioregistro":
                store.dispatch(goTo("accesoplan"))
                break;
            case "mascotaver":
                store.dispatch(goTo("mascota"))
                break;
            case "usuariodetalle":
                store.dispatch(goTo("principal"))
                break;
            case "notificacionReservas":
                store.dispatch(goTo("principal"))
                break;
            case "chatAppM":
                store.dispatch(goTo("mascotaver"))
                break;
            case "chatAppR":
                store.dispatch(goTo("misConsultas"))
                break;
                /*             case "mascotaalta":
                                store.dispatch(goPrev())
                                break;
                            case "consulta":
                                store.dispatch(goPrev())
                                break;
                            case "consultaTurnos":
                                store.dispatch(goPrev())
                                break;
                            case "diagnosticoDetalle":
                                store.dispatch() */
            case "vacunaMascota": {
                store.dispatch(goTo("mascotaver"));
                break;
            }
            default:
                store.dispatch(goPrev())
                break;

        }
    }
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
                type: String,
                reflect: true,
            },
            mensaje: {
                type: Boolean,
                reflect: true,
            },
            headerMuestraTapa: {
                type: Boolean,
                reflect: true,
                attribute: 'header-muestra-tapa'
            }
        }
    }
}


window.customElements.define("header-componente", headerComponente);