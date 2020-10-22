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
    repeat
} from 'lit-html/directives/repeat.js';


import {
    idiomas
} from "../../redux/datos/idiomas"

import {
    button
} from "../css/button";

import {
    get as getPublicaciones
} from "../../redux/publicacion/actions"
import {
    goNext,
    goTo
} from "../../redux/routing/actions"
import {
    isInLayout
} from "../../redux/screens/screenLayouts";
import {
    showScreen
} from "../../redux/screens/actions";


const PUBLICACIONES_TIMESTAMP = "publicacion.timeStamp"
const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp"
export class pantallaOnboarding extends connect(store, SCREEN, MEDIA_CHANGE, PUBLICACIONES_TIMESTAMP)(LitElement) {
    constructor() {
        super();
        this.hidden = true
        this.area = "body"
        this.idioma = "ES"
        this.lineaActual = 0;
        this.lineas = [{
            Id: 0,
            Tipo: "D",
            Imagen: "",
            Titulo: "",
            Leyenda: "",
            BtnCaption: "",
            Color: "",
            Http: "",
            Orden: 0
        }];
    }

    static get styles() {
        return css `
        ${button}        
        :host{
            position: relative;
            display:grid;
            grid-template-rows:4.5fr 5.5fr;
            top: 0rem;
            left: 0rem;  
            height:100%;
            width: 100%;
            background-color:var(--color-gris-claro);
            
        }
        :host([hidden]){
            display:none ;
        }

        #cuerpo{
            position: relative;
            display:grid;
            height: 100%;
            width: 100%;
            background-color: transparent;
            justify-items:center;
            align-items:center; 
            text-align:center;
        }

        #header{
            position: relative;
            height: 100%;
            width: 100%;
            background-color: transparent;
            background-image:var(--imagen-fondo-onboarding);
            background-repeat: no-repeat;
            background-position: bottom;
            background-size: cover;
        }

        #flecha-izq{
            position: absolute;
            top: 0px;
            left: 0px;
            height: 40%;
            width: 5%;
            background-color: transparent;
            background-image:var(--imagen-flecha-izq);
            background-repeat: no-repeat;
            background-position: right top;
            background-size: fixed;
            cursor:pointer;
            z-index:10;
        }
        #flecha-der{
            position: absolute;
            top: 0px;
            right: 0px;
            height: 40%;
            width: 5%;
            background-color: transparent;
            background-image:var(--imagen-flecha-der);
            background-repeat: no-repeat;
            background-position: let top;
            background-size: fixed;
            cursor:pointer;
            z-index:10;
        }
        #titulo{
            position: relative;
            display: flex;
            width:80%;
            height:3rem;
            background-color: transparent;
            justify-content:center;
            align-items:center; 
            font-size: var(--font-header-h1-size);
            font-weight: var(--font-header-h1-weight);
            text-align: center;
        }
        :host([media-size="medium"]) #titulo{
            width:16rem;
        }
        :host([media-size="large"]) #titulo{
            width:16rem;
        }
        #leyenda{
            position: relative;
            width:80%;
            background-color: transparent;
            font-size: var(--font-header-h2-size);
            font-weight: var(--font-header-h2-weight);
        }
        :host([media-size="medium"]) #leyenda{
            width:16rem;
        }
        :host([media-size="large"]) #leyenda{
            width:16rem;
        }
        #puntos{
            position: relative;
            display: flex;
            background-color: transparent;     
            height:2rem;
        }
        #btn-siguiente{
            position: relative;
            height: 2rem;
            width: 80%;
        }
        :host([media-size="medium"]) #btn-siguiente{
            width:12rem;
        }
        :host([media-size="large"]) #btn-siguiente{
            width:12rem;
        }
        #btn-cuenta{
            position: relative;
            height: 2rem;
            width: 80%;
        }
        .puntoLLeno{
            height: 100%;
            width: 1.5rem;           
            position: relative;
            background-color: transparent;
            background-image:var(--imagen-punto-lleno);
            background-repeat: no-repeat;
            background-position: center;
            background-size: 1rem;  
        }
        .puntoVacio{
            height: 100%;
            width: 1.5rem;  
            position: relative;
            background-color: transparent;
            background-image:var(--imagen-punto-vacio);
            background-repeat: no-repeat;
            background-position: center;
            background-size: 1rem;  
        }
        `
    }

