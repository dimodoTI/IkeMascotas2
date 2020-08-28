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


export class estrellasComponente extends connect(store)(LitElement) {
    constructor() {
        super();
        this.hidden = false
        this.mensaje = false
    }

    static get styles() {
        return css `
            :host{
                background: #888;
                color: #fff;
                text-align:center;
            }
            
    

            .ratized {
                position: relative;
            }

            .ratized input[type="radio"] {
                position: fixed;
                top: 0;
                right: 100%;
            }


            .ratized label {
                font-size: 1.8em;
                cursor: pointer;
            }
            
            .ratized input[type="radio"]:checked  ~ input + label{
                background: none;
                color: #aaa;
            }

            .ratized input + label {
                color:  orange;
            }





        `
    }
    render() {
        return html `
        <div class="ratized">
           <input id="radio1" type="radio" name="estrellas" value="1">
           <label for="radio1">&#9733;</label>

            <input id="radio2" type="radio" name="estrellas" value="2">
            <label for="radio2">&#9733;</label>

            <input id="radio3" type="radio" name="estrellas" value="3">
            <label for="radio3">&#9733;</label>

            <input id="radio4" type="radio" name="estrellas" value="4">
            <label for="radio4">&#9733;</label>

            <input id="radio5" type="radio" name="estrellas" value="5">
            <label for="radio5">&#9733;</label>

            <input id="radio6" type="radio" name="estrellas" value="6">
            <label for="radio6">&#9733;</label>

            <input id="radio7" type="radio" name="estrellas" value="7">
            <label for="radio7">&#9733;</label>

            <input id="radio8" type="radio" name="estrellas" value="8">
            <label for="radio8">&#9733;</label>

            <input id="radio9" type="radio" name="estrellas" value="9">
            <label for="radio9">&#9733;</label>

            <input id="radio10" type="radio" name="estrellas" value="10">
            <label for="radio10">&#9733;</label>

        </div>
        `
    }


    stateChanged(state, name) {



    }

    static get properties() {
        return {
            hidden: {
                type: Boolean,
                reflect: true
            }
        }
    }
}
window.customElements.define("estrellas-componente", estrellasComponente);