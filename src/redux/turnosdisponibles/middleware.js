import {
    GET,
    GET_SUCCESS,
    GET_ERROR


} from "./actions";

import {
    ikeTurnosDisponibles
} from "../fetchs"



import {
    RESTRequest
} from "../rest/actions"

export const get = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === GET) {
        dispatch(RESTRequest(ikeTurnosDisponibles, action.options, GET_SUCCESS, GET_ERROR))
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