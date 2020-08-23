export const GET = "[chat] GET";
export const ADD = "[chat] ADD";
export const PATCH = "[chat] PATCH";
export const UPDATE = "[chat] UPDATE";
export const REMOVE = "[chat] REMOVE";
export const EDIT = "[chat] EDIT"
export const CHAT_RESERVA = "[chat] CHAT_RESERVA";


export const GET_SUCCESS = "[chat] GET success";
export const ADD_SUCCESS = "[chat] ADD success";
export const PATCH_SUCCESS = "[chat] PATCH success";
export const UPDATE_SUCCESS = "[chat] UPDATE success";
export const REMOVE_SUCCESS = "[chat] REMOVE success";
export const CHAT_RESERVA_SUCCESS = "[chat] CHAT_RESERVA success";

export const GET_ERROR = "[chat] GET error";
export const ADD_ERROR = "[chat] ADD error";
export const PATCH_ERROR = "[chat] PATCH error";
export const UPDATE_ERROR = "[chat] UPDATE error";
export const REMOVE_ERROR = "[chat] REMOVE error";
export const CHAT_RESERVA_ERROR = "[chat] CHAT_RESERVA error";
export const SET_CAMPANA = "[chat] SET_CAMPANA"


export const SIN_CONTESTAR = "[chat] SIN_CONTESTAR"
export const SIN_CONTESTAR_SUCCESS = "[chat] SIN_CONTESTAR_SUCCESS"
export const SET_CAMPANA_SUCCESS = "[chat] SET_CAMPANA_SUCCESS"
export const SET_CAMPANA_ERROR = "[chat] SET_CAMPANA_ERROR"

export const SIN_CONTESTAR_ERROR = "[chat] SIN_CONTESTAR_ERROR"
export const RECIBIR_MENSAJE = "[chat] RECIBIR_MENSAJE"

export const ADD_PREGUNTA_SUCCESS = "[chat] ADD_PREGUNTA_SUCCESS"

export const CHAT_RESERVAM_SUCCESS = "[chat] CHAT_RESERVAM success";
export const CHAT_RESERVAR_SUCCESS = "[chat] CHAT_RESERVAR success";



export const get = (options, onSuccess = GET_SUCCESS, onError = GET_ERROR) => ({
    type: GET,
    options: options,
    onSuccess: onSuccess,
    onError: onError
});

export const add = (body, token, onSuccess = ADD_SUCCESS, onError = ADD_ERROR) => ({
    type: ADD,
    body: body,
    token: token,
    onSuccess: onSuccess,
    onError: onError
});

export const update = (id, body, token) => ({
    type: UPDATE,
    id: id,
    body: body,
    token: token
});

export const patch = (id, body, token) => ({
    type: PATCH,
    id: id,
    body: body,
    token: token
});

export const remove = (id, token) => ({
    type: REMOVE,
    id: id,
    token: token
});

export const edit = (modo, item) => ({
    type: EDIT,
    item: item
})

export const sinContestar = (usuarioId, onSuccess = SIN_CONTESTAR_SUCCESS, onError = SIN_CONTESTAR_ERROR) => ({
    type: SIN_CONTESTAR,
    options: {
        expand: "Usuario,Reserva($expand=Mascota($select=Nombre))",
        filter: "((Respondido eq 0 and  Tipo eq 0 ) or (Leido eq 0 and  Tipo eq 1 ))  and Reserva/UsuarioId eq " + usuarioId,
        orderby: "Id desc"
    },
    onSuccess: onSuccess,
    onError: onError
})

export const chatReserva = (reservaId, onSuccess = CHAT_RESERVA_SUCCESS, onError = CHAT_RESERVA_ERROR) => ({
    type: CHAT_RESERVA,
    options: {
        filter: "ReservaId eq " + reservaId,
        expand: "Reserva($expand=Mascota($select=Nombre))",
        orderby: "Id desc"
    },
    onSuccess: onSuccess,
    onError: onError,
})

export const setCampana = (clienteId, onSuccess = SET_CAMPANA_SUCCESS, onError = SET_CAMPANA_ERROR) => ({
    type: SET_CAMPANA,
    clienteId: clienteId,
    onSuccess: onSuccess,
    onError: onError
})

export const recibirMensaje = () => ({
    type: RECIBIR_MENSAJE
});