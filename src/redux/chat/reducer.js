import {
    GET_SUCCESS,
    GET_ERROR,
    PATCH_SUCCESS,
    PATCH_ERROR,
    UPDATE_SUCCESS,
    UPDATE_ERROR,
    ADD_SUCCESS,
    ADD_ERROR,
    REMOVE_SUCCESS,
    REMOVE_ERROR,
    EDIT,
    SIN_CONTESTAR_SUCCESS,
    SIN_CONTESTAR_ERROR,
    RECIBIR_MENSAJE,
    CHAT_RESERVA_SUCCESS,
    SET_CAMPANA_SUCCESS
} from "./actions";


const initialState = {
    entities: null,
    timeStamp: null,
    removeTimeStamp: null,
    updateTimeStamp: null,
    addTimeStamp: null,
    errorTimeStamp: null,
    commandErrorTimeStamp: null,
    editTimeStamp: null,
    sinContestarTimeStamp: null,
    entitySinContestar: null,
    entityChatReserva: null,
    chatReservaTimeStamp: null,
    recibirMensajetimeStamp: null,
    setCampanaTimeStamp: null
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state
    };

    switch (action.type) {
        case GET_SUCCESS:
            newState.entities = action.payload.receive
            newState.timeStamp = (new Date()).getTime();
            break;
        case EDIT:
            newState.editTimeStamp = (new Date()).getTime();
            newState.entities.currentItem = action.item
            newState.modo = action.modo;
            break;
        case UPDATE_SUCCESS:
            newState.updateTimeStamp = (new Date()).getTime();
            break;
        case PATCH_SUCCESS:
            newState.updateTimeStamp = (new Date()).getTime();
            break;
        case REMOVE_SUCCESS:
            newState.removeTimeStamp = (new Date()).getTime();
            break;
        case ADD_SUCCESS:
            newState.addTimeStamp = (new Date()).getTime();
            break;
        case GET_ERROR:
            newState.errorTimeStamp = (new Date()).getTime();
            break;
        case UPDATE_ERROR:
        case REMOVE_ERROR:
        case PATCH_ERROR:
        case ADD_ERROR:
            newState.commandErrorTimeStamp = (new Date()).getTime();
            break;
        case SIN_CONTESTAR_ERROR:
            newState.sinContestarErrorTimeStamp = (new Date()).getTime();
            break;
        case SIN_CONTESTAR_SUCCESS:
            newState.entitySinContestar = action.payload.receive
            newState.sinContestarTimeStamp = (new Date()).getTime();
            break;
        case RECIBIR_MENSAJE:
            newState.recibirMensajetimeStamp = (new Date()).getTime()
            break;
        case CHAT_RESERVA_SUCCESS:
            newState.entityChatReserva = action.payload.receive
            newState.chatReservaTimeStamp = (new Date()).getTime();
            break;
        case SET_CAMPANA_SUCCESS:
            if (action.payload.receive.length > 0) {
                newState.setCampanaTimeStamp = (new Date()).getTime()
            }
            break;
    }
    return newState;
};