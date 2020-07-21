export const GET = "[usuario] GET";
export const ADD = "[usuario] ADD";
export const PATCH = "[usuario] PATCH";
export const UPDATE = "[usuario] UPDATE";
export const REMOVE = "[usuario] REMOVE";

export const GET_SUCCESS = "[usuario] GET success";
export const ADD_SUCCESS = "[usuario] ADD success";
export const PATCH_SUCCESS = "[usuario] PATCH success";
export const UPDATE_SUCCESS = "[usuario] UPDATE success";
export const REMOVE_SUCCESS = "[usuario] REMOVE success";

export const GET_ERROR = "[usuario] GET error";
export const ADD_ERROR = "[usuario] ADD error";
export const PATCH_ERROR = "[usuario] PATCH error";
export const UPDATE_ERROR = "[usuario] UPDATE error";
export const REMOVE_ERROR = "[usuario] REMOVE error";




export const get = (id, token) => ({
    type: GET,
    id: id,
    token: token
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