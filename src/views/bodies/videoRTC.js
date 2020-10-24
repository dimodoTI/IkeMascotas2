import {
    html,
    LitElement,
    css,
    svg
} from "lit-element";

import {
    store
} from "../../redux/store";
import {
    button
} from "../css/button"

import {
    connect
} from "@brunomon/helpers"




const FLIP_CAMERA = svg `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 11.5V13H9v2.5L5.5 12 9 8.5V11h6V8.5l3.5 3.5-3.5 3.5z"/></svg>`
const CLOSE_CAMERA = svg `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`

import {
    goNext,
    goTo,
    goPrev
} from "../../redux/routing/actions"
import {
    isInLayout
} from "../../redux/screens/screenLayouts";
import {
    showScreen
} from "../../redux/screens/actions";

const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp"

export class videoRTC extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.facingMode = "user"
        this.area = "body"
        this.hidden = true
        this.reserva = []
    }

    static get styles() {
        return css `
          ${button}
          :host{
            position:relative;
            overflow-y:auto;
            background-color:#333333;
            display:grid;
            overflow:hidden;
          }
  
          :host([full-room]) #waiting{
            display:none
          }
          
          #waiting{
            color:white;
            font-size:2rem;
            position:absolute;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%)
            
          }
  
          :host([hidden]){
            display: none
          }
          #botonera{
            position:absolute;
            bottom:1rem;
            left:0;
            width:100%;
            display:grid;
            grid-auto-flow:column;
            justify-items:center;
            grid-gap:.3rem;
            background-color:transparent;
          }
         
          #videoRemoto{
            display:grid;
            justify-self:center;
          }
          :host([orientation="portrait"]) #videoRemoto{
            width:100%;
            height:auto;
          }
          :host([orientation="landscape"]) #videoRemoto{
            height:100%;
            width:auto;
          }
  
          .boton-consola{
            cursor:pointer;
            height:2rem;
            width:2rem;
            fill:white;
            stroke:white;
            align-self:end
          }
          .boton-camara{
            border-radius:50%;
            border:2px solid yellow;
            padding:.2rem;
            height:2.5rem;
            width:2.5rem;
            fill:white;
            cursor:pointer;
          }
  
          #videoLocal {
            position: absolute;
            top: 0rem;
            right: 0rem;
            height: 25%;
            width: auto;
            z-index:100
          }
          :host([orientation="portrait"]) #videoLocal{
            width: 25%;         
            height: auto;
        }
  
          
          `
    }
    render() {

        return html `
        <div id="waiting">Esperando al ${this.otherName}</div>
        <video id="videoLocal" autoplay playsinline muted></video>
        <video id="videoRemoto" autoplay playsinline></video>
        
        <div id="botonera">
            
            <div id="btnFlip" class="boton-consola" @click="${this.cambioCamara}">${FLIP_CAMERA}</div>
            <div id="btnClose" class="boton-consola" @click="${this.leave}">${CLOSE_CAMERA}</div>
        </div>
        `

    }

    firstUpdated(changedProperties) {
        /* 
                this.videoLocal = this.shadowRoot.querySelector('#videoLocal');
                this.videoRemoto = this.shadowRoot.querySelector('#videoRemoto'); */

        //this.connectCliente()
        //this.connectVeterinario()
        // quitar este comentario para probar en la misma aplicacion
        /* const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('cliente')) {
          this.connectCliente()
        } else {
          this.connectVeterinario()
        } */
        /*         this.updateComplete.then(() => {
                    if (this.shadowRoot.host.offsetHeight > this.shadowRoot.host.offsetWidth) {
                        this.videoRemoto.width = this.shadowRoot.host.offsetWidth
                    } else {
                        this.videoRemoto.height = this.shadowRoot.host.offsetHeight
                    }
                }); */


    }

    connectVideo(rol, room, theirVideo, yourVideo) {

        this.fullRoom = false

        this.name = rol

        this.sala = room

        this.otherName = rol == "cliente" ? "veterinario" : "cliente"

        this.connWS = new WebSocket('wss://ws.video.ikeargentina.com.ar:9090');

        if (!("mediaDevices" in navigator) || !("RTCPeerConnection" in window)) {
            alert("Sorry, your browser does not support WebRTC.");
            return;
        }


        this.connWS.onopen = () => {

            console.log("Connected to the signaling server");
            if (this.name.length > 0) {
                this.send({
                    type: "login",
                    name: this.name,
                    sala: this.sala
                });
            }

        };

        this.connWS.onmessage = (msg) => {
            console.log("Got message", msg.data);

            let data = JSON.parse(msg.data);

            switch (data.type) {
                case "login":
                    this.fullRoom = data.full;
                    this.handleLogin(data.success, theirVideo, yourVideo);
                    break;
                case "offer":
                    this.handleOffer(data.offer, data.name);
                    break;
                case "answer":
                    this.handleAnswer(data.answer);
                    break;
                case "candidate":
                    this.handleCandidate(data.candidate);
                    break;
                case "leave":
                    this.handleLeave();
                    break;
                default:
                    break;
            }
        };

        this.connWS.onerror = (err) => {
            console.log("Got error", err);
        };

    }

    send(message) {
        this.connWS.send(JSON.stringify(message));
    };

    handleLogin(succes, theirVideo, yourVideo) {

        if (!succes) {
            alert("ya se encuentra conectado")
            return
        }
        this.captureCamara(theirVideo, yourVideo)

    }

    captureCamara(theirVideo, yourVideo) {
        navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: this.facingMode
            },
            audio: true
        }).then((localStream) => {

            this.stream = localStream.clone()

            yourVideo.srcObject = this.stream;
            yourVideo.muted = true

            const configuration = {
                iceServers: [{
                    urls: "turn:mascotas.ikeargentina.com.ar",
                    username: "dimodo",
                    credential: "dimodo"
                }]
            }

            /* const configuration = {
                iceServers: [{
                    urls: [
                        "stun:stun.l.google.com:19302",
                        "stun:stun1.l.google.com:19302",
                        "stun:stun2.l.google.com:19302",
                        "stun:stun.l.google.com:19302?transport=udp",
                    ]
                }]
            }; */

            /*             const configuration = {
                            iceServers: [{
                                urls: [
                                    "turn:64.227.109.20:80?transport=tcp",
                                    "turn:64.227.109.20:49160?transport=tcp"
                                ],
                                username: "",
                                credential: ""
                            }]
                        };

             */

            const remoteStream = new MediaStream();
            theirVideo.srcObject = remoteStream;

            this.yours = new RTCPeerConnection(configuration);

            for (const track of this.stream.getTracks()) {
                this.yours.addTrack(track, this.stream);
            }

            // no cambiar este paso sino no funciona en safari de ios
            this.yours.ontrack = e => theirVideo.srcObject = e.streams[0]

            this.yours.onicecandidate = (event) => {
                if (event.candidate) {
                    this.send({
                        type: "candidate",
                        candidate: event.candidate,
                        name: this.otherName,
                        sala: this.sala
                    });
                }
            };

            if (this.fullRoom) {
                this.createOffer()
            }
        })
    }

    createOffer() {
        this.yours.createOffer().then((offer) => {
                return this.yours.setLocalDescription(offer);
            })
            .then(() => {
                this.send({
                    type: "offer",
                    offer: this.yours.localDescription,
                    name: this.otherName,
                    sala: this.sala
                });
            })
            .catch(function (reason) {
                alert("Error when creating an offer");
            });
    }


    handleOffer(offer, name) {
        this.fullRoom = true
        this.update()
        this.yours.setRemoteDescription(new RTCSessionDescription(offer)).then(() => {
            this.yours.createAnswer().then((answer) => {
                    return this.yours.setLocalDescription(answer);
                })
                .then(() => {
                    this.send({
                        type: "answer",
                        answer: this.yours.localDescription,
                        name: name,
                        sala: this.sala
                    });
                })
                .catch(function (reason) {
                    alert("Error when creating an answer");
                });
        })


    }
    handleAnswer(answer) {
        this.yours.setRemoteDescription(new RTCSessionDescription(answer));
    };

    handleCandidate(candidate) {
        this.yours.addIceCandidate(new RTCIceCandidate(candidate));
    };

    leave() {
        this.send({
            type: "leave",
            name: this.otherName,
            sala: this.sala
        });
        if (this.current == "videoConsulta") {
            store.dispatch(goTo("videoCalificacion"))
        } else {
            store.dispatch(goTo("videoCalificacionM"))
        }

        this.handleLeave();

    }

    handleLeave() {
        this.stream.getTracks().forEach(track => track.stop());
        this.videoRemoto.srcObject = null
        this.connWS.close()
        this.yours = null
        this.stream = null

    };

    connectCliente() {
        this.videoLocal = this.shadowRoot.querySelector('#videoLocal');
        this.videoRemoto = this.shadowRoot.querySelector('#videoRemoto');

        this.connectVideo("cliente", this.sala, this.videoRemoto, this.videoLocal)
    }
    connectVeterinario() {
        this.videoLocal = this.shadowRoot.querySelector('#videoLocal');
        this.videoRemoto = this.shadowRoot.querySelector('#videoRemoto');

        this.connectVideo("veterinario", this.sala, this.videoRemoto, this.videoLocal)
    }

    cambioCamara(e) {

        this.facingMode = this.facingMode == "user" ? "environment" : "user"
        this.stream.getTracks().forEach(trak => {
            trak.stop();
        });

        navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: this.facingMode
            },
            audio: true
        }).then(mediaStream => {
            this.stream = mediaStream
            this.videoLocal.srcObject = this.stream;
            this.videoLocal.play()

            this.yours.getSenders().map(sender => sender.replaceTrack(this.stream.getTracks().find(t => t.kind === sender.track.kind), this.stream))

        })

    }





    stateChanged(state, name) {

        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.orientation = state.ui.media.orientation
            this.hidden = true
            const haveBodyArea = state.screen.layouts[this.mediaSize].areas.find(a => a == this.area)
            const SeMuestraEnUnasDeEstasPantallas = "-videoConsulta-videoMasocotaVer-".indexOf("-" + state.screen.name + "-") != -1
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                if (!this.yours) {
                    this.reserva = state.reservas.entities.enAtencion.registro
                    this.sala = "dimodo" + this.reserva.Id.toString()
                    this.connectCliente()
                    this.current = state.screen.name
                }
                this.hidden = false
            }
            this.update();
        }
    }

    static get properties() {
        return {
            mediaSize: {
                type: String,
                reflect: true,
                attribute: 'media-size'
            },
            hidden: {
                type: Boolean,
                reflect: true,
            },
            sala: {
                type: String,
                reflect: true,
            },
            connWS: {
                type: Object
            },
            stream: {
                type: Object
            },
            yours: {
                type: Object
            },
            room: {
                type: String
            },
            name: {
                type: String
            },
            otherName: {
                type: String
            },
            facingMode: {
                type: String
            },
            media: {
                type: Object
            },
            fullRoom: {
                type: Boolean,
                reflect: true,
                attribute: "full-room"

            },
            layout: {
                type: String,
                reflect: true,
            },
            area: {
                type: String
            },
            orientation: {
                type: String,
                reflect: true,

            }
        }
    }
}

window.customElements.define("video-rtc", videoRTC);