/** @format */

import { html, LitElement, css, svg } from "lit-element";
import { store } from "../../redux/store";
import { button } from "../css/button";

import { connect } from "@brunomon/helpers";

import { captura } from "../../redux/fotos/actions";

import Cropper from "cropperjs";

const FLIP_CAMERA = svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 11.5V13H9v2.5L5.5 12 9 8.5V11h6V8.5l3.5 3.5-3.5 3.5z"/></svg>`;
const TAKE_PICTURE = svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2"/><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg>`;
const CLOSE_CAMERA = svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`;
const ACCEPT = svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>`;

const LLAMADOR_TIMESTAMP = "fotos.llamadorTimeStamp";

import { goNext, goTo, goPrev } from "../../redux/routing/actions";
import { isInLayout } from "../../redux/screens/screenLayouts";

import { showScreen } from "../../redux/screens/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

export class fotosComponente extends connect(store, SCREEN, MEDIA_CHANGE, LLAMADOR_TIMESTAMP)(LitElement) {
    constructor() {
        super();
        this.item = [];

        this.area = "body";
        this.streaming = false;
        this.cortando = false;
        this.cameras = [];
        this.currentCamera = 1;
        this.facingMode = "user";
        this.quien = "";
        this.hidden = true;
    }

    static get styles() {
        return css`
            ${button}
            :host {
                position: relative;
                display: grid;
                z-index: 100;
                width: 100vw;
                height: 100vh;
                top: 0;
                left: 0;
                overflow-y: auto;
                background-color: #333333;
            }
            :host([hidden]) {
                display: none;
            }

            #canvas {
                display: block;
                max-width: 100%;
            }
            #wrapper {
                display: block;
            }

            .cropper-container {
                direction: ltr;
                font-size: 0;
                line-height: 0;
                position: relative;
                -ms-touch-action: none;
                touch-action: none;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }

            .cropper-container img {
                display: block;
                height: 100%;
                image-orientation: 0deg;
                max-height: none !important;
                max-width: none !important;
                min-height: 0 !important;
                min-width: 0 !important;
                width: 100%;
            }

            .cropper-wrap-box,
            .cropper-canvas,
            .cropper-drag-box,
            .cropper-crop-box,
            .cropper-modal {
                bottom: 0;
                left: 0;
                position: absolute;
                right: 0;
                top: 0;
            }

            .cropper-wrap-box,
            .cropper-canvas {
                overflow: hidden;
            }

            .cropper-drag-box {
                background-color: #fff;
                opacity: 0;
            }

            .cropper-modal {
                background-color: #000;
                opacity: 0.5;
            }

            .cropper-view-box {
                display: block;
                height: 100%;
                outline: 1px solid #39f;
                outline-color: rgba(51, 153, 255, 0.75);
                overflow: hidden;
                width: 100%;
            }

            .cropper-dashed {
                border: 0 dashed #eee;
                display: block;
                opacity: 0.5;
                position: absolute;
            }

            .cropper-dashed.dashed-h {
                border-bottom-width: 1px;
                border-top-width: 1px;
                height: calc(100% / 3);
                left: 0;
                top: calc(100% / 3);
                width: 100%;
            }

            .cropper-dashed.dashed-v {
                border-left-width: 1px;
                border-right-width: 1px;
                height: 100%;
                left: calc(100% / 3);
                top: 0;
                width: calc(100% / 3);
            }

            .cropper-center {
                display: block;
                height: 0;
                left: 50%;
                opacity: 0.75;
                position: absolute;
                top: 50%;
                width: 0;
            }

            .cropper-center::before,
            .cropper-center::after {
                background-color: #eee;
                content: " ";
                display: block;
                position: absolute;
            }

            .cropper-center::before {
                height: 1px;
                left: -3px;
                top: 0;
                width: 7px;
            }

            .cropper-center::after {
                height: 7px;
                left: 0;
                top: -3px;
                width: 1px;
            }

            .cropper-face,
            .cropper-line,
            .cropper-point {
                display: block;
                height: 100%;
                opacity: 0.1;
                position: absolute;
                width: 100%;
            }

            .cropper-face {
                background-color: #fff;
                left: 0;
                top: 0;
            }

            .cropper-line {
                background-color: #39f;
            }

            .cropper-line.line-e {
                cursor: ew-resize;
                right: -3px;
                top: 0;
                width: 5px;
            }

            .cropper-line.line-n {
                cursor: ns-resize;
                height: 5px;
                left: 0;
                top: -3px;
            }

            .cropper-line.line-w {
                cursor: ew-resize;
                left: -3px;
                top: 0;
                width: 5px;
            }

            .cropper-line.line-s {
                bottom: -3px;
                cursor: ns-resize;
                height: 5px;
                left: 0;
            }

            .cropper-point {
                background-color: #39f;
                height: 5px;
                opacity: 0.75;
                width: 5px;
            }

            .cropper-point.point-e {
                cursor: ew-resize;
                margin-top: -3px;
                right: -3px;
                top: 50%;
            }

            .cropper-point.point-n {
                cursor: ns-resize;
                left: 50%;
                margin-left: -3px;
                top: -3px;
            }

            .cropper-point.point-w {
                cursor: ew-resize;
                left: -3px;
                margin-top: -3px;
                top: 50%;
            }

            .cropper-point.point-s {
                bottom: -3px;
                cursor: s-resize;
                left: 50%;
                margin-left: -3px;
            }

            .cropper-point.point-ne {
                cursor: nesw-resize;
                right: -3px;
                top: -3px;
            }

            .cropper-point.point-nw {
                cursor: nwse-resize;
                left: -3px;
                top: -3px;
            }

            .cropper-point.point-sw {
                bottom: -3px;
                cursor: nesw-resize;
                left: -3px;
            }

            .cropper-point.point-se {
                bottom: -3px;
                cursor: nwse-resize;
                height: 20px;
                opacity: 1;
                right: -3px;
                width: 20px;
            }

            @media (min-width: 768px) {
                .cropper-point.point-se {
                    height: 15px;
                    width: 15px;
                }
            }

            @media (min-width: 992px) {
                .cropper-point.point-se {
                    height: 10px;
                    width: 10px;
                }
            }

            @media (min-width: 1200px) {
                .cropper-point.point-se {
                    height: 5px;
                    opacity: 0.75;
                    width: 5px;
                }
            }

            .cropper-point.point-se::before {
                background-color: #39f;
                bottom: -50%;
                content: " ";
                display: block;
                height: 200%;
                opacity: 0;
                position: absolute;
                right: -50%;
                width: 200%;
            }

            .cropper-invisible {
                opacity: 0;
            }

            .cropper-bg {
                background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");
            }

            .cropper-hide {
                display: block;
                height: 0;
                position: absolute;
                width: 0;
            }

            .cropper-hidden {
                display: none !important;
            }

            .cropper-move {
                cursor: move;
            }

            .cropper-crop {
                cursor: crosshair;
            }

            .cropper-disabled .cropper-drag-box,
            .cropper-disabled .cropper-face,
            .cropper-disabled .cropper-line,
            .cropper-disabled .cropper-point {
                cursor: not-allowed;
            }

            :host([cortando]) #vistaUno,
            :host([cortando]) #btnTake,
            :host([cortando]) #btnFlip {
                display: none;
            }

            :host(:not([cortando])) #wrapper,
            :host(:not([cortando])) #btnAccept {
                display: none;
            }

            #vistaUno {
                display: grid;
                align-self: start;
                background-color: #333333;
            }
            #botonera {
                position: absolute;
                bottom: 3rem;
                left: 0;
                width: 100%;
                display: grid;
                grid-auto-flow: column;
                justify-items: center;
                grid-gap: 0.3rem;
                background-color: transparent;
            }

            #video {
                display: grid;
                justify-self: center;
            }

            .boton-consola {
                cursor: pointer;
                height: 2rem;
                width: 2rem;
                fill: white;
                stroke: white;
                align-self: end;
            }
            .boton-camara {
                border-radius: 50%;
                border: 2px solid yellow;
                padding: 0.2rem;
                height: 2.5rem;
                width: 2.5rem;
                fill: white;
            }
        `;
    }
    render() {
        return html` <div id="vistaUno">
                <video id="video"></video>
            </div>
            <div id="wrapper">
                <canvas id="canvas"></canvas>
            </div>
            <div id="botonera">
                <div id="btnFlip" class="boton-consola" @click="${this.cambioCamara}">${FLIP_CAMERA}</div>
                <div id="btnTake" class="boton-camara" @click="${this.takepicture}">${TAKE_PICTURE}</div>
                <div id="btnAccept" class="boton-consola" @click="${this.aceptar}">${ACCEPT}</div>
                <div id="btnClose" class="boton-consola" @click="${this.volver}">${CLOSE_CAMERA}</div>
            </div>
            <div id="crop" style="background-color:green;display:none"></div>`;
    }

