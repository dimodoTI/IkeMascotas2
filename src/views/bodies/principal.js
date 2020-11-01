/** @format */

import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { idiomas } from "../../redux/datos/idiomas";
import { label } from "../css/label";
import { button } from "../css/button";

/* import {
    btnFlotanteRedondo
} from "../css/btnFlotanteRedondo" */

import { flierPortadaComponente } from "../componentes/flierPortada";
import { marquesinaFijaComponente } from "../componentes/marquesinaFija";

import { marquesinaComponente } from "../componentes/marquesina";

import { goNext, goTo } from "../../redux/routing/actions";
import { isInLayout } from "../../redux/screens/screenLayouts";
import { showScreen } from "../../redux/screens/actions";

import { btnNuevaConsulta } from "../componentes/btnNuevaConsulta";

const RESERVA_TIMESTAMP = "reserva.timeStamp";
const CLIENTE_TIMESTAMP = "cliente.timestamp";
const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
export class pantallaPrincipal extends connect(store, MEDIA_CHANGE, SCREEN, RESERVA_TIMESTAMP, CLIENTE_TIMESTAMP)(LitElement) {
    constructor() {
        super();
        this.hidden = true;
        this.area = "body";
        this.idioma = "ES";
        this.hayReserva = "N";
    }

    static get styles() {
        return css`
            ${label}
            ${button}
 

   
        :host {
                position: relative;
                display: grid;
                padding: 0 !important;
                background-color: var(--color-gris-fondo) !important;
                overflow-x: hidden;
                overflow-y: auto;
            }
            :host([hidden]) {
                display: none;
            }
            .cuerpo {
                position: relative;
                display: grid;
                background-color: transparent;
                grid-template-columns: 60% 40%;
                grid-row-gap: 0.5rem;
                grid-column-gap: 0.2rem;
                align-items: center;
                justify-items: center;
                justify-content: center;
                overflow-x: hidden;
            }

            .cuerpo::-webkit-scrollbar {
                display: none;
            }

            :host(:not([media-size="small"])) .cuerpo {
                grid-template-rows: 1vh 40vh 7vh 25vh 1vh;
                grid-row-gap: 0.4rem;
            }

            #avisoConsulta {
                width: 95%;
                height: 2rem;
                grid-column-start: 1;
                grid-column-end: 3;
            }

            #flier {
                grid-column-start: 1;
                grid-column-end: 3;
                width: 95%;
            }
            :host(:not([media-size="small"])) #flier {
                width: 92%;
                grid-column-start: 1;
                grid-column-end: 1;
                height: 100%;
            }
            #marqFija {
                display: none;
                height: 100%;
                justify-self: left;
            }
            :host(:not([media-size="small"])) #marqFija {
                display: grid;
                width: 89%;
            }
            label,
            button {
                position: relative;
                width: 95%;
                color: var(--color-negro);
                background-color: transparent;
                border-radius: 0;
                font-size: var(--font-bajada-size);
                font-weight: var(--font-bajada-weight);
            }
            #carro {
                position: relative;
                display: grid;
                border-radius: 0.4rem;
                height: 8.5rem;
                width: 95vw;
                overflow-x: scroll;
                grid-column-start: 1;
                grid-column-end: 3;
            }
            #carro::-webkit-scrollbar {
                display: none;
            }
            :host(:not([media-size="small"])) #carro {
                grid-column-start: 1;
                grid-column-end: 1;
                width: 5vw;
                display: none;
            }
            #lbl-novedades {
                font-size: var(--font-header-h1-menos-family);
                font-weight: var(--font-header-h1-menos-weight);
                align-items: center;
                justify-items: left;
                grid-column-start: 1;
                grid-column-end: 3;
                margin-bottom: -0.8rem;
            }
            #carroNovedades {
                position: relative;
                display: grid;
                overflow-x: scroll;
                border-radius: 0.4rem;
                height: 9.5rem;
                width: 95vw;
                overflow-x: scroll;
                grid-column-start: 1;
                grid-column-end: 3;
            }
            #carroNovedades::-webkit-scrollbar {
                display: none;
            }
            :host(:not([media-size="small"])) #carroNovedades {
                width: 95%;
            }

            #divAyuda {
                display: grid;
                width: 100%;
                grid-gap: 0;
                justify-items: center;
                grid-column-start: 1;
                grid-column-end: 3;
            }
            :host(:not([media-size="small"])) #divAyuda {
                display: none;
            }
            .lblayuda {
                font-size: var(--font-header-h2-size);
                font-weight: var(--font-header-h2-weight);
                text-align: center;
            }
        `;
    }
    render() {
        return html`
            <div class="cuerpo">
                <div id="espacio" style="height:.5rem;width:1%;grid-column-start:1;grid-column-end:3;"></div>

                <!--             <btn-nueva-consulta id="avisoConsulta" media-size="${this.mediaSize}" style="padding-bottom:.5rem" @click="${this.video}">
                    </btn-nueva-consulta> -->

                <flierportada-componente id="flier" media-size="${this.mediaSize}" tipo="C"></flierportada-componente>

                <marquesinafija-componente id="marqFija" media-size="${this.mediaSize}" tipo="A" etiqueta-ancho="3rem"></marquesinafija-componente>

                <div id="carro">
                    <marquesina-componente id="marq" media-size="${this.mediaSize}" tipo="A" etiqueta-ancho="8rem"> </marquesina-componente>
                </div>

                <label id="lbl-novedades" style="margin-bottom:.35rem">${idiomas[this.idioma].principal.lblNovedades}</label>

                <div id="carroNovedades">
                    <marquesina-componente id="marqNovedades" media-size="${this.mediaSize}" tipo="B" etiqueta-ancho="${this.mediaSize == "small" ? "9rem" : "6.5rem"}"> </marquesina-componente>
                </div>

                <div id="divAyuda">
                    <label class="lblayuda">${idiomas[this.idioma].principal.lblAyuda01}</label>
                    <label class="lblayuda">${idiomas[this.idioma].principal.lblAyuda02}</label>
                    <button btn3 id="btn-ayuda" @click=${this.clickAyuda}>${idiomas[this.idioma].principal.btnAyuda}</button>
                </div>
                <div id="espacio" style="height:.5rem;width:1%;grid-column-start:1;grid-column-end:3;"></div>
            </div>
        `;
    }
    clickAyuda(e) {
        location.href = "tel:08001221453";
    }

