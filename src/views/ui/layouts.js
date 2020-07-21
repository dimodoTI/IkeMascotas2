import {
    css,
    unsafeCSS
} from "lit-element"
import {
    ALL_BODY,
    HEADER_BODY_FOOT,
    BODY_FOOT,
    HEADER_BODY,
    SLIDER_HEADER_BODY
} from "../../redux/screens/layouts"

export const layoutsCSS = css `

    :host([layout="${unsafeCSS(SLIDER_HEADER_BODY.name)}"]){
        grid-template-areas:"header  header  header"
                            "foot    body    body";
        grid-template-rows:2fr 8fr;
        grid-template-columns:2fr 4fr 4fr;
        grid-gap:.3rem
    }

    :host([layout="${unsafeCSS(HEADER_BODY.name)}"]){
        grid-template-areas:"header"
                            "body";
        grid-template-rows:2fr 8fr;
        grid-template-columns:1fr;
        grid-gap:.3rem;


    }
    :host([layout="${unsafeCSS(BODY_FOOT.name)}"]){
        grid-template-areas:"body"
                            "foot";
        grid-template-rows:8fr 2fr;
        grid-gap:.3rem;

    }

    :host([layout="${unsafeCSS(HEADER_BODY_FOOT.name)}"]){
        grid-template-areas:"header"
                            "body"
                            "foot";
        grid-template-rows:2fr 8fr 2fr;
        grid-template-columns:1fr
    }
    :host([layout="${unsafeCSS(ALL_BODY.name)}"]){
        grid-template-areas:"body";
        grid-template-rows:1fr;
        grid-template-columns:1fr
    }


    .header{
        grid-area:header
    }
    .body{
        grid-area:body
    }
    .foot{
        grid-area:foot
    }

`