    cambioCamara(e) {
        this.video.srcObject.getTracks().forEach((track) => {
            track.stop();
        });
        this.getVideo();
    }

    getVideo() {
        this.facingMode = this.facingMode == "user" ? "environment" : "user";
        navigator.mediaDevices
            .getUserMedia({
                video: {
                    facingMode: this.facingMode,
                },
                audio: false,
            })
            .then((mediaStream) => {
                this.video = this.shadowRoot.querySelector("#video");
                this.video.srcObject = mediaStream;
                this.video.setAttribute("autoplay", "");
                this.video.setAttribute("muted", "");
                this.video.setAttribute("playsinline", "");

                if (this.offsetHeight > this.offsetWidth) {
                    this.video.width = this.offsetWidth;
                } else {
                    this.video.height = this.offsetHeight;
                }
            });
    }

    gotDevices(deviceInfos) {
        for (let i = 0; i !== deviceInfos.length; ++i) {
            if (deviceInfos[i].kind === "videoinput") {
                this.cameras.push(deviceInfos[i].deviceId);
            }
        }
    }
    firstUpdated(changedProperties) {
        //this.getVideo()
    }
    takepicture(e) {
        this.cortando = true;

        const _width = this.video.offsetWidth;
        const _height = this.video.offsetHeight;

        this.canvas.width = _width;
        this.canvas.height = _height;

        let ctx = this.canvas.getContext("2d");

        ctx.drawImage(this.video, 0, 0, _width, _height);

        this.cropper = new Cropper(this.canvas, {
            dragMode: "move",
            viewMode: 1,
            cropBoxResizable: false,
            ready() {
                const lado = 200;
                const medioLado = lado / 2;
                const top = this.cropper.containerData.height / 2 - medioLado;
                const left = this.cropper.containerData.width / 2 - medioLado;
                this.cropper.setCropBoxData({
                    top: top,
                    left: left,
                    width: lado,
                    height: lado,
                });
            },
            crop(event) {},
        });

        this.update();
    }

