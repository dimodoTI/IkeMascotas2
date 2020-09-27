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
    GETCANTIDAD,
    GETCANTIDAD_ERROR,
    GETCANTIDAD_SUCCESS,
    getCantidad

} from "./actions";

import {

    ikeMascotasVacunas,
    ikeMascotasVacunasQuery
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
        dispatch(apiRequest(ikeMascotasVacunasQuery, action.options, GET_SUCCESS, GET_ERROR))
    }
    if (action.type === GETCANTIDAD) {
        dispatch(apiRequest(ikeMascotasVacunasQuery, action.options, GETCANTIDAD_SUCCESS, GETCANTIDAD_ERROR))
    }
};

export const add = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === ADD) {
        dispatch(RESTAdd(ikeMascotasVacunas, action.body, ADD_SUCCESS, ADD_ERROR, action.token))
    }
};

export const update = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === UPDATE) {
        dispatch(RESTUpdate(ikeMascotasVacunas, action.id, action.body, UPDATE_SUCCESS, UPDATE_ERROR, action.token))
    }
};

export const patch = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === PATCH) {
        dispatch(RESTPatch(ikeMascotasVacunas, action.id, action.body, PATCH_SUCCESS, PATCH_ERROR, action.token))
    }
};

export const remove = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === REMOVE) {
        dispatch(RESTDelete(ikeMascotasVacunas, action.id, REMOVE_SUCCESS, REMOVE_ERROR, action.token))
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
    dispatch,
    getState
}) => next => action => {
    next(action);
    if (action.type === UPDATE_SUCCESS || action.type === REMOVE_SUCCESS || action.type === PATCH_SUCCESS || action.type === GETCANTIDAD_SUCCESS) {

    }
    if (action.type === ADD_SUCCESS) {
        dispatch(getCantidad({
            filter: "Activo",
            token: getState().cliente.datos.token
        }))
    }
};



export const processError = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === GET_ERROR || action.type === ADD_ERROR || action.type === UPDATE_ERROR || action.type === REMOVE_ERROR || action.type === PATCH_ERROR || action.type === GETCANTIDAD_ERROR) {

    }
};

export const middleware = [get, add, update, patch, remove, processGet, processComand, processError];