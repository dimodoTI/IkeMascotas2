import {
    GET,
    GET_SUCCESS,
    GET_ERROR,
    ADD,
    ADD_SUCCESS,
    ADD_ERROR,
    UPDATE,
    UPDATE_SUCCESS,
    UPDATE_ERROR,
    PATCH,
    PATCH_SUCCESS,
    PATCH_ERROR,
    REMOVE,
    REMOVE_SUCCESS,
    REMOVE_ERROR,
    SIN_CONTESTAR,
    SIN_CONTESTAR_SUCCESS,
    SIN_CONTESTAR_ERROR,
    CHAT_RESERVA_SUCCESS,
    CHAT_RESERVA,
    CHAT_RESERVA_ERROR,
    SET_CAMPANA,
    SET_CAMPANA_SUCCESS,
    SET_CAMPANA_ERROR,
    recibirMensaje,
    setCampana as setCampanaAction,
    ADD_PREGUNTA_SUCCESS,
    sinContestar,
    CHAT_RESERVAM_SUCCESS,
    CHAT_RESERVAR_SUCCESS
} from "./actions";

import {
    ikeChatQuery,
    ikeChat,
    ikeNotificacionDetalleQuery
} from "../fetchs"

import {

    RESTAdd,
    RESTDelete,
    RESTUpdate,
    RESTPatch
} from "../rest/actions"

import {
    showSpinner,
    hideSpinner
} from "../api/actions"

import {
    apiRequest
} from "../api/actions"

import {
    goTo
} from "../../redux/routing/actions"
import {
    reservaParaChat
} from "../reservas/actions";
import {
    getNotificacionPendientes
} from "../notificacion/actions";

export const get = ({
    dispatch,
    getState
}) => next => action => {
    next(action);
    if (action.type === GET || action.type == CHAT_RESERVA || action.type == SIN_CONTESTAR) {
        dispatch(apiRequest(ikeChatQuery, action.options, action.onSuccess, action.onError))
    }

}

export const setCampana = ({
    dispatch,
    getState
}) => next => action => {
    next(action);
    if (action.type === SET_CAMPANA) {
        const optionsChat = {}
        optionsChat.top = 1
        optionsChat.expand = "Usuario,Reserva($expand=Mascota($select=Nombre))"
        optionsChat.filter = "Tipo eq 1 and Leido eq 0 and Reserva/UsuarioId eq " + action.clienteId
        const optionsNotif = {}
        optionsNotif.top = 1
        optionsNotif.expand = "Cabecera"
        optionsNotif.filter = "Leido eq 0 and ClienteId eq " + action.clienteId
        var dataChat = null
        var dataNotif = null
        dispatch(showSpinner(ikeChatQuery))
        Promise.all([
            ikeChatQuery.get(optionsChat).then((data) => {
                dataChat = data
            }).catch((err) => {
                throw err
            }),
            ikeNotificacionDetalleQuery.get(optionsNotif).then((data) => {
                dataNotif = data
            }).catch((err) => {
                throw err
            })
        ]).then((value) => {
            var estado = false
            if (dataChat.length > 0 || dataNotif.length > 0) {
                //dispatch(showCampana());
                estado = true
            }
            dispatch({
                type: SET_CAMPANA_SUCCESS,
                payload: {
                    send: null,
                    receive: estado
                }
            })
            dispatch(hideSpinner(ikeChatQuery))
        }).catch(() => {
            dispatch({
                type: SET_CAMPANA_ERROR
            })
            dispatch(hideSpinner(ikeChatQuery))
            //dispatch(showWarning())
        })
    }
};

export const add = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === ADD) {
        dispatch(RESTAdd(ikeChat, action.body, action.onSuccess, action.onError, action.token))
    }
};

export const update = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === UPDATE) {
        dispatch(RESTUpdate(ikeChat, action.id, action.body, UPDATE_SUCCESS, UPDATE_ERROR, action.token))
    }
};

export const patch = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === PATCH) {
        dispatch(RESTPatch(ikeChat, action.id, action.body, PATCH_SUCCESS, PATCH_ERROR, action.token))
    }
};

export const remove = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === REMOVE) {
        dispatch(RESTDelete(ikeChat, action.id, REMOVE_SUCCESS, REMOVE_ERROR, action.token))
    }
};


export const processGet = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === GET_SUCCESS) {

    }

    if (action.type === SIN_CONTESTAR_SUCCESS) {
        // if (action.payload.receive.length > 0) {
        dispatch(goTo("notificacionReservas"))
        // }
    }
    if (action.type === CHAT_RESERVA_SUCCESS) {
        dispatch(goTo("chatApp"))
    }

    if (action.type === CHAT_RESERVAM_SUCCESS) {
        dispatch(goTo("chatAppM"))
    }
    if (action.type === CHAT_RESERVAR_SUCCESS) {
        dispatch(goTo("chatAppR"))
    }

    if (action.type === SET_CAMPANA_SUCCESS) {
        //dispatch(recibirMensaje())
    }
};

export const processComand = ({
    dispatch,
    getState
}) => next => action => {
    next(action);
    if (action.type === ADD_SUCCESS || action.type === UPDATE_SUCCESS || action.type === REMOVE_SUCCESS) {

    }
    if (action.type === ADD_PREGUNTA_SUCCESS) {
        dispatch(sinContestar(getState().cliente.datos.id))
        dispatch(setCampanaAction(getState().cliente.datos.id))
    }
    if (action.type === PATCH_SUCCESS) {
        dispatch(setCampanaAction(getState().cliente.datos.id))
    }
};



export const processError = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === GET_ERROR || action.type === ADD_ERROR || action.type === UPDATE_ERROR || action.type === REMOVE_ERROR || action.type === PATCH_ERROR || action.type === SIN_CONTESTAR_ERROR || action.type === CHAT_RESERVA_ERROR || action.type === SET_CAMPANA_ERROR) {

    }
};

export const middleware = [get, add, setCampana, update, patch, remove, processGet, processComand, processError];