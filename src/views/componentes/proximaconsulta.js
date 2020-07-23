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

export class proximaConsulta extends connect(store)(LitElement) {

    constructor() {
        super();
        this.idioma = "ES";
        this.item = []


    }


    static get styles() {
        return css`
        
            :host(){
               
               display:grid;
               justify-self:center;
            }

            .contenedor{   
                width: 88%;
                display:grid;
                grid-auto-flow:column;
                background-color: var(--color-azul-oscuro);
                border-radius:.3rem;
                padding:1rem;
                justify-self:center;
                justify-content:space-between;
                font-size:.9rem;
                color:#fff;
                padding:.84rem;
                }

            .consulta{
                color:#fff;
                position: absolute;
                top: 1rem;
                justify-content:left;
                text-align: left;
                font-size:.9rem;

            }
            .ingresar{
                text-decoration:underline;
                cursor:pointer;
            }

        `
    }

    render() {
        return html`
            <div id="header" class="contenedor">
                <div style="display:grid">
                    <label>${idiomas[this.idioma].misconsultas.consulta}</label>
                </div>
                <div class="ingresar">
                ${idiomas[this.idioma].misconsultas.ingresar}
                </div>

            </div>`
    }

    stateChanged(state, name) {

    }

    static get properties() {
        return {
            tituloHeader: {
                type: String,
                reflect: true,
                attribute: 'titulo-header'
            },
            leyendaHeader: {
                type: String,
                reflect: true,
                attribute: 'leyenda-header'

            }

        }
    }
}


window.customElements.define("proxima-consulta", proximaConsulta);