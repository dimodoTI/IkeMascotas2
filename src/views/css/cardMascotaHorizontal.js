import {
    css
} from "lit-element"

export const cardMascotaHorizontal = css `
#cmhDivEtiqueta{
    display: grid; 
    height:22vw;
    width:100%;
    background-color:var(--color-blanco);
    grid-template-columns: 25% 55% 20%;
    grid-template-rows: 25% 45% 30%;
    grid-gap:0rem;
    border-radius:.4rem ;           
    align-items: flex-start;
    box-shadow: var(--shadow-elevation-4-box);
}  
:host(:not([media-size="small"])) #cmhDivEtiqueta{
    height:12vw;   
    box-shadow: var(--shadow-elevation-2-box);
}
#cmhDivImagen{
    height:22vw;
    width:22vw;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    border-radius:.4rem 0 0 .4rem;   
}
:host(:not([media-size="small"])) #cmhDivImagen{
    height:12vw;
    width:12vw;
}
#cmhDivNombre{
    font-size: var(--font-bajada-size);
    font-weight: var(--font-bajada-weight);            
    padding-left:.5rem;
    color: var(--color-gris);
}         
#cmhDivFecha{
    font-size: var(--font-label-size);
    font-weight: var(--font-label-weight);            
    color: var(--color-gris);
    text-align: right;
    padding-right:.3rem;
} 
#cmhDivDiagnostico{
    font-weight: bold;   
    font-size: .8rem;         
    padding-bottom: .8rem;
    padding-left: .5rem;
    grid-column-start: 2;
	grid-column-end: 4;
} 
#cmhDivVerDetalle{
    padding-left: .5rem;
   
} 
#cmhDivChat{
    height:1rem;
    width:100%;
    justify-items:center;
} 
`