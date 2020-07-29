import {
    html,
    LitElement,
    css
} from "lit-element";
import {
    connect
} from "@brunomon/helpers"
import {
    store
} from "../redux/store";

import {
    layoutsCSS
} from "./ui/layouts"

/* import {
    blueHeader
} from "./headers/blueHeader"
import {
    redFoot
} from "./foots/redFoot"
import {
    greenDashboard
} from "./bodies/greenDashboard" */
import {
    getLayout
} from "../redux/screens/screenLayouts";

import {
    pantallaSplash
} from "./bodies/splash"

import {
    pantallaOnboarding
} from "./bodies/onboarding"

import {
    pantallaInicioSesion
} from "./bodies/iniciosesion"
import {
    headerComponente
} from "./headers/header"

import {
    pantallaPrincipal
} from "./bodies/principal"

import {
    pieComponente
} from "./foots/pie"

/* import {
    pantallaRecuperaClave
} from "./bodies/recuperaclave"
 */

import {
    videoRTC
} from "./bodies/videoRTC"

import {
    pantallaCrearClave
} from "./bodies/crearclave"

import {
    pantallaAccesoPlan
} from "./bodies/accesoplan"

import {
    pantallaVerCobertura
} from "./bodies/vercobertura"

import {
    pantallaRecuperaClave
} from "./bodies/recuperaclave"

import {
    pantallaRecuperaClaveMsg
} from "./bodies/recuperaclavemsg"

import {
    pantallaUsuarioDetalle
} from "./bodies/usuariodetalle"

import {
    pantallaUsuarioRegistro
} from "./bodies/usuarioRegistro"

import {
    pantallaMascota
} from "./bodies/mascota"

import {
    pantallaMascotaVer
} from "./bodies/mascotaVer"

import {
    pantallaCalendario
} from "./bodies/calendario"

import {
    pantallaVacuna
} from "./bodies/vacuna"

import {
    pantallaVacunaMsg
} from "./bodies/vacunaMsg"



import {
    headerPrincipal
} from "./headers/headerPrincipal"

import {
    header
} from "./headers/headerMascota"

import {
    pantallaMascotaAlta
} from "./bodies/mascotaAlta"

import {
    pantallaMisConsultas
} from "./bodies/misConsultas"

import {
    pantallaConsulta
} from "./bodies/consulta"

import {
    pantallaConsultaTurnos
} from "./bodies/consultaTurnos"
import {
    pantallaDiagnosticosDetalles
} from "./bodies/diagnosticoDetalles"

import {
    dimodoSpinner
} from "./componentes/spinner"

import {
    fotosComponente
} from "./componentes/fotos"

import {
    pantallaMascotaAltaMsg
} from "./bodies/mascotaAltaMsg"

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
export class viewManager extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();

    }


    static get styles() {
        return css `
        :host{
            display: grid;                 
            height:100vh;
            width: 100vw;
            padding:0;
            background-color:var(--color-gris-claro);
            overflow:hidden;
        }

        ${layoutsCSS};


        `
    }



    render() {
        return html `
            <splash-screen class="body"></splash-screen>
            <pantalla-onboarding class="body"></pantalla-onboarding>
            <pantalla-iniciosesion class="body"></pantalla-iniciosesion>
            <header-componente class="header"></header-componente>
            <pantalla-principal class="body"></pantalla-principal>
            <pie-componente class="foot"></pie-componente>
            <pantalla-crearclave class="body"></pantalla-crearclave>
            <video-rtc class="body"></video-rtc>
            <pantalla-accesoplan class="body"></pantalla-accesoplan>
            <pantalla-vercobertura class="body"></pantalla-vercobertura>
            <pantalla-recuperaclave class="body"></pantalla-recuperaclave>
            <pantalla-recuperaclavemsg class="body"></pantalla-recuperaclavemsg>
            <pantalla-usuariodetalle class="body"></pantalla-usuariodetalle>
            <pantalla-usuarioregistro class="body"></pantalla-usuarioregistro>
            <pantalla-mascota class="body"></pantalla-mascota>
            <pantalla-mascotaver class="body"></pantalla-mascotaver>
            <pantalla-calendario class="body"></pantalla-calendario>
            <pantalla-vacuna class="body"></pantalla-vacuna>
            <pantalla-vacunamsg class="body"></pantalla-vacunamsg>
            <header-principal class="header"></header-principal>
            <header-mascota class="header"></header-mascota>
            <pantalla-mascotaalta class="body"></pantalla-mascotaalta>
            <pantalla-misconsultas class="body"/></pantalla-misconsultas>
            <pantalla-consulta class="body"></pantalla-consulta>
            <pantalla-consultaturnos class="body"></pantalla-consultaturnos>
            <pantalla-diagnosticosdetalles class="body"></pantalla-diagnosticosdetalles>
            <dimodo-spinner  type="spinner2"></dimodo-spinner>
            <fotos-componente class="body"></fotos-componente>
            <pantalla-mascotaaltamsg class="body"></pantalla-mascotaaltamsg>
            `

    }

    stateChanged(state, name) {
        if ((name == MEDIA_CHANGE || name == SCREEN)) {
            this.mediaSize = state.ui.media.size
            this.layout = getLayout(state).name
        }

        this.update();
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
            }
        }
    }
}

window.customElements.define("view-manager", viewManager);