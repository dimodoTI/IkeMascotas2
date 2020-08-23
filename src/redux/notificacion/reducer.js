import {
    GET_SUCCESS,
    GET_ERROR,
    PATCH_SUCCESS,
    PATCH_ERROR,
    GET_DETALLE_CABECERA_SUCCESS,
    GET_DETALLE_CABECERA_ERROR,
    GET_NOTIFICACION_PENDIENTES_SUCCESS,
    GET_NOTIFICACION_PENDIENTES_ERROR,
    GET_NOTIFICACION_CHAT_PENDIENTES_SUCCESS,
    GET_NOTIFICACION_CHAT_PENDIENTES_ERROR,
    LEIDO_ERROR,
    LEIDO_SUCCESS
} from "../notificacion/actions";
import {
    store
} from "../store";


const initialState = {
    entities: null,
    timeStamp: null,
    updateTimeStamp: null,
    errorTimeStamp: null,
    commandErrorTimeStamp: null,
    entityDetalleCabecera: null,
    entityDetalleCabeceraError: null,
    entityDetalleCabeceraTimeStamp: null,
    entityNotificacionPendiente: null,
    entityNotificacionPendienteError: null,
    entityNotificacionPendienteTimeStamp: null,
    entityNotificacionChatPendiente: null,
    entityNotificacionChatPendienteError: null,
    entityNotificacionChatPendienteTimeStamp: null,

}


export const reducer = (state = initialState, action) => {
    const newState = {
        ...state
    };

    switch (action.type) {
        case GET_SUCCESS:
            newState.entities = action.payload.receive
            newState.timeStamp = (new Date()).getTime();
            break;
        case GET_DETALLE_CABECERA_SUCCESS:
            newState.entityDetalleCabecera = action.payload.receive
            newState.entityDetalleCabeceraTimeStamp = (new Date()).getTime();
            break;
        case GET_NOTIFICACION_CHAT_PENDIENTES_SUCCESS:
            newState.entityNotificacionChatPendiente = action.payload.receive
            newState.entityNotificacionChatPendienteTimeStamp = (new Date()).getTime();
            break;
        case PATCH_SUCCESS:
        case LEIDO_SUCCESS:
            newState.updateTimeStamp = (new Date()).getTime();
            break;
        case GET_ERROR:
            newState.errorTimeStamp = (new Date()).getTime();
            break;
        case GET_DETALLE_CABECERA_ERROR:
            newState.entityDetalleCabeceraError = (new Date()).getTime();
            break;
        case GET_NOTIFICACION_PENDIENTES_ERROR:
            newState.entityNotificacionPendienteError = (new Date()).getTime();
            break;
        case GET_NOTIFICACION_CHAT_PENDIENTES_ERROR:
            newState.entityNotificacionChatPendienteError = (new Date()).getTime();
            break;
        case PATCH_ERROR:
        case LEIDO_ERROR:
            newState.commandErrorTimeStamp = (new Date()).getTime();
            break;


    }
    return newState;
};