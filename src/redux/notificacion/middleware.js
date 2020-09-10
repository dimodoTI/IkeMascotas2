import {
    GET,
    GET_SUCCESS,
    GET_ERROR,
    GET_DETALLE_CABECERA,
    GET_DETALLE_CABECERA_SUCCESS,
    GET_DETALLE_CABECERA_ERROR,
    GET_NOTIFICACION_PENDIENTES,
    GET_NOTIFICACION_PENDIENTES_SUCCESS,
    GET_NOTIFICACION_PENDIENTES_ERROR,
    GET_NOTIFICACION_CHAT_PENDIENTES,
    GET_NOTIFICACION_CHAT_PENDIENTES_SUCCESS,
    GET_NOTIFICACION_CHAT_PENDIENTES_ERROR,
    PATCH,
    PATCH_SUCCESS,
    PATCH_ERROR,
    LEIDO,
    LEIDO_ERROR,
    LEIDO_SUCCESS,
    getNotificacionChatPendientes as getPendientes
} from "../notificacion/actions";

import {
    SIN_CONTESTAR_SUCCESS,
    SIN_CONTESTAR_ERROR,
    setCampana
} from "../chat/actions"

import {
    ikeNotificacionDetalleQuery,
    ikeNotificacionDetalle,
    ikeChatQuery,
    ikeChat

} from "../fetchs"

import {
    RESTPatch,
    RESTAdd
} from "../rest/actions"

import {
    apiRequest
} from "../api/actions"
import {
    showWarning
} from "../ui/actions";
import {
    showSpinner,
    hideSpinner
} from "../api/actions"

import {
    goTo
} from "../../redux/routing/actions"

export const get = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === GET || action.type === GET_DETALLE_CABECERA || action.type === GET_NOTIFICACION_PENDIENTES) {
        dispatch(apiRequest(ikeNotificacionDetalleQuery, action.options, action.onSuccess, action.onError))
    }
};

export const getNotificacionChatPendientes = ({
    dispatch,
    getState
}) => next => action => {
    next(action);
    if (action.type === GET_NOTIFICACION_CHAT_PENDIENTES) {
        const optionsChat = {}
        optionsChat.expand = "Usuario,Reserva($expand=Mascota($select=Nombre))"
        optionsChat.filter = "((Respondido eq 0 and  Tipo eq 0 ) or (Leido eq 0 and  Tipo eq 1 ))  and Reserva/UsuarioId eq " + action.clienteId
        const optionsNotif = {}
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
            var notificaciones = []
            if (dataChat.length > 0) {
                dataChat.forEach(function (p) {
                    let arr = {
                        fecha: p.Fecha,
                        tipo: p.Tipo,
                        item: {
                            mascota: p.Reserva.Mascota.Nombre,
                            motivo: p.Reserva.Motivo,
                            texto: p.Texto,
                            reservaId: p.ReservaId,
                            chatId: p.Id,
                            usuarioId: p.UsuarioId
                        }
                    }
                    notificaciones.push(arr)
                })
            }
            if (dataNotif.length > 0) {
                dataNotif.forEach(function (p) {
                    let arr = {
                        fecha: p.Cabecera.Fecha,
                        tipo: 2,
                        item: {
                            cabeceraId: p.CabeceraId,
                            detalleId: p.Id,
                            usuarioId: p.Cabecera.UsuarioId,
                            titulo: p.Cabecera.Titulo,
                            texto: p.Cabecera.Texto,
                            link: p.Cabecera.Link
                        }
                    }
                    notificaciones.push(arr)
                })
            }

            dispatch({
                type: GET_NOTIFICACION_CHAT_PENDIENTES_SUCCESS,
                payload: {
                    send: null,
                    receive: notificaciones.length == 0 ? null : notificaciones
                }
            })
            dispatch(hideSpinner(ikeChatQuery))
            dispatch(goTo("notificacionReservas"))


        }).catch(() => {
            dispatch({
                type: GET_NOTIFICACION_CHAT_PENDIENTES_ERROR
            })
            dispatch(hideSpinner(ikeChatQuery))
            dispatch(showWarning())
        })
    }
};

export const patch = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === PATCH) {
        dispatch(RESTPatch(ikeNotificacionDetalle, action.id, action.body, PATCH_SUCCESS, PATCH_ERROR, action.token))
    }
};



export const leido = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === LEIDO) {
        dispatch(RESTAdd(ikeNotificacionDetalle, action.body, LEIDO_SUCCESS, LEIDO_ERROR, action.token, action.id))
    }
};

export const processGet = ({
    dispatch,
    getState
}) => next => action => {
    next(action);
    if (action.type === GET_SUCCESS || action.type === GET_DETALLE_CABECERA_SUCCESS) {

    }
    if (action.type === GET_NOTIFICACION_PENDIENTES_SUCCESS) {
        dispatch(setCampana(getState().cliente.datos.id))

    }



};

export const processComand = ({
    dispatch,
    getState
}) => next => action => {
    next(action);
    if (action.type === PATCH_SUCCESS) {

    }
    if (action.type === LEIDO_SUCCESS) {
        dispatch(getPendientes(getState().cliente.datos.id))
        dispatch(setCampana(getState().cliente.datos.id))
    }
};

export const processError = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === GET_ERROR || action.type === GET_DETALLE_CABECERA_ERROR || action.type === PATCH_ERROR || action.type === LEIDO_ERROR) {

    }
};

export const middleware = [get, getNotificacionChatPendientes, patch, leido, processGet, processComand, processError];