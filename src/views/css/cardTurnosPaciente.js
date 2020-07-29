import {
    css
} from "lit-element"

export const cardTurnosPaciente = css`
        #atDivEtiqueta{
            position:relative;
            display: grid; 
            height:3.5rem;
            width:100%;
            grid-template-columns: 50% 50%;
            grid-gap:0rem;
            align-items: center;
            border-radius:.4rem ;           
        }
        #atDivEtiqueta[no]{
            box-shadow: var(--shadow-elevation-2-box);
            background-color:transparent;
        }
        #atDivEtiqueta[si]{
            box-shadow: var(--shadow-elevation-4-box);
            background-color:var(--color-gris-claro);
        }
        #atDivDia{
            position:relative;
            display: grid;
            height:100%; 
            background-color:transparent;
            grid-template-rows: 60% 40%;
            grid-gap:0rem;
            align-items: center;
            justify-content:center;
        }
        #atDivHora{
            position:relative;
            display: grid;
            height:100%; 
            width:100%;
            background-color:var(--color-celeste-claro);
            grid-template-rows: 50% 50%;
            grid-gap:0rem;
            border-radius: 0 .4rem .4rem 0 ;           
       }
        #atDivHora[no]{
            background-color:var(--color-celeste-claro);
        }
        #atDivHora[si]{
            background-color:var(--color-celeste);
        }
        #atLblDiaNumero{
            font-size: var(--font-header-h1-size);
            font-weight: var(--font-header-h1-weight);
            align-self:flex-end;
            justify-self: center;  
        }
        #atLblDiaTexto{
            font-size: var(--font-label-size);
            font-weight: var(--font-label-weight);  
            align-self: flex-end;
            justify-self: center;  
        }
        #atLblMes{
            font-size: var(--font-label-size);
            font-weight: var(--font-label-weight);  
            align-self: flex-start;
            justify-self: center;  
        }
        #atLblHora{
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);  
            align-self: flex-start;
            justify-self: center;  
        }
`