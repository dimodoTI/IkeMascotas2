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
    ATRAS
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



const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";

const MASCOTASEDIT_TIMESTAMP = "mascotas.editTimeStamp"
export class headerMascota extends connect(store, MEDIA_CHANGE, SCREEN, MASCOTASEDIT_TIMESTAMP)(LitElement) {

    constructor() {
        super();
        this.idioma = "ES";
        this.hidden = true
        this.area = "body"
        this.item = []
        this.pagina = store.getState().screen.name
        this.titulo = ""
        this.subTitulo = ""
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
                display:flex;
                flex-flow: row;
                align-items: flex-end;
            }
            :host(:not([media-size="small"])) #divTitulo {
                justify-content: center;
            }
            #divImg{
                display:grid;
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

            display:grid;

           align-items:center

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

                    <label id="lblTitulo">${this.item.Nombre}</label>
                  
                </div>
                
            </div>
            <div>
                <label id="lblLeyenda">${this.subTitulo}</label>
            </div>
            `
    }


    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.current = state.screen.name
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = isInLayout(state, this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-mascotaver-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false

                this.subTitulo = idiomas[this.idioma][this.current].subTitulo
            }
            this.update();
        }
        if (name == MASCOTASEDIT_TIMESTAMP) {
            this.item = state.mascotas.entities.currentItem

            this.update()
        }
    }

    atras() {
        store.dispatch(goTo("mascota"))
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
            }
        }
    }
}


window.customElements.define("header-mascota", headerMascota);