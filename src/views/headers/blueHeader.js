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
    showScreen
} from "../../redux/screens/actions";
import {
    goNext,
    goPrev,
    goTo
} from "../../redux/routing/actions"
import {
    isInLayout
} from "../../redux/screens/screenLayouts";


const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
export class blueHeader extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.hidden = false
        this.area = "header"
        //this.current = 0
        //this.screens = ["splash", "agenda", "cardA", "cardB", "cardC", "cardD"]
    }

    static get styles() {
        return css `
        :host{
            display: grid;      
            align-self:stretch;
            justify-self:stretch;           
            background-color:blue;
            grid-auto-flow:column;
            grid-gap:1rem;
            color:white;
        }
        :host([hidden]){
            display:none
        }

        `
    }
    render() {
        return html `
                <input type="button" @click="${this.atras}" style="height:2rem" value="Atras">
                <input type="button" @click="${this.adelante}" style="height:2rem" value="Adelante">
                ${store.getState().screen.name}
        `
    }

    firstUpdated(changedProperties) {

        store.dispatch(showScreen("splash", ""))

    }

    adelante() {
        /* this.current += 1
        if (this.current == this.screens.length) this.current = 0
        store.dispatch(showScreen(this.screens[this.current], "")) */
        store.dispatch(goNext())

    }
    atras() {
        /* this.current -= 1
        if (this.current < 0) this.current = this.screens.length - 1
        store.dispatch(showScreen(this.screens[this.current], "")) */
        store.dispatch(goPrev())

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

window.customElements.define("blue-header", blueHeader);