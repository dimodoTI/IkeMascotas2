export const SET_DATOS = "[CLIENTE] set datos"
export const SET_LOGUEADO = "[CLIENTE] set logueado"
export const SET_CONFIRMADO = "[CLIENTE] set confirmado"
export const SET_RECUPERANDO = "[CLIENTE] set recuperando"
export const SET_RENOVADO = "[CLIENTE] set renovado"


export const setDatos = (datos) => ({
    type: SET_DATOS,
    datos: datos
});

export const setLogueado = (logueado) => ({
    type: SET_LOGUEADO,
    logueado: logueado
});
export const setConfirmado = (confirmado) => ({
    type: SET_CONFIRMADO,
    confirmado: confirmado
});
export const setRecuperando = (recuperando) => ({
    type: SET_RECUPERANDO,
    recuperando: recuperando
});
export const setRenovado = (renovado) => ({
    type: SET_RENOVADO,
    renovado: renovado
});