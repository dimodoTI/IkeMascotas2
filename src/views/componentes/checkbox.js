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
export class miCheckbox extends connect(store)(LitElement) {
    constructor() {
        super();
        this.label = ""

    }

    static get styles() {
        return css `
            :host{
                position: relative;
                display: block;
                border:none;
                background-color:transparent;
                outline:none;
                font-family:inherit;
                font-size:inherit;
                font-weight:inherit;
                width:100%;
                height: 2rem;
            }
            .controlCkh{
                position: absolute;
                top: 0.5rem;
                padding-left: 2rem;
             }
            .controlCkh input {
                position: absolute;
                z-index: -1;
                opacity: 0;
            }
            .controlCkh_indicator {
                position: absolute;
                cursor: pointer;
                top: 0px;
                left: 0px;
                height: 1rem;
                width: 1rem;
                background: var(--color-blanco);
                border: 1px solid #000000;
                border-radius: .3rem;
            }
            .controlCkh:hover input ~ .controlCkh_indicator,
            .controlCkh input:focus ~ .controlCkh_indicator {
                background: var(--color-gris-fondo);
                border: solid var(--primary-color);
                border-width: 0 1px 1px 0;
            }
            
            .controlCkh input:checked ~ .controlCkh_indicator {
                background: var(--color-azul-oscuro);
            }
            .controlCkh:hover input:not([disabled]):checked ~ .controlCkh_indicator,
            .controlCkh input:checked:focus ~ .controlCkh_indicator {
                background: var(--color-azul-oscuro);
            }
            .controlCkh input:disabled ~ .controlCkh_indicator {
                background: var(--color-gris-fondo);
                opacity: 0.6;
                pointer-events: none;
            }
            .controlCkh_indicator:after {
                box-sizing: unset;
                content: '';
                position: absolute;
                display: none;
            }
            .controlCkh input:checked ~ .controlCkh_indicator:after {
                display: block;
            }
            .controlCkh-checkbox .controlCkh_indicator:after {
                left: .3rem;
                top: 0;
                width: .3rem;
                height: .6rem;
                border: solid var(--color-blanco);
                border-width: 0 .1rem .1rem 0;
                transform: rotate(45deg);
            }
            .controlCkh-checkbox input:disabled ~ .controlCkh_indicator:after {
                border-color: var(--color-negro);
            }
            .controlCkh-checkbox .controlCkh_indicator::before {
                content: '';
                display: block;
                position: absolute;
                left: 0;
                top: 0;
                width: 3rem;
                height: 3rem;
                margin-left: -1rem;
                margin-top: -1rem;
                background: var(--primary-color);
                border-radius: 3rem;
                opacity: 0.6;
                z-index: 99999;
                transform: scale(0);
            }
            @keyframes s-ripple {
                0% {
                    transform: scale(0);
                }
                20% {
                    transform: scale(1);
                }
                100% {
                    opacity: 0;
                    transform: scale(1);
                }
            }
            @keyframes s-ripple-dup {
            0% {
                transform: scale(0);
                }
            30% {
                    transform: scale(1);
                }
                60% {
                    transform: scale(1);
                }
                100% {
                    opacity: 0;
                    transform: scale(1);
                }
            }
            .controlCkh-checkbox input + .controlCkh_indicator::before {
                animation: s-ripple 250ms ease-out;
            }
            .controlCkh-checkbox input:checked + .controlCkh_indicator::before {
                animation-name: s-ripple-dup;
            }        
        `
    }
    render() {
        return html `
            <label class="controlCkh controlCkh-checkbox">
                ${this.label}
                <input type="checkbox" id="myChecked"/>
                <div class="controlCkh_indicator"></div>
            </label>
        `
    }

    click() {

        this.check = !this.check
    }

    get check() {
        return this.shadowRoot.querySelector("#myChecked").checked
    }

    set check(value) {
        this.shadowRoot.querySelector("#myChecked").checked = value
    }

    static get properties() {
        return {
            label: {
                type: String,
                reflect: ""
            }
        }
    }
}
window.customElements.define("mi-checkbox", miCheckbox);