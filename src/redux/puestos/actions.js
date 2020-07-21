export const GET = "[puestos] GET";
export const ADD = "[puestos] ADD";
export const PATCH = "[puestos] PATCH";
export const UPDATE = "[puestos] UPDATE";
export const REMOVE = "[puestos] REMOVE";
export const EDIT = "[puestos] EDIT"


export const GET_SUCCESS = "[puestos] GET success";
export const ADD_SUCCESS = "[puestos] ADD success";
export const PATCH_SUCCESS = "[puestos] PATCH success";
export const UPDATE_SUCCESS = "[puestos] UPDATE success";
export const REMOVE_SUCCESS = "[puestos] REMOVE success";

export const GET_ERROR = "[puestos] GET error";
export const ADD_ERROR = "[puestos] ADD error";
export const PATCH_ERROR = "[puestos] PATCH error";
export const UPDATE_ERROR = "[puestos] UPDATE error";
export const REMOVE_ERROR = "[puestos] REMOVE error";




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
        Descripcion: 0,
        Activo: 1
    },
    modo: modo,
})