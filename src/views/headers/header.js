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
export class headerComponente extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {

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
                display:none;
                padding-right: .4rem;
                align-self: flex-end;
            }
            #divImg svg{
                height: 1.5rem;
                width: 1.5rem;
            }
            :host([current="recuperaClave"]) #divImg, :host([current="crearClave"]) #divImg, :host([current="videos"]) #divImg, :host([current="diagnosticosDetalle"]) #divImg,  :host([current="atencionesMascotas"]) #divImg, :host([current="listaReservas"]) #divImg, :host([current="igualDiagnosticosDetalle"]) #divImg {
                display:grid;
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
            `
    }

    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.current = state.screen.name
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = isInLayout(state, this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-inicioSesion-recuperaClave-crearClave-principal-misConsultas-agendas-videos-diagnosticos-diagnosticosDetalle-atencionesMascotas-listaReservas-igualDiagnosticosDetalle-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
                this.titulo = idiomas[this.idioma][this.current].titulo
                this.subTitulo = idiomas[this.idioma][this.current].subTitulo
            }
            this.update();
        }
    }

    atras() {
        switch (this.current) {
            case "videos":
                store.dispatch(goTo("agendas"))
                break
            case "diagnosticosDetalle":
                store.dispatch(goTo("agendas"))
                break
            case "igualDiagnosticosDetalle":
                store.dispatch(goTo("listaReservas"))
                break
            case "atencionesMascotas":
                store.dispatch(goTo("misConsultas"))
                break
            case "listaReservas":
                store.dispatch(goTo("atencionesMascotas"))
                break
            default:
                store.dispatch(goTo("inicioSesion"))
                break
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
            }
        }
    }
}


window.customElements.define("header-componente", headerComponente);