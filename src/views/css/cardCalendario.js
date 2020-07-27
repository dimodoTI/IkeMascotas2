import {
    css
} from "lit-element"

export const cardCalendario = css `
#ccDivEtiqueta{
    display: grid; 
    height:22vw;
    width:100%;
    background-color:var(--color-blanco);
    grid-template-columns: 30% 30% auto;
    grid-template-rows: 30% auto 30%;
    grid-gap:0rem;
    border-radius:.4rem ;           
    align-items: center;
    box-shadow: var(--shadow-elevation-4-box);
} 
:host(:not([media-size="small"])) #ccDivEtiqueta{
    height:12vw;   
    border-radius:.1rem ;           
    box-shadow: var(--shadow-elevation-2-box);
}
#ccDivVacuna{
    font-size: var(--font-bajada-size);
    font-weight: bold;            
    padding-left: .5rem;
    grid-column-start: 1;
	grid-column-end: 4;
}         
#ccDivPara{
    font-size: var(--font-bajada-size);
    font-weight: var(--font-bajada-weight);            
    color: var(--color-azul-oscuro);
    padding-left:.5rem;
    grid-column-start: 1;
    grid-column-end: 4;
}  
`