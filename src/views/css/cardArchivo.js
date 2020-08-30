import {
    css
} from "lit-element"

export const cardArchivo = css `
        #ciDivEtiqueta{
            position:relative;
            display: grid; 
            height:6vh;
            width:100%;
            background-color:transparent;
            grid-template-columns: 90% 10%;
            grid-gap:0rem;
            align-items: center;
        }
        #ciDivContenido{
            position:relative;
            display: grid;
            height:100%; 
            background-color:var(--color-celeste-muy-claro);
            grid-template-columns: 15% 85%;
            grid-gap:0rem;
            border-radius:.4rem ;           
            align-items: center;
            box-shadow: var(--shadow-elevation-1-box);
        }
        #ciDivIcomo{
            height:50%;
            width:50%;
            justify-self: center;
        }
        #ciDivNombre{
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);   
            color: var(--color-celeste);            
        }
        #ciDivDelete {
            justify-self: center;
            height:50%;
            width:50%;
        }

`