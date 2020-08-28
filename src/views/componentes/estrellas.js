import {
  css
} from "lit-element"

export const estrellas = css `

form {
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%,-50%);
  border: 1px solid #eee;
  padding: 12px;
}
/**
 * STAR-RATING
 * 
 **/
.rating {

  
  display: inline-flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  align-items: center;
 


  &__data {
    position:absolute;
    left:10000px;
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
  
 
  &__star#{&}__star:active /* 1 */ { 
    color: red;
    transform: scale(1.4);
    opacity: .3;
  }
}


`