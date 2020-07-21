export const GET = "[atenciones] GET";
export const ADD = "[atenciones] ADD";
export const PATCH = "[atenciones] PATCH";
export const UPDATE = "[atenciones] UPDATE";
export const REMOVE = "[atenciones] REMOVE";
export const EDIT = "[atenciones] EDIT"


export const GET_SUCCESS = "[atenciones] GET success";
export const ADD_SUCCESS = "[atenciones] ADD success";
export const PATCH_SUCCESS = "[atenciones] PATCH success";
export const UPDATE_SUCCESS = "[atenciones] UPDATE success";
export const REMOVE_SUCCESS = "[atenciones] REMOVE success";

export const GET_ERROR = "[atenciones] GET error";
export const ADD_ERROR = "[atenciones] ADD error";
export const PATCH_ERROR = "[atenciones] PATCH error";
export const UPDATE_ERROR = "[atenciones] UPDATE error";
export const REMOVE_ERROR = "[atenciones] REMOVE error";




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
        ReservaId: 0,
        VeterinarioId: 0,
        InicioAtencion: "",
        FinAtencion: "",
        Diagnostico: "",
        Observaciones: "",
        Estdo: 0,
        Calificacion: 0,
        ComentarioCalificacion: "",
        Activo: 1
    },
    modo: modo,
})