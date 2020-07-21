export const LOGIN = "[autorizacion] LOGIN";
export const RECUPERO = "[autorizacion] RECUPERO";
export const RENOVACION = "[autorizacion] RENOVACION";
export const LOGON = "[autorizacion] LOGON";
export const UPDATE_PROFILE = "[autorizacion] UUPDATE_PROFILE";

export const LOGIN_SUCCESS = "[autorizacion] LOGIN success";
export const RECUPERO_SUCCESS = "[autorizacion] RECUPERO success";
export const RENOVACION_SUCCESS = "[autorizacion] RENOVACION success";
export const LOGON_SUCCESS = "[autorizacion] LOGON_SUCCESS";
export const UPDATE_PROFILE_SUCCESS = "[autorizacion] UUPDATE_PROFILE_SUCCESS";

export const LOGIN_ERROR = "[autorizacion] LOGIN error";
export const RECUPERO_ERROR = "[autorizacion] RECUPERO error";
export const RENOVACION_ERROR = "[autorizacion] RENOVACION error";
export const LOGON_ERROR = "[autorizacion] LOGON_ERROR";
export const UPDATE_PROFILE_ERROR = "[autorizacion] UUPDATE_PROFILE_ERROR";


export const login = (email, password) => ({
    type: LOGIN,
    email: email,
    password: password
});

export const recupero = (email) => ({
    type: RECUPERO,
    email: email
});

export const renovacion = (ticket, password) => ({
    type: RENOVACION,
    ticket: ticket,
    password: password
});

export const logon = (nombre, apellido, email, documento, telefono) => ({
    type: LOGON,
    nombre: nombre,
    apellido: apellido,
    email: email,
    documento: documento,
    telefono: telefono,
});

export const updateProfile = (nombre, apellido, documento, foto, telefono, token) => ({
    type: UPDATE_PROFILE,
    foto: foto,
    nombre: nombre,
    apellido: apellido,
    documento: documento,
    telefono: telefono,
    token: token
});