import {
    css
} from "lit-element"

export const cardMascotaHorizontal = css `


#cmhDivEtiqueta{
    display: grid; 
    position: relative;
    height:15vh;
    width: 100%;
    background-color:var(--color-blanco);
    grid-template-columns: 15vh auto 20%;
    grid-template-rows: 25% 45% 30%;
    grid-gap:.1vh;
    border-radius:.4rem ;           
    align-items: center;
    box-shadow: var(--shadow-elevation-4-box);
    padding: .2vh 0 .2vh 0;
    justify-self:center;
}  





:host(:not([media-size="small"])) #cmhDivEtiqueta{
    height:12vw;   
    box-shadow: var(--shadow-elevation-2-box);
}
#cmhDivImagen{
    height:15vh;
    width :15vh;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    border-radius:.4rem 0 0 .4rem;   
    max-height:15vh;
    max-width :15vh;
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
    padding-left: .2rem;
    grid-column-start: 2;
	grid-column-end: 4;
} 

#cmhDivVerDetalle{
    padding-left: .2rem;
} 

#cmhDivChat[hiddechat="true"] {
            display:none;
}

#cmhDivChat
{
    height:1.2rem;
    width:100%;
    justify-content:center;
    display:grid;
}
#cmhDivChat svg{
    height:1rem;
} 


`