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
    label
} from "../css/label"
import {
    repeat
} from 'lit-html/directives/repeat.js';
import {
    idiomas
} from "../../redux/datos/idiomas"



const PUBLICIDAD_TIMESTAMP = "publicacion.timeStamp"
export class marquesinaFijaComponente extends connect(store, PUBLICIDAD_TIMESTAMP)(LitElement) {
    constructor() {
        super();
        this.item = []
        this.mediaSize = ""
        this.tipo = "A"
        this.idioma = "ES"
        this.etiquetaAncho = "8rem"
    }

    static get styles() {
        return css `
        ${label}
        :host{
            position: relative;
            display: grid; 
            grid-auto-flow: column;
            background-color: transparent;
            grid-template-rows: 48% 48%;
            grid-template-columns: 50% 50%;
            grid-gap:.6rem;
            height:100%;
            width:auto;
        }
        #cuerpo-marq{
            position: relative;
            display: grid;
            height: 100%;
            width: 100%;
            background-color: var(--color-celeste);
            align-items:center; 
            justify-content:center;
            grid-template-columns:100%;
            grid-gap:0;
            border-radius:.4rem;
            overflow:hidden;
            cursor:pointer;
        }
        .cuerpo-marq-combinado{
             grid-template-rows: 70% 30%;
        }
        :host(:not([media-size="small"])) .cuerpo-marq-combinado{
             grid-template-rows: 65% 35%;
        } 
        .cuerpo-marq-uno{
            grid-template-rows: 100%;
            background-color:transparent !important;
        }
        .img-marq-dos{
            height: 100%;
            width: 100%;
            display: grid;
            align-items:center; 
            justify-content:center;
        }
        .img-marq-dos img{
            height: 100%; 
            width: auto;
            justify-self: center;
            object-fit:contain

       }
        .img-marq-solo{
            height: 100%;
            width: 100%;
            display: grid;
            align-items:center; 
            justify-content:center;
        }
        .img-marq-solo img{
            justify-self: center;
            height: 100%;
            width: 100%;
            object-fit: contain;
            border-radius:.4rem;
        }
        #lbl-marq{
            position: relative;
            align-items:center; 
            justify-content:center;
            text-align: center;
            font-size: var(--font-header-h2-size);
            font-weight: var(--font-header-h2-weight);
            color:var(--color-blanco);
        }
        `
    }
    render() {
        if (this.item) {
            return this.item.map((dato)=>{
                const tit =  idiomas[this.idioma].publicidad.marquesina[dato.Titulo]?idiomas[this.idioma].publicidad.marquesina[dato.Titulo].lbl:""
                return html `
                  <div id="cuerpo-marq" class="${tit != ''? 'cuerpo-marq-combinado' : 'cuerpo-marq-uno'}"  style="background-color:var(${dato.Color});" .item="${dato}" @click="${this.link}">
                      <div class="${tit != '' ? 'img-marq-dos' : 'img-marq-solo'}">
                        <img  style="content:url('${dato.Imagen}')"/>
                      </div>
                      <label id="lbl-marq" >${tit}</label>
                  </div>`

            })
            
        }
    }
    stateChanged(state, name) {
        if (name == PUBLICIDAD_TIMESTAMP) {
            this.item = state.publicacion.entities.filter(item => {
                return item.Tipo == this.tipo
            });
            this.update();
        }
    }

    link(e) {
        if (e.currentTarget.item.Http != "") {
            window.open(e.currentTarget.item.Http)
        }
    }

    static get properties() {
        return {
            tipo: {
                type: String,
                reflect: false
            },
            mediaSize: {
                type: String,
                reflect: true,
                attribute: 'media-size'
            },
            etiquetaAncho: {
                type: String,
                reflect: true,
                attribute: 'etiqueta-ancho'
            }
        }
    }
}

window.customElements.define("marquesinafija-componente", marquesinaFijaComponente);