    render() {
        if (this.lineas.length > 0) {
            return html `
            <div id="header">
            </div>
            <div id="cuerpo">
                <div id="flecha-izq" @click="${this.atras}">
                </div>
                <div id="flecha-der" @click="${this.adelante}">
                </div>
                <div id="titulo">
                ${this.lineas[this.lineaActual].Titulo}
                </div>
                <div id="leyenda">
                ${this.lineas[this.lineaActual].Leyenda}
                </div>
                <div id="puntos">
                ${repeat(this.lineas, (item) => item.Titulo, (item, index) => html`
                    <div id="punto${index}" class="${index == 0 ? 'puntoLLeno' : 'puntoVacio'}">
                    </div>
                `)}
                </div>
                <button id="btn-siguiente" btn1 @click=${this.clickBoton1}>
                ${idiomas[this.idioma].onboarding.btn1}
                </button>
                <button id="btn-cuenta" btn2 @click=${this.clickBoton2}>
                ${idiomas[this.idioma].onboarding.btn2}
                </button>
            </div>
            `
        }
    }
    stateChanged(state, name) {

        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            const haveBodyArea = state.screen.layouts[this.mediaSize].areas.find(a => a == this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-onboarding-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false
                store.dispatch(getPublicaciones({orderby:"tipo,orden"}))
            }
            this.update();
        }

        if (name == PUBLICACIONES_TIMESTAMP) {
            this.lineas = state.publicacion.entities.filter(reg => reg.Tipo == "D").sort((a, b) => a.Orden - b.Orden)
            this.update()
        }
    }
    firstUpdated() {
        this.shadowRoot.querySelector("#flecha-izq").hidden = true
        if (this.lineas.length == 1) {
            this.shadowRoot.querySelector("#flecha-der").hidden = true
        }
    }
    adelante() {
        if (this.lineaActual + 1 < this.lineas.length) {
            this.shadowRoot.querySelector("#flecha-izq").hidden = false
            this.shadowRoot.querySelector("#punto" + this.lineaActual).classList.add("puntoVacio");
            this.shadowRoot.querySelector("#punto" + this.lineaActual).classList.remove("puntoLLeno");
            this.lineaActual = this.lineaActual + 1;
            this.shadowRoot.querySelector("#punto" + this.lineaActual).classList.add("puntoLLeno");
            this.shadowRoot.querySelector("#punto" + this.lineaActual).classList.remove("puntoVacio");
            this.shadowRoot.querySelector("#titulo").innerHTML = this.lineas[this.lineaActual].Titulo
            this.shadowRoot.querySelector("#leyenda").innerHTML = this.lineas[this.lineaActual].Leyenda
            if (this.lineaActual + 1 == this.lineas.length) {
                this.shadowRoot.querySelector("#flecha-der").hidden = true
                this.shadowRoot.querySelector("#btn-siguiente").innerText = idiomas[this.idioma].onboarding.btn3
            }
        }
    }
    atras() {
        if (this.lineaActual > 0) {
            this.shadowRoot.querySelector("#flecha-der").hidden = false
            this.shadowRoot.querySelector("#punto" + this.lineaActual).classList.add("puntoVacio");
            this.shadowRoot.querySelector("#punto" + this.lineaActual).classList.remove("puntoLLeno");
            this.lineaActual = this.lineaActual - 1;
            this.shadowRoot.querySelector("#punto" + this.lineaActual).classList.add("puntoLLeno");
            this.shadowRoot.querySelector("#punto" + this.lineaActual).classList.remove("puntoVacio");
            this.shadowRoot.querySelector("#titulo").innerHTML = this.lineas[this.lineaActual].Titulo
            this.shadowRoot.querySelector("#leyenda").innerHTML = this.lineas[this.lineaActual].Leyenda
            this.shadowRoot.querySelector("#btn-siguiente").innerText = idiomas[this.idioma].onboarding.btn1
            if (this.lineaActual == 0) {
                this.shadowRoot.querySelector("#flecha-izq").hidden = true
            }
        }
    }
    clickBoton1() {
        if (this.lineaActual + 1 == this.lineas.length) {
            //store.dispatch(modoPantalla("accesoplan", "onboarding"));
            store.dispatch(showScreen("accesoplan"))
        } else {
            this.adelante();
        }
    }
    clickBoton2() {
        //store.dispatch(modoPantalla("iniciosesion", "onboarding"));
        store.dispatch(showScreen("inicioSesion"))
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
            }
        }
    }

}
window.customElements.define("pantalla-onboarding", pantallaOnboarding);