    volver(e) {
        if (this.cortando) {
            this.cropper.destroy();
            this.cortando = false;
            this.update();
        } else {
            if (this.cropper) this.cropper.destroy();
            this.salir();
        }
    }

    salir() {
        //ej: store.dispatch(pantallDeOrigen())
        this.video.srcObject.getTracks().forEach((track) => {
            track.stop();
        });
        store.dispatch(goPrev());
    }
    salvar(data) {
        store.dispatch(captura(data, this.quien));
        this.salir();
    }

    aceptar(e) {
        this.cortando = false;
        this.cropper.getCroppedCanvas().toBlob(
            (blob) => {
                var reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    var base64data = reader.result;
                    this.cropper.destroy();
                    this.salvar(base64data);
                };
            },
            "image/jpeg",
            0.8
        );
    }

    stateChanged(state, name) {
        if (name == SCREEN || name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.hidden = true;
            const haveBodyArea = state.screen.layouts[this.mediaSize].areas.find((a) => a == this.area);
            const SeMuestraEnUnasDeEstasPantallas = "-fotos-mascotaAltaFoto-mascotaEditarFoto-".indexOf("-" + state.screen.name + "-") != -1;
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false;
                this.facingMode = "";
                this.video = this.shadowRoot.querySelector("#video");
                this.canvas = this.shadowRoot.querySelector("#canvas");
                this.wrapper = this.shadowRoot.querySelector("#wrapper");
                this.startbutton = this.shadowRoot.querySelector("#startbutton");
                this.canvasCrop = this.shadowRoot.querySelector("#crop");
                this.getVideo();
            }
            this.update();
        }

        if ((name = LLAMADOR_TIMESTAMP)) {
            this.quien = state.fotos.quien;
        }
    }

    static get properties() {
        return {
            mediaSize: {
                type: String,
                reflect: true,
                attribute: "media-size",
            },
            cortando: {
                type: Boolean,
                reflect: true,
            },
            hidden: {
                type: Boolean,
                reflect: true,
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

window.customElements.define("fotos-componente", fotosComponente);
