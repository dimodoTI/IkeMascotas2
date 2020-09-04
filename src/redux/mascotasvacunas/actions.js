export const GET = "[mascotasvacunas] GET";
export const ADD = "[mascotasvacunas] ADD";
export const PATCH = "[mascotasvacunas] PATCH";
export const UPDATE = "[mascotasvacunas] UPDATE";
export const REMOVE = "[mascotasvacunas] REMOVE";
export const EDIT = "[mascotasvacunas] EDIT"

export const GETCANTIDAD = "[mascotasvacunas] GETCANTIDAD";

export const GETCANTIDAD_SUCCESS = "[mascotasvacunas] GETCANTIDAD success";

export const GETCANTIDAD_ERROR = "[mascotasvacunas] GETCANTIDAD error";

export const GET_SUCCESS = "[mascotasvacunas] GET success";
export const ADD_SUCCESS = "[mascotasvacunas] ADD success";
export const PATCH_SUCCESS = "[mascotasvacunas] PATCH success";
export const UPDATE_SUCCESS = "[mascotasvacunas] UPDATE success";
export const REMOVE_SUCCESS = "[mascotasvacunas] REMOVE success";

export const GET_ERROR = "[mascotasvacunas] GET error";
export const ADD_ERROR = "[mascotasvacunas] ADD error";
export const PATCH_ERROR = "[mascotasvacunas] PATCH error";
export const UPDATE_ERROR = "[mascotasvacunas] UPDATE error";
export const REMOVE_ERROR = "[mascotasvacunas] REMOVE error";




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
        MascotaId: 0,
        VacunaId: 0,
        Fecha: "",
        Realizada: "",
        Activo: true
    },
    modo: modo,
})

export const getCantidad = (options) => ({
    type: GETCANTIDAD,
    options: options
})