    /*    clickBotonUsuario() {
           store.dispatch(modoPantalla("usuariodetalle", "principal"))
       }
       clickBotonNotificacion() {
           store.dispatch(modoPantalla("notificacion", "principal"))
       }
       clickConsulta() {
           store.dispatch(modoPantalla("video", "principal"))
       }
       clickAgenda() {
           store.dispatch(modoPantalla("plancontrata", "principal"))
       }
       clickAyuda() {
           store.dispatch(modoPantalla("vercobertura", "principal"))
       }
       clickBoton1() {
           store.dispatch(modoPantalla("iniciosesion", "principal"))
       }
       clickBoton2() {
           store.dispatch(modoPantalla("iniciosesion", "principal"))
       } */
    stateChanged(state, name) {
        if (name == SCREEN || name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.hidden = true;
            const haveBodyArea = isInLayout(state, this.area);
            const SeMuestraEnUnasDeEstasPantallas = "-principal-".indexOf("-" + state.screen.name + "-") != -1;
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false;
            }
            this.update();
        }

        if (name == RESERVA_TIMESTAMP) {
            let reserva = state.reserva.entities;
            if (reserva) {
                if (reserva[0].tiene == "S") {
                    this.hayReserva = "S";
                }
            }
            this.update();
        }
    }

    video() {
        store.dispatch(goTo("videoRTC"));
    }

    firstUpdated() {}

    static get properties() {
        return {
            hidden: {
                type: Boolean,
                reflect: true,
            },
            label: {
                type: String,
                reflect: false,
            },
            mediaSize: {
                type: String,
                reflect: true,
                attribute: "media-size",
            },
            layout: {
                type: String,
                reflect: true,
            },
            area: {
                type: String,
            },
        };
    }
}

window.customElements.define("pantalla-principal", pantallaPrincipal);
