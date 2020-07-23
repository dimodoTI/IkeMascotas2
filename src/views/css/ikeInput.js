import { css } from "lit-element"

export const ikeInput = css`
.ikeInput{
    display:grid;
    grid-template-rows:1fr auto 1fr;
    grid-gap:.1rem
 
}
.ikeInput input{
    padding:.4rem;
    background-color:var(--color-blanco);
    border:1px solid var(--color-gris-claro);
    color: var(--color-azul-oscuro);
    font-size: var(--font-bajada-size);
    font-weight: var(--font-bajada-weight);
    outline:none;
    border-radius:5px
}
.ikeInput label{
    color: var(--color-azul-oscuro);
    font-size: var(--font-label-size);
    font-weight: var(--font-label-weight);
}
.ikeInput label[error]{
    color:var(--color-rojo);
    font-size: var(--font-error-size);
    font-weight: var(--font-error-weight);
}
.ikeInput label[oculto]{
    display:none
}
::placeholder { /* Firefox, Chrome, Opera */ 
    color: var(--color-gris); 
}
`