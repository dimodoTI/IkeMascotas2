/** @format */

import { html, LitElement, css, TemplateResult } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { idiomas } from "../../redux/datos/idiomas";
import { button } from "../css/button";
import { ikeInput } from "../css/ikeInput";

import { select } from "../css/select";

import { CAMARA, CAMARAROLLO } from "../../../assets/icons/icons";

import { add as addMascotas, patch as patchMascotas } from "../../redux/mascotas/actions";

import { llamador } from "../../redux/fotos/actions";

const MASCOTAS_EDIT = "mascotas.editTimeStamp";

const RAZAS_TIMESTAMP = "razas.timeStamp";
const FOTOS_TIMESTAMP = "fotos.timeStamp";

import { goTo } from "../../redux/routing/actions";
import { isInLayout } from "../../redux/screens/screenLayouts";
import { selectMenu, showWarning } from "../../redux/ui/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

export class pantallaMascotaAlta extends connect(store, MEDIA_CHANGE, SCREEN, MASCOTAS_EDIT, FOTOS_TIMESTAMP)(LitElement) {
    constructor() {
        super();
        this.hidden = true;
        this.area = "body";
        this.current = "mascotaalta";
        this.idioma = "ES";
        this.item = {
            Foto: "",
        };
        this.razas = [];
        this.mascotasTipo = [];
        this.modo = "";
    }

