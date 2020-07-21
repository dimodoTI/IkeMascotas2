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
export class redFoot extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.hidden = false
        this.area = "foot"
    }

    static get styles() {
        return css `
        :host{
            display: grid;      
            align-self:stretch;
            justify-self:stretch;           
            background-color:red
        }
        :host([hidden]){
            display:none
        }

        `
    }
    render() {
        return html `
    
            
       
        `
    }

    stateChanged(state, name) {
        if ((name == SCREEN || name == MEDIA_CHANGE)) {
            this.mediaSize = state.ui.media.size
            this.hidden = true
            if (isInLayout(state, this.area)) {
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

window.customElements.define("red-foot", redFoot);