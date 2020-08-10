import {
    LOGIN,
    RECUPERO,
    RENOVACION,
    LOGON,
    UPDATE_PROFILE,
    LOGIN_SUCCESS,
    RECUPERO_SUCCESS,
    RENOVACION_SUCCESS,
    LOGON_SUCCESS,
    UPDATE_PROFILE_SUCCESS,
    LOGIN_ERROR,
    RECUPERO_ERROR,
    RENOVACION_ERROR,
    LOGON_ERROR,
    UPDATE_PROFILE_ERROR
} from "./actions";

import {
    ikeLoginFetch,
    ikeRecuperoFetch,
    ikeRenovacionFetch,
    ikeLogonFetch,
    ikeUpdateProfileFetch,
    ikeChatQuery
} from "../fetchs"

import {
    RESTAdd,
} from "../rest/actions"
import {
    setDatos,
    setLogueado,
    setRecuperando,
    setRenovado
} from "../cliente/actions";

import {
    get as getMascotas,
    getCantidad
}
from "../mascotas/actions"

import {
    get as getMascotasVacunas
} from "../mascotasvacunas/actions"

import {
    get as getReservas
} from "../reservas/actions"

import {
    showSpinner,
    hideSpinner,
    showError,
    recibirMensaje
} from "../ui/actions";
import {
    goTo
} from "../routing/actions";

import {
    get as getChat
} from "../chat/actions"

const NEW_CONNECTION = "new-connection"
let connection = null

export const login = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === LOGIN) {
        dispatch(RESTAdd(ikeLoginFetch, {
            email: action.email,
            password: action.password
        }, LOGIN_SUCCESS, LOGIN_ERROR))
    }
};

export const recupero = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === RECUPERO) {
        dispatch(RESTAdd(ikeRecuperoFetch, action.email, RECUPERO_SUCCESS, RECUPERO_ERROR))
    }
};

export const renovacion = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === RENOVACION) {
        dispatch(RESTAdd(ikeRenovacionFetch, {
            ticket: action.ticket,
            password: action.password
        }, RENOVACION_SUCCESS, RENOVACION_ERROR))
    }
};

export const logon = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === LOGON) {
        dispatch(RESTAdd(ikeLogonFetch, {
            apellido: action.apellido,
            nombre: action.nombre,
            email: action.email,
            documento: action.documento,
            telefono: action.telefono
        }, LOGON_SUCCESS, LOGON_ERROR))
    }
};

export const updateProfile = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === UPDATE_PROFILE) {
        dispatch(RESTAdd(ikeUpdateProfileFetch, {
            apellido: action.apellido,
            nombre: action.nombre,
            foto: action.foto,
            documento: action.documento,
            telefono: action.telefono
        }, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_ERROR, action.token))
    }
};


export const processLogin = ({
    dispatch,
    getState
}) => next => action => {
    next(action);
    if (action.type === LOGIN_SUCCESS) {
        if (action.payload.receive.message) {
            dispatch(setLogueado(false))
        } else {
            dispatch(setLogueado(true))

            dispatch(setDatos(action.payload.receive))

            dispatch(getChat({
                top: "50",
                expand: "Reserva",
                filter: "Reserva/UsuarioId eq " + action.payload.receive.id + " and Respondido gt 0 and Leido eq 0",
                orderby: "ReservaId desc ,Id desc"



            }))


            /*             dispatch(getChat({

                            filter: "UsuarioId eq " + action.payload.receive.id + " and Leido eq 0",
                            token: getState().cliente.datos.token
                        })) */


            dispatch(getCantidad({
                select: "Id",
                token: getState().cliente.datos.token

            }))

            dispatch(getMascotasVacunas({
                token: getState().cliente.datos.token
            }))

            connection = new WebSocket('wss://ws.chat.dimodo.ga:9080');

            connection.onopen = () => {
                connection.send(JSON.stringify({
                    type: NEW_CONNECTION,
                    id: action.payload.receive.id,
                    rol: "cli",
                    name: action.payload.receive.nombre
                }));
            };

            connection.onmessage = (msg) => {

                let data = JSON.parse(msg.data);

                dispatch(recibirMensaje())


            };

            connection.onerror = (err) => {
                console.log("Got error", err);
            };
            dispatch(goTo("principal"))
        }
    }
};

export const processRecupero = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === RECUPERO_SUCCESS) {
        if (action.payload.receive.status) {
            dispatch(setRecuperando(false))
        } else {
            dispatch(setRecuperando(true))
        }
    }
};



export const processRenovado = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === RENOVACION_SUCCESS) {
        if (action.payload.receive.status) {
            dispatch(setRenovado(false))
        } else {
            dispatch(setRenovado(true))
        }
    }
};


export const processCommand = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === LOGON_SUCCESS || action.type === UPDATE_PROFILE_SUCCESS) {

    }
};


export const processError = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === LOGIN_ERROR || action.type === RENOVACION_ERROR || action.type === RECUPERO_ERROR || action.type == LOGON_ERROR || action.type == UPDATE_PROFILE_ERROR) {

    }
};

export const middleware = [login, recupero, renovacion, logon, updateProfile, processLogin, processRecupero, processRenovado, processCommand, processError];