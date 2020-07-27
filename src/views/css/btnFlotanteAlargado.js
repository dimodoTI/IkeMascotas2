import {
    css
} from "lit-element"

export const btnFlotanteAlargado = css `
#bfaDivMas{
    position:absolute;
    height: 2rem;
    width: 7.5rem;
    right: 2rem;
    bottom:2rem;
    background-color: var(--color-azul-oscuro); 
    border-radius:1.25rem;
    display: grid;
    align-items:center; 
    justify-content:center;
    box-shadow: var(--shadow-elevation-4-box);
    cursor:pointer;
    grid-template-columns:1fr 9fr;
    grid-gap:.2rem;
    padding: 0 .5rem 0 .5rem;
}


#bfaDivMas svg{
    stroke:var(--color-blanco);   
    height: 1.2rem;
    width: 1.2rem;
}
#bfaDivMas label{
    font-size: var(--font-label-size);
    font-weight: var(--font-label-weight);            
    color:var(--color-blanco);
    text-align:center;
}
`