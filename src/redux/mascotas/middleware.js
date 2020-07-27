import {
    GET,
    GET_SUCCESS,
    GET_ERROR,
    ADD,
    ADD_SUCCESS,
    ADD_ERROR,
    UPDATE,
    UPDATE_SUCCESS,
    UPDATE_ERROR,
    PATCH,
    PATCH_SUCCESS,
    PATCH_ERROR,
    REMOVE,
    REMOVE_SUCCESS,
    REMOVE_ERROR,
    GETEDIT,
    GETEDIT_ERROR,
    GETEDIT_SUCCESS
} from "./actions";

import {
    ikeMascotas,
    ikeMascotasQuery
} from "../fetchs"

import {
    RESTRequest,
    RESTAdd,
    RESTDelete,
    RESTUpdate,
    RESTPatch
} from "../rest/actions"

import {
    apiRequest
} from "../api/actions"

export const get = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === GET) {
        dispatch(apiRequest(ikeMascotasQuery, action.options, GET_SUCCESS, GET_ERROR))
    }
};

export const getEdit = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === GETEDIT) {
        dispatch(apiRequest(ikeMascotasQuery, action.options, GETEDIT_SUCCESS, GETEDIT_ERROR))
    }
};

export const add = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === ADD) {
        dispatch(RESTAdd(ikeMascotas, action.body, ADD_SUCCESS, ADD_ERROR, action.token))
    }
};

export const update = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === UPDATE) {
        dispatch(RESTUpdate(ikeMascotas, action.id, action.body, UPDATE_SUCCESS, UPDATE_ERROR, action.token))
    }
};

export const patch = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === PATCH) {
        dispatch(RESTPatch(ikeMascotas, action.id, action.body, PATCH_SUCCESS, PATCH_ERROR, action.token))
    }
};

export const remove = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === REMOVE) {
        dispatch(RESTDelete(ikeMascotas, action.id, REMOVE_SUCCESS, REMOVE_ERROR, action.token))
    }
};


export const processGet = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === GET_SUCCESS) {

    }
};

export const processComand = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === ADD_SUCCESS || action.type === UPDATE_SUCCESS || action.type === REMOVE_SUCCESS || action.type === PATCH_SUCCESS || action.type == GETEDIT_SUCCESS) {

    }
};



export const processError = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === GET_ERROR || action.type === ADD_ERROR || action.type === UPDATE_ERROR || action.type === REMOVE_ERROR || action.type === PATCH_ERROR || GETEDIT_ERROR) {

    }
};

export const middleware = [get, add, update, patch, remove, getEdit, processGet, processComand, processError];