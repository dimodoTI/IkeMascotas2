import {

    CAPTURA,
    LLAMADOR
} from "../fotos/actions";


const initialState = {
    foto: null,
    timeStamp: null,
    quien: null,
    errorTimeStamp: null,
    llamadorTimeStamp: null,

};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state
    };

    switch (action.type) {
        case CAPTURA:
            newState.foto = action.foto;
            newState.quien = action.quien
            newState.timeStamp = (new Date()).getTime();
            break;
        case LLAMADOR:
            newState.quien = action.quien
            newState.llamadorTimeStamp = (new Date()).getTime();
            break;


    }
    return newState;
};