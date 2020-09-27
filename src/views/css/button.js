import {
   css
} from "lit-element"

export const button = css `         
   button[btn1]{
      display:grid;            
      grid-auto-flow:column;
      align-items:center;
      grid-gap:.3rem;
      cursor:pointer;
      color:var(--color-crudo);
      fill:var(--color-celeste);
      stroke:var(--color-celeste);
      background-color:var(--color-celeste);
      font-size: var(--font-bajada-size);
      font-weight: var(--font-bajada-weight);
      border-radius:.4rem;
      padding:.5rem;
      box-shadow: 0 3px 6px 0 var(--orange-5);
      transition-duration: 0.4s;
      text-decoration: none;
      border:none;
      outline: none;
   }
   button[btn1]:hover {    
      background-color: var(--color-azul-oscuro);
   }
   button[btn1]:active {
      background-color: var(--color-celeste);
      box-shadow: 0.2rem var(--color-azul-oscuro);
      transform: translateY(.2rem);
   }
   button[btn1][apagado] {
      opacity: 0.8;
      background-color: var(--color-gris);
      cursor: not-allowed;
      pointer-events: none;
   }

   button[btn2]{
      display:grid;            
      grid-auto-flow:column;
      align-items:center;
      grid-gap:.3rem;
      cursor:pointer;
      color:var(--color-celeste);;
      fill:var(--color-celeste);
      stroke:var(--color-celeste);
      background-color:transparent;
      font-size: var(--font-bajada-size);
      font-weight: var(--font-bajada-weight);
      border-radius:.4rem;
      padding:.5rem;
      box-shadow: 0 3px 6px 0 var(--orange-5);
      transition-duration: 0.4s;
      text-decoration-line: underline;
      text-decoration-style: solid;
      border:none;
      outline: none;
   }
   button[btn2]:hover {    
         color: var(--color-azul-oscuro);
   }
   button[btn2]:active {
         color: var(--color-celeste);
         transform: translateY(.2rem);
   }
   button[btn2][apagado] {
         opacity: 0.8;
         color: var(--color-gris);
         cursor: not-allowed;
         pointer-events: none;
   }

   button[btn3]{
      display:grid;            
      grid-auto-flow:column;
      align-items:center;
      grid-gap:.3rem;
      cursor:pointer;
      color:var(--color-celeste);
      background-color:transparent;
      font-size: var(--font-bajada-size);
      font-weight: var(--font-bajada-weight);
      border-radius:.4rem;
      border:1px solid var(--color-celeste);
      padding:.5rem;
      box-shadow: 0 3px 6px 0 var(--orange-5);
      transition-duration: 0.4s;
      text-decoration: none;
      outline: none;
   }
   button[btn3]:hover {    
      background-color: var(--color-azul-oscuro);
   }
   button[btn3]:active {
      background-color: var(--color-negro);
      box-shadow: 0.2rem var(--color-azul-oscuro);
      transform: translateY(.2rem);
   }
   button[btn3][apagado] {
      opacity: 0.8;
      background-color: var(--color-gris);
      cursor: not-allowed;
      pointer-events: none;
   }
   button[btn3][anular]{
      display:none;
   }
`