    static get styles() {
        return css`
            ${ikeInput}
            ${button}
            ${select}
            :host {
                position: absolute;
                top: 0rem;
                left: 0rem;
                height: 100%;
                width: 100%;
                grid-template-rows: 100%;
                background-color: var(--color-gris-fondo);
                display: grid;
            }
            :host([hidden]) {
                display: none;
            }

            #cuerpo {
                background-color: transparent;
                display: grid;
                padding: 1rem;
                grid-auto-flow: row;
                grid-gap: 0.5rem;
                overflow-y: auto;
            }
            :host(:not([media-size="small"])) #cuerpo {
                grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
                width: calc(100vw - 2rem);
            }

            #foto {
                display: grid;
                height: 15rem;
                width: 15rem;
                background-color: var(--color-gris-claro);
                border-radius: 0.5rem;
                overflow: hidden;
                position: relative;
                place-self: center;
            }

            #fotoBoton {
                position: absolute;
                width: 6rem;
                align-self: flex-end;
                justify-self: end;

                bottom: 0.5rem;
                right: 0.5rem;
            }
            #divTapa {
                display: none;
                position: absolute;
                height: 100vh;
                width: 100vw;
                background-color: var(--color-negro);
                opacity: 0.6;
                z-index: 10;
            }
            #divMensaje {
                position: absolute;
                display: none;
                bottom: 1rem;
                grid-template-rows: 70% 30%;
                grid-gap: 0.5rem;
                height: 30%;
                width: 100%;
                background-color: transparent;
                font-size: var(--font-header-h1-size);
                font-weight: var(--font-header-h1-weight);
                z-index: 12;
            }
            #divMensaje1 {
                position: relative;
                display: grid;
                grid-template-rows: 49.5% 1% 49.5%;
                /* grid-template-columns: 20% 80%; */
                border: 2px solid var(--color-gris-oscuro);
                grid-gap: 0;
                height: 100%;
                width: 95%;
                justify-self: center;
                background-color: var(--color-gris-claro);
                border-radius: 1rem;
                opacity: 1;
                cursor: pointer;
            }
            #divMensaje2 {
                position: relative;
                display: grid;
                border: 2px solid var(--color-gris-oscuro);
                grid-gap: 0.5rem;
                height: 100%;
                width: 95%;
                justify-self: center;
                background-color: var(--color-blanco);
                border-radius: 1rem;
                justify-content: center;
                align-content: center;
                color: var(--color-azul);
                cursor: pointer;
            }
            #divMsj1Linea1Col1 {
                display: grid;
            }
            #divMsj1Linea1Col1 svg {
                fill: var(--color-azul);
                stroke: var(--color-azul);
                width: 40%;
                justify-self: center;
            }
            #divMsj1Linea1Col2 {
                display: grid;
                color: var(--color-gris-oscuro);
                align-items: center;
            }
            #divMsj1Linea2 {
                grid-column-start: 1;
                grid-column-end: 3;
                background-color: var(--color-gris);
                opacity: 0.6;
            }
            #divMsj1Linea3Col1 {
                display: grid;
            }
            #divMsj1Linea3Col1 svg {
                fill: var(--color-azul);
                width: 40%;
                justify-self: center;
            }
            #divMsj1Linea3Col2 {
                display: grid;
                color: var(--color-gris-oscuro);
                align-items: center;
            }
            #pie {
                position: relative;
                grid-area: Pie;
                display: grid;
                overflow-x: none;
            }
            :host([media-size="small"]) #pie {
                display: none;
            }
        `;
    }
    render() {
        return html`
            <div id="cuerpo">
                <div style="display:grid;grid-auto-flow:row">
                    <div id="foto">
                        <img src="${this.item.Foto}" id="fotoMascota" style="height:100%" />
                        <button id="fotoBoton" btn3 @click=${this.abreFoto}>${idiomas[this.idioma][this.current].btn1}</button>
                    </div>
                </div>
                <div style="display:grid;grid-auto-flow:row">
                    <div id="selectMascota" class="select" style="width:100%;height:3.4rem">
                        <label>${idiomas[this.idioma][this.current].mascota}</label>
                        <select style="width:100%;height:1.7rem; color:black" id="mascota" @change="${this.cambioTipo}">
                            <option value="0">Elija Tipo de Mascota</option>
                            ${this.mascotasTipo.map((p) => {
                                return html` <option style="color:black" .selected="${this.item.Raza.idMascotasTipo == p.Id}" value="${p.Id}">${p.Descripcion}</option> `;
                            })}
                        </select>
                    </div>

                    <div class="ikeInput">
                        <label id="lblNombre">${idiomas[this.idioma][this.current].nombre}</label>
                        <input id="txtNombre" placeholder=${idiomas[this.idioma][this.current].nombre_ph} .value="${this.item.Nombre}" />
                        <label id="lblErrorNombre" error oculto>"Nombre Erroneo"</label>
                    </div>

                    <div class="ikeInput">
                        <label id="lblFecha">${idiomas[this.idioma][this.current].fecha}</label>
                        <input id="txtFecha" type="date" placeholder=${idiomas[this.idioma][this.current].fecha_ph} .value="${this.item.FechaNacimiento ? this.item.FechaNacimiento.substr(0, 10) : ""}" />
                        <label id="lblErrorFecha" error oculto>"Fecha Erroneo"</label>
                    </div>

                    <div class="select" style="width:100%;height:3.4rem">
                        <label>${idiomas[this.idioma][this.current].raza}</label>
                        <select id="selectRaza" style="width:100%;height:1.7rem;">
                            ${this.razas.map((p) => {
                                return html` <option style="color:black" .selected="${this.item.idRaza == p.Id}" value="${p.Id}">${p.Descripcion}</option> `;
                            })}
                        </select>
                    </div>

                    <div class="ikeInput">
                        <label>${idiomas[this.idioma][this.current].castrada}</label>
                        <input type="checkbox" id="castrada" .checked="${this.item.Castrada}" />
                    </div>

                    <button style="width:95%;height:2rem;justify-self: center;" id="btn-recuperar" btn1 @click=${this.clickGrabar}>${idiomas[this.idioma][this.current].btn2}</button>
                    <div style="height:1rem"></div>
                </div>
            </div>
            <div id="divTapa"></div>
            <div id="divMensaje">
                <div id="divMensaje1">
                    <div style="display:grid;grid-template-columns:20% 80%" @click="${this.abreFoto}">
                        <div id="divMsj1Linea1Col1">${CAMARA}</div>
                        <div id="divMsj1Linea1Col2">${idiomas[this.idioma][this.current].btnCamara}</div>
                    </div>

                    <div id="divMsj1Linea2"></div>
                    <div style="display:grid;grid-template-columns:20% 80%">
                        <div id="divMsj1Linea3Col1">${CAMARAROLLO}</div>
                        <div id="divMsj1Linea3Col2">${idiomas[this.idioma][this.current].btnImagen}</div>
                    </div>
                </div>
                <div id="divMensaje2" @click=${this.clickCancelar}>${idiomas[this.idioma][this.current].btnCancelar}</div>
            </div>
        `;
    }

    clickAtras() {
        store.dispatch(goTo("mascota"));
        store.dispatch(selectMenu("dos"));
    }

    abreFoto() {
        store.dispatch(llamador("mascota"));
        if (this.current == "mascotaalta") {
            store.dispatch(goTo("mascotaAltaFoto"));
        } else {
            store.dispatch(goTo("mascotaEditarFoto"));
        }
    }

    asignarValores(olditem) {
        let item = {
            ...olditem,
        };
        item.Nombre = this.shadowRoot.querySelector("#txtNombre").value;
        item.FechaNacimiento = this.shadowRoot.querySelector("#txtFecha").value;
        item.idRaza = this.shadowRoot.querySelector("#selectRaza").value;
        item.idUsuario = store.getState().cliente.datos.id;
        if (store.getState().fotos.foto) {
            item.Foto = store.getState().fotos.foto;
        }

        item.Castrada = this.shadowRoot.querySelector("#castrada").checked;
        item.Activo = true;

        delete item.Raza;
        delete item.MascotasVacuna;
        delete item.Reservas;

        return item;
    }

