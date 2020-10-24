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
    UPLOAD,
    UPLOAD_ERROR,
    UPLOAD_SUCCESS,
    DEL_CLIENTE,
    DEL_CLIENTE_SUCCESS,
    DEL_CLIENTE_ERROR,
    DEL_VETERINARIO,
    DEL_VETERINARIO_SUCCESS,
    DEL_VETERINARIO_ERROR,
    delCliente,
    BORRARADJUNTO,
    BORRARADJUNTO_ERROR,
    BORRARADJUNTO_SUCCESS,
} from "./actions";

import {
    ikeAdjuntosQuery,
    ikeAdjuntos
} from "../fetchs"

import {

    RESTAdd,
    RESTDelete,
    RESTUpdate,
    RESTPatch
} from "../rest/actions"

import {
    apiRequest
} from "../api/actions"
import {
    store
} from "../store";
import {
    showSpinner,
    hideSpinner
} from "../ui/actions";

export const get = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === GET) {
        dispatch(apiRequest(ikeAdjuntosQuery, action.options, GET_SUCCESS, GET_ERROR))
    }
    if (action.type === DEL_CLIENTE) {
        dispatch(apiRequest(ikeAdjuntosQuery, action.options, DEL_CLIENTE_SUCCESS, DEL_CLIENTE_ERROR))
    }
    if (action.type === DEL_VETERINARIO) {
        dispatch(apiRequest(ikeAdjuntosQuery, action.options, DEL_VETERINARIO_SUCCESS, DEL_VETERINARIO_ERROR))
    }

};

export const add = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === ADD) {
        dispatch(RESTAdd(ikeAdjuntos, action.body, ADD_SUCCESS, ADD_ERROR, action.token))
    }
};

export const update = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === UPDATE) {
        dispatch(RESTUpdate(ikeAdjuntos, action.id, action.body, UPDATE_SUCCESS, UPDATE_ERROR, action.token))
    }
};

export const patch = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === PATCH) {
        dispatch(RESTPatch(ikeAdjuntos, action.id, action.body, action.onSuccess, action.onError, action.token))
    }
    if (action.type === BORRARADJUNTO) {
        dispatch(RESTPatch(ikeAdjuntos, action.id, action.body, action.onSuccess, action.onError, action.token))
    }
};

export const remove = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === REMOVE) {
        dispatch(RESTDelete(ikeAdjuntos, action.id, REMOVE_SUCCESS, REMOVE_ERROR, action.token))
    }
};


export const processGet = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === GET_SUCCESS) {

    }
    if (action.type === DEL_CLIENTE_SUCCESS) {

    }
    if (action.type === DEL_VETERINARIO_SUCCESS) {

    }
};

export const processComand = ({
    dispatch,
    getState
}) => next => action => {
    next(action);
    if (action.type === ADD_SUCCESS || action.type === UPDATE_SUCCESS || action.type === REMOVE_SUCCESS || action.type === PATCH_SUCCESS) {

    }
    if (action.type === BORRARADJUNTO_SUCCESS) {
        dispatch(delCliente(getState().reservas.entities.enAtencion.registro.Id, getState().cliente.datos.token))
    }
    /*     if (action.type === BORRARADJUNTOR_SUCCESS){
            
        } */
};



export const processError = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === GET_ERROR || action.type === ADD_ERROR || action.type === UPDATE_ERROR || action.type === REMOVE_ERROR || action.type === PATCH_ERROR || action.type === UPLOAD_ERROR || action.type === DEL_CLIENTE_ERROR || action.type === DEL_VETERINARIO_ERROR || action.type === BORRARADJUNTO_ERROR) {

    }
};

export const upload = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === UPLOAD) {
        dispatch(showSpinner())
        fetch("https://apis.mascotas.ikeargentina.com.ar/api/Adjuntos/UploadFile", {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer " + action.token
            },
            body: action.body
        }).then(
            Response => {

                store.dispatch({
                    type: UPLOAD_SUCCESS
                })
                store.dispatch(hideSpinner())
                store.dispatch(delCliente(action.reservaId, action.token))
            }
        ).catch(error => {
            store.dispatch({
                type: UPLOAD_ERROR

            })
            store.dispatch(hideSpinner())
        })

    }
}

export const middleware = [get, add, update, upload, patch, remove, processGet, processComand, processError];