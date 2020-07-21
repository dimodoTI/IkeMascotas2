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
} from "../../redux/store";
import {
    isInLayout
} from "../../redux/screens/screenLayouts";


const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
export class greenDashboard extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.hidden = false
        this.area = "body"
    }

    static get styles() {
        return css `
        :host{
            display: grid;      
            padding:.3rem;
            grid-gap:.3rem;
            align-self:stretch;
            justify-self:stretch;           
            background-color:green
        }
        :host([hidden]){
            display:none
        }

        /* Layout para large */

        :host([media-size="large"]){
            grid-template-areas:"cardA cardB"
                                "cardC cardD";
            grid-template-columns :1fr 1fr;
            grid-template-rows :1fr 1fr;
        }

        /* Layout para medium */

        :host([media-size="medium"]){
            grid-template-columns :1fr 1fr;
            grid-template-rows :1fr;
        }

        :host([media-size="medium"][current="cardA"]), :host([media-size="medium"][current="cardB"]){
            grid-template-areas:"cardA cardB";
        }
        :host([media-size="medium"][current="cardC"]), :host([media-size="medium"][current="cardD"]){
            grid-template-areas:"cardC cardD";
        }

        /* Layout para small */

        :host([media-size="small"]){
            grid-template-columns :1fr;
            grid-template-rows :1fr;
        }

        :host([media-size="small"][current="cardA"]){
            grid-template-areas:"cardA";
        }

        :host([media-size="small"][current="cardB"]){
            grid-template-areas:"cardB";
        }

        :host([media-size="small"][current="cardC"]){
            grid-template-areas:"cardC";
        }

        :host([media-size="small"][current="cardD"]){
            grid-template-areas:"cardD";
        }

        /* Defino areas */

        .cardA{
            grid-area:cardA;
            background-color:rgba(32,32,32,1)
            
        }
        .cardB{
            grid-area:cardB;
            background-color:rgba(64,64,64,1)
            
        }
        .cardC{
            grid-area:cardC;
            background-color:rgba(97,97,97,1)
        }
        .cardD{
            grid-area:cardD;
            background-color:rgba(127,127,127,1)
        }

        /* Defino visibilidad para small */

        :host(:not([current="cardA"])[media-size="small"]) .cardA{
            display:none
        }
        :host(:not([current="cardB"])[media-size="small"]) .cardB{
            display:none
        }
        :host(:not([current="cardC"])[media-size="small"]) .cardC{
            display:none
        }
        :host(:not([current="cardD"])[media-size="small"]) .cardD{
            display:none
        }

        /* Defino visibilidad para medium */

        :host(:not([current="cardA"]):not([current="cardB"])[media-size="medium"]) .cardA{
            display:none
        }
        :host(:not([current="cardA"]):not([current="cardB"])[media-size="medium"]) .cardB{
            display:none
        }
        :host(:not([current="cardC"]):not([current="cardD"])[media-size="medium"]) .cardC{
            display:none
        }
        :host(:not([current="cardC"]):not([current="cardD"])[media-size="medium"]) .cardD{
            display:none
        }
        

        `
    }
    render() {
        return html `
        <div class="cardA">A</div>
        <div class="cardB">B</div>
        <div class="cardC">C</div>
        <div class="cardD">D</div>
       
        `
    }

    stateChanged(state, name) {

        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            //const haveBodyArea = state.screen.layouts[this.mediaSize].areas.find(a => a == this.area)
            if (isInLayout(state, this.area) && "cardA-cardB-cardC-cardD".indexOf(state.screen.name) != -1) {
                this.hidden = false
                this.current = state.screen.name
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

window.customElements.define("green-dashboard", greenDashboard);