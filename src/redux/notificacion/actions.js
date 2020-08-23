export const GET = "[notificacion] GET";
export const GET_DETALLE_CABECERA = "[notificacion] GET_DETALLE_CABECERA";
export const GET_NOTIFICACION_PENDIENTES = "[notificacion] GET_NOTIFICACION_PENDIENTES";
export const GET_NOTIFICACION_CHAT_PENDIENTES = "[notificacion] GET_NOTIFICACION_CHAT_PENDIENTES";
export const PATCH = "[notificacion] PATCH";

export const GET_SUCCESS = "[notificacion] GET success";
export const GET_DETALLE_CABECERA_SUCCESS = "[notificacion] GET_DETALLE_CABECERA success";
export const GET_NOTIFICACION_PENDIENTES_SUCCESS = "[notificacion] GET_NOTIFICACION_PENDIENTES success";
export const GET_NOTIFICACION_CHAT_PENDIENTES_SUCCESS = "[notificacion] GET_NOTIFICACION_CHAT_PENDIENTES success";
export const PATCH_SUCCESS = "[notificacion] PATCH success";

export const GET_ERROR = "[notificacion] GET error";
export const GET_DETALLE_CABECERA_ERROR = "[notificacion] GET_DETALLE_CABECERA error";
export const GET_NOTIFICACION_PENDIENTES_ERROR = "[notificacion] GET_NOTIFICACION_PENDIENTES error";
export const GET_NOTIFICACION_CHAT_PENDIENTES_ERROR = "[notificacion] GET_NOTIFICACION_CHAT_PENDIENTES error";
export const PATCH_ERROR = "[notificacion] PATCH error";

export const LEIDO = "[notificacion] leido"
export const LEIDO_SUCCESS = "[notificacion] leido success"
export const LEIDO_ERROR = "[notificacion] leido error"


export const get = (options, onSuccess = GET_SUCCESS, onError = GET_ERROR) => ({
    type: GET,
    options: options,
    onSuccess: onSuccess,
    onError: onError
});

export const getDetalleCabecera = (filter, onSuccess = GET_DETALLE_CABECERA_SUCCESS, onError = GET_DETALLE_CABECERA_ERROR) => ({
    type: GET_DETALLE_CABECERA,
    options: {
        filter: filter,
        expand: "Cabecera",
        orderby: "Cabecera/Fecha"
    },
    onSuccess: onSuccess,
    onError: onError
});

export const getNotificacionPendientes = (clienteId, onSuccess = GET_NOTIFICACION_PENDIENTES_SUCCESS, onError = GET_NOTIFICACION_PENDIENTES_ERROR) => ({
    type: GET_NOTIFICACION_PENDIENTES,
    clienteId: clienteId,
    options: {
        top: 1,
        filter: "Leido eq 0 and ClienteId eq " + clienteId,
        expand: "Cabecera",
        orderby: "Cabecera/Fecha"
    },
    onSuccess: onSuccess,
    onError: onError
});

export const getNotificacionChatPendientes = (clienteId, onSuccess = GET_NOTIFICACION_CHAT_PENDIENTES_SUCCESS, onError = GET_NOTIFICACION_CHAT_PENDIENTES_ERROR) => ({
    type: GET_NOTIFICACION_CHAT_PENDIENTES,
    clienteId: clienteId,
    onSuccess: onSuccess,
    onError: onError
});

export const patch = (id, body, token) => ({
    type: PATCH,
    id: id,
    body: body,
    token: token
});

export const leido = (id, body, token) => ({
    type: LEIDO,
    id: id,
    body: body,
    token: token
});