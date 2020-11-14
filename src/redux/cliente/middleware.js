/** @format */

import { GET_COBERTURA, GET_COBERTURA_SUCCESS, GET_COBERTURA_ERROR } from "./actions";

export const get = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === GET_COBERTURA) {
        fetch("https://api.atencionike.com.ar/services/socio2?pDocumento=" + action.dni, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                dispatch({ type: GET_COBERTURA_SUCCESS, data: data });
            })
            .catch((error) => {
                dispatch({ type: GET_COBERTURA_ERROR, error: error });
            });
    }
};

export const processGet = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === GET_COBERTURA_SUCCESS) {
    }
};

export const processError = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === GET_COBERTURA_ERROR) {
    }
};

export const middleware = [get, processGet, processError];
