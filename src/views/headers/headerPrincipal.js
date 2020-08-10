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
    CAMPANA,
    CAMPANA_CONMARCA,
    FLECHA_ABAJO
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
    limpiarFoto
} from "../../redux/fotos/actions";
import {
    sinContestar
} from "../../redux/chat/actions";




const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
const CLIENTE_TIMESTAMP = "cliente.timestamp"
const RECIBIR_MENSAJETIMESTAMP = "ui.recibirMensajetimeStamp"
const SIN_CONTESTAR_TIMESTAMP = "chat.sinContestarTimeStamp"
const SIN_CONTESTAR_ERRORTIMESTAMP = "chat.sinContestarErrorTimeStamp"
export class headerPrincipal extends connect(store, MEDIA_CHANGE, SCREEN, CLIENTE_TIMESTAMP, RECIBIR_MENSAJETIMESTAMP, SIN_CONTESTAR_TIMESTAMP, SIN_CONTESTAR_ERRORTIMESTAMP)(LitElement) {

    constructor() {
        super();
        this.idioma = "ES";
        this.hidden = true
        this.area = "body"
        this.item = []
        this.pagina = store.getState().screen.name
        this.titulo = ""
        this.subTitulo = ""
        this.mensaje = false
    }


    static get styles() {
        return css `
        
            :host(){
                position: relative;
                display:grid;
                height: 100%;
                width: 100%;
                display:grid;
                grid-template-rows: 50% 50%;
                background-color: transparent;
            }
            :host([hidden]){
                display:none ;
            }
            #divTitulo{                    
                height: 50%;
                display:grid;
                grid-template-columns:90% 10%

            }
            :host(:not([media-size="small"])) #divTitulo {
                justify-content: center;
            }
            #divImg{
                display:none;
                padding-right: .4rem;
                align-self: flex-end;
            }
            #divImg svg{
                height: 1.5rem;
                width: 1.5rem;
            }
  
            #lblTitulo{               
                background-color: transparent;
                display: flex;
                align-items:center; 
                justify-content:left;
                text-align: left;
                font-size: var(--font-header-h1-size);
                font-weight: var(--font-header-h1-weight);

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
            #detalle{
            height: 90%;
            width: 2rem;
            background-image: var(--icon-flecha-abajo-sin-bordes);
            background-color: transparent;
            background-repeat: no-repeat;
            background-position: left bottom;
            background-size: 1rem 1rem;
            opacity:.4;
        }

  
        

       
        #campana{
            position:relative;
            display:grid;
           align-items:center

        }
        #divTxt{
            display:grid;
            grid-template-columns: auto 1fr;
            align-items: center;
        }
        .flecha{
            display:grid;
            align-items: flex-end;
        }
        
        .flecha svg{
            width:1rem;
            height:1rem;
        }
        `
    }

    render() {
        return html `
            <div id="divTitulo">
                <div id="divTxt">
                    <label id="lblTitulo">${this.titulo+" "+ store.getState().cliente.datos.nombre}</label>
                    <div class="flecha" @click=${this.clickBotonUsuario} style="display:${store.getState().cliente.logueado?"":"none"}">${FLECHA_ABAJO}</div>
                </div>
                <div id="campana"  @click=${this. notificaciones}>${this.mensaje?CAMPANA_CONMARCA:CAMPANA}</div>
            </div>
            <div>
                <label id="lblLeyenda">${this.subTitulo}</label>
            </div>
            
            `
    }

    notificaciones(e) {
        store.dispatch(sinContestar(store.getState().cliente.datos.id))

    }

    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.current = state.screen.name
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = isInLayout(state, this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-principal-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
                this.titulo = idiomas[this.idioma][this.current].titulo
                this.subTitulo = idiomas[this.idioma][this.current].subTitulo
            }
            this.update();
        }
        if (name == CLIENTE_TIMESTAMP) {
            this.update()
        }
        if (name == RECIBIR_MENSAJETIMESTAMP) {
            this.mensaje = true
            this.update()
        }
        if (name == SIN_CONTESTAR_TIMESTAMP) {
            store.dispatch(goTo("notificacionReservas"))
        }
    }

    clickBotonUsuario() {
        store.dispatch(limpiarFoto())
        store.dispatch(goTo("usuariodetalle"))
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
            }
        }
    }
}


window.customElements.define("header-principal", headerPrincipal);