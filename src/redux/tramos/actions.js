export const GET = "[tramos] GET";
export const ADD = "[tramos] ADD";
export const PATCH = "[tramos] PATCH";
export const UPDATE = "[tramos] UPDATE";
export const REMOVE = "[tramos] REMOVE";
export const EDIT = "[tramos] EDIT"


export const GET_SUCCESS = "[tramos] GET success";
export const ADD_SUCCESS = "[tramos] ADD success";
export const PATCH_SUCCESS = "[tramos] PATCH success";
export const UPDATE_SUCCESS = "[tramos] UPDATE success";
export const REMOVE_SUCCESS = "[tramos] REMOVE success";

export const GET_ERROR = "[tramos] GET error";
export const ADD_ERROR = "[tramos] ADD error";
export const PATCH_ERROR = "[tramos] PATCH error";
export const UPDATE_ERROR = "[tramos] UPDATE error";
export const REMOVE_ERROR = "[tramos] REMOVE error";




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
        PuestoId: 0,
        Dia: 0,
        HoraInicio: 0,
        HoraFin: 0,
        FechaFin: "",
        Activo: 1
    },
    modo: modo,
})