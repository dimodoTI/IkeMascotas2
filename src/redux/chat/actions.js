export const GET = "[chat] GET";
export const ADD = "[chat] ADD";
export const PATCH = "[chat] PATCH";
export const UPDATE = "[chat] UPDATE";
export const REMOVE = "[chat] REMOVE";
export const EDIT = "[chat] EDIT"


export const GET_SUCCESS = "[chat] GET success";
export const ADD_SUCCESS = "[chat] ADD success";
export const PATCH_SUCCESS = "[chat] PATCH success";
export const UPDATE_SUCCESS = "[chat] UPDATE success";
export const REMOVE_SUCCESS = "[chat] REMOVE success";

export const GET_ERROR = "[chat] GET error";
export const ADD_ERROR = "[chat] ADD error";
export const PATCH_ERROR = "[chat] PATCH error";
export const UPDATE_ERROR = "[chat] UPDATE error";
export const REMOVE_ERROR = "[chat] REMOVE error";

export const SIN_CONTESTAR = "[chat] SIN_CONTESTAR"
export const SIN_CONTESTAR_SUCCESS = "[chat] SIN_CONTESTAR_SUCCESS"

export const SIN_CONTESTAR_ERROR = "[chat] SIN_CONTESTAR_ERROR"





export const get = (options) => ({
    type: GET,
    options: options
});

export const add = (body, token) => ({
    type: ADD,
    body: body,
    token: token
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

export const sinContestar = (usuarioId) => ({
    type: SIN_CONTESTAR,
    options: {
        expand: "Usuario,Reserva($expand=Mascota($select=Nombre))",
        filter: "contains(Usuario/Perfil,'Mascota') and Reserva/UsuarioId eq " + usuarioId,
        orderby: "ReservaId desc, Id"
    }
})