import {
    GET,
    GET_SUCCESS,
    GET_ERROR,
} from "./actions";

import {
    showSpinner,
    hideSpinner,
    showError
} from "../ui/actions";

import {
    ikeOdataPublicaciones
} from "../fetchs"

import {
    RESTRequest,

} from "../rest/actions"

import {
    apiRequest
} from "../api/actions"

export const get = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === GET) {
        //dispatch(RESTRequest(ikePublicaciones, action.id, GET_SUCCESS, GET_ERROR))
        dispatch(apiRequest(ikeOdataPublicaciones, action.options, GET_SUCCESS, GET_ERROR))
    }
};


export const processGet = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === GET_SUCCESS) {

    }
};



export const processError = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === GET_ERROR) {

    }
};

export const middleware = [get, processGet, processError];