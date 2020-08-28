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
    estrellas
} from "./estrellas"

import {
    ESTRELLAS
} from "../../../assets/icons/icons"


export class estrellasComponente2 extends connect(store)(LitElement) {
    constructor() {
        super();
        this.hidden = false
        this.mensaje = false
    }

    static get styles() {

        return css `

        :host{
            position: relative;
            top:0;
            left:0
        }

        #contenedor{
            border: 1px solid #eee;
            padding: 12px;
        }

        .rating {
            display: inline-flex;
            flex-direction: row-reverse;
            justify-content: flex-start;
            align-items: center;
        }


        &__data {
            position:absolute;
            left:-10000px;
            top:auto;
            width:1px;
            height:1px;
            overflow:hidden;
        }
        

        &__star {
            color: black;
            transition: color      0.1s cubic-bezier(0.0, 0.0, 0.2, 1),
                        transition 0.24s cubic-bezier(0.0, 0.0, 0.2, 1),
                        opacity    0.24s cubic-bezier(0.0, 0.0, 0.2, 1);
            
            will-change: color, transform;
        }
        

        svg {
            width: 24px;
            height: 24px;
            margin: 2px;
            fill: currentColor; 
            transition: 160ms cubic-bezier(0.4, 0, 0.2, 1); 
            cursor: pointer;
        }


        &__data:checked ~ &__star {
            color:  #FF9800;
        }
        
        
        &__star#{&}__star:hover,
        &__star:hover ~ &__star {
            color: #FDD835;
        }
        
        
        &__star#{&}__star:active { 
            color: red;
            transform: scale(1.4);
            opacity: .3;
        }`

    }
    render() {
        return html `
        


  

        <svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
        <symbol id="star" viewBox="0 0 24 24" width=24px height=24px>
            <title>Rating star icon</title>
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </symbol>
        </svg>

 
    <div id="contenedor" class="rating">
 
        <input type="radio" class="rating__data" id="rate-5-star--svg" name="rating--svg" value="5" />
        <label class="rating__star" 
                aria-label="rate 5 stars"
                for="rate-5-star--svg" 
                accesskey="5" tabindex="5">
            <svg><use xlink:href="#star"></use></svg>
        </label>
        
        <input type="radio" class="rating__data" id="rate-4-star--svg" name="rating--svg" value="4" />
        <label class="rating__star" 
                aria-label="rate 4 stars"
                for="rate-4-star--svg" 
                accesskey="4" tabindex="4">
            <svg><use xlink:href="#star"></use></svg>
        </label>
        
        <input type="radio" class="rating__data" id="rate-3-star--svg" name="rating--svg" value="3" />
        <label class="rating__star" 
                aria-label="rate 3 stars"
                for="rate-3-star--svg" 
                accesskey="3" tabindex="3">
            <svg><use xlink:href="#star"></use></svg>
        </label>
        
        <input type="radio" class="rating__data" id="rate-2-star--svg" name="rating--svg" value="2" />
        <label class="rating__star" 
                aria-label="rate 2 stars"
                for="rate-2-star--svg" 
                accesskey="2" tabindex="2">
            <svg><use xlink:href="#star"></use></svg>
        </label>
        
        <input type="radio" class="rating__data" id="rate-1-star--svg" name="rating--svg" value="1" />
        <label class="rating__star" 
                aria-label="rate 1 stars"
                for="rate-1-star--svg" 
                accesskey="1" tabindex="1">
            <svg><use xlink:href="#star"></use></svg>
        </label>
  
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
window.customElements.define("estrellas-componente2", estrellasComponente2);