    generaPathch(olditem) {
        let item = {
            ...olditem,
        };

        if (store.getState().fotos.foto) {
            item.Foto = store.getState().fotos.foto;
        }

        let datosPatch = [
            {
                op: "replace",
                path: "/Nombre",
                value: this.shadowRoot.querySelector("#txtNombre").value,
            },
            {
                op: "replace",
                path: "/FechaNacimiento",
                value: this.shadowRoot.querySelector("#txtFecha").value,
            },
            {
                op: "replace",
                path: "/idRaza",
                value: this.shadowRoot.querySelector("#selectRaza").value,
            },
            {
                op: "replace",
                path: "/Foto",
                value: item.Foto, // store.getState().fotos.foto
            },
            {
                op: "replace",
                path: "/Castrada",
                value: this.shadowRoot.querySelector("#castrada").checked,
            },
        ];
        return datosPatch;
    }

    refresh() {
        this.item = {
            Raza: {
                idMascotasTipo: 0,
                MascotasTipo: {
                    Id: 0,
                },
            },
            MascotasVacuna: {},
            Reservas: {},
        };
        this.shadowRoot.querySelector("#mascota").value = 0;
        this.update();
    }

    validarDatos() {
        const mascota = this.shadowRoot.querySelector("#mascota");
        const nombre = this.shadowRoot.querySelector("#txtNombre");
        const fecha = this.shadowRoot.querySelector("#txtFecha");
        const raza = this.shadowRoot.querySelector("#selectRaza");
        let errores = [];
        let retorno = true;

        if (mascota.value == 0) {
            store.dispatch(showWarning(this.current, 0));
            //errores.push(idiomas[this.idioma][this.current].errorTipoMascota);
            return false;
        }

        if (nombre.value == "") {
            //errores.push(idiomas[this.idioma][this.current].errorNombre)
            store.dispatch(showWarning(this.current, 1));
            return false;
        }

        if (fecha.value != "") {
            let fechaHoy = new Date();
            fechaHoy = new Date(fechaHoy.getTime() - fechaHoy.getTimezoneOffset() * 60000).toJSON();
            let fechaNacimiento = new Date(fecha.value);
            fechaNacimiento = new Date(fechaNacimiento.getTime() - fechaNacimiento.getTimezoneOffset() * 60000).toJSON();
            if (fechaNacimiento > fechaHoy) {
                //errores.push("Mal fecha")
                store.dispatch(showWarning(this.current, 2));
                return false;
            }
        } else {
            //errores.push(idiomas[this.idioma][this.current].errorFecha)
            store.dispatch(showWarning(this.current, 3));
            return false;
        }

        if (raza.value == 0) {
            store.dispatch(showWarning(this.current, 3));
            return false;
        }

        return true; //errores.length > 0 ? false : true
    }

    clickGrabar() {
        if (this.validarDatos()) {
            if (this.modo == "A") {
                store.dispatch(addMascotas(this.asignarValores(this.item), store.getState().cliente.datos.token));
            } else {
                store.dispatch(patchMascotas(this.item.Id, this.generaPathch(this.item), store.getState().cliente.datos.token));
            }
            store.dispatch(goTo("mascotaAltaMsg"));
        }
    }

    stateChanged(state, name) {
        if (name == SCREEN || name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.hidden = true;

            const haveBodyArea = isInLayout(state, this.area);
            const SeMuestraEnUnasDeEstasPantallas = "-mascotaalta-mascotaeditar-".indexOf("-" + state.screen.name + "-") != -1;
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.current = state.screen.name;
                this.hidden = false;
            }

            this.update();
        }

        if (name == FOTOS_TIMESTAMP && state.fotos.quien == "mascota") {
            const foto = this.shadowRoot.querySelector("#fotoMascota");
            foto.src = state.fotos.foto;
            this.update();
        }

        if (name == MASCOTAS_EDIT) {
            this.refresh();
            this.mascotasTipo = state.mascotastipo.entities;
            this.razas = state.razas.entities;
            this.modo = state.mascotas.modo;
            this.item = state.mascotas.entities.currentItem;
            if (!this.item.Foto) {
                this.item.Foto = "";
            }

            this.razas = state.razas.entities.filter((r) => r.idMascotasTipo == this.item.Raza.MascotasTipo.Id);

            const combo = this.shadowRoot.querySelector("#selectRaza");
            combo.value = this.item.idRaza;
            this.item = state.mascotas.entities.currentItem;
            if (!this.item.Foto) {
                this.item.Foto = "";
            }
            this.update();
        }
    }

    cambioTipo(e) {
        this.razas = store.getState().razas.entities.filter((r) => r.idMascotasTipo == parseInt(e.currentTarget.value, 10));
        this.update();
    }

    static get properties() {
        return {
            hidden: {
                type: Boolean,
                reflect: true,
            },
            accion: {
                type: String,
                reflect: true,
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
            current: {
                type: String,
            },
        };
    }
}

window.customElements.define("pantalla-mascotaalta", pantallaMascotaAlta);
