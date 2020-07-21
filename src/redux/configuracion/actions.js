export const GET = "[configuracion] GET";
export const ADD = "[configuracion] ADD";
export const PATCH = "[configuracion] PATCH";
export const UPDATE = "[configuracion] UPDATE";
export const REMOVE = "[configuracion] REMOVE";
export const EDIT = "[configuracion] EDIT"


export const GET_SUCCESS = "[configuracion] GET success";
export const ADD_SUCCESS = "[configuracion] ADD success";
export const PATCH_SUCCESS = "[configuracion] PATCH success";
export const UPDATE_SUCCESS = "[configuracion] UPDATE success";
export const REMOVE_SUCCESS = "[configuracion] REMOVE success";

export const GET_ERROR = "[configuracion] GET error";
export const ADD_ERROR = "[configuracion] ADD error";
export const PATCH_ERROR = "[configuracion] PATCH error";
export const UPDATE_ERROR = "[configuracion] UPDATE error";
export const REMOVE_ERROR = "[configuracion] REMOVE error";




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
    item: item || {
        DiasReserva: 0,
        TurnosxHora: 0
    },
    modo: modo,
})