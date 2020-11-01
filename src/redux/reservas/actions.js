export const GET = "[reservas] GET";
export const ADD = "[reservas] ADD";
export const PATCH = "[reservas] PATCH";
export const UPDATE = "[reservas] UPDATE";
export const REMOVE = "[reservas] REMOVE";
export const EDIT = "[reservas] EDIT"
export const RESERVAR = "[reservas] RESERVAR"
export const RESERVARFECHA = "[reservas] RESERVARFECHA"
export const ENATENCION = "[reservas] ENATENCION"
export const TRAER_ULTIMA_RESERVA = "[reservas] TRAER_ULTIMA_RESERVA";
export const CALIFICAR = "[reservas] CALIFICAR";
export const AGENDAR_RESERVA = "[reservas] AGENDAR_RESERVA"

export const RESERVAS_A_FUTURO = "[reservas] RESERVAS_A_FUTURO"
export const ANULAR_RESERVAS = "[reservas] ANULAR_RESERVAS"


export const GET_SUCCESS = "[reservas] GET success"
export const ADD_SUCCESS = "[reservas] ADD success";
export const PATCH_SUCCESS = "[reservas] PATCH success";
export const UPDATE_SUCCESS = "[reservas] UPDATE success";
export const REMOVE_SUCCESS = "[reservas] REMOVE success";
export const ENATENCION_SUCCESS = "[reservas] ENATENCION success";
export const TRAER_ULTIMA_RESERVA_SUCCESS = "[reservas] TRAER_ULTIMA_RESERVA_SUCCESS";
export const CALIFICAR_SUCCESS = "[reservas] CALIFICAR success";
export const RESERVAS_A_FUTURO_SUCCESS = "[reservas] RESERVAS_A_FUTURO success";
export const ANULAR_RESERVAS_SUCCESS = "[reservas] ANULAR_RESERVAS_SUCCESS"

export const GET_ERROR = "[reservas] GET error";
export const ADD_ERROR = "[reservas] ADD error";
export const PATCH_ERROR = "[reservas] PATCH error";
export const UPDATE_ERROR = "[reservas] UPDATE error";
export const REMOVE_ERROR = "[reservas] REMOVE error";
export const ENATENCION_ERROR = "[reservas] ENATENCION error";
export const TRAER_ULTIMA_RESERVA_ERROR = "[reservas] TRAER_ULTIMA_RESERVA_ERROR";
export const CALIFICAR_ERROR = "[reservas] CALIFICAR error";
export const RESERVAS_A_FUTURO_ERROR = "[reservas] RESERVAS_A_FUTURO error";
export const ANULAR_RESERVAS_ERROR = "[reservas] ANULAR_RESERVAS_ERROR"

export const RESERVA_PARA_CHAT = "[reservas] RESERVA_PARA_CHAT"

export const RESERVA_CANTIDAD = "[reservas] RESERVA_CANTIDAD"
export const RESERVA_CANTIDAD_SUCCESS = "[reservas] RESERVA_CANTIDAD_SUCCESS"
export const RESERVA_CANTIDAD_ERROR = "[reservas] RESERVA_CANTIDAD_ERROR"




export const get = (options, onSuccess = GET_SUCCESS, onError = GET_ERROR) => ({
    type: GET,
    options: options,
    onSuccess: onSuccess,
    onError: onError
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

export const patch = (id, body, token, onSuccess = PATCH_SUCCESS, onError = PATCH_ERROR) => ({
    type: PATCH,
    id: id,
    body: body,
    token: token,
    onSuccess: onSuccess,
    onError: onError
});

export const remove = (id, token) => ({
    type: REMOVE,
    id: id,
    token: token
});

export const edit = (modo, item) => ({
    type: EDIT,
    item: item || {
        TramoId: 0,
        MascotaId: 0,
        UsuarioId: 0,
        FechaAtencion: "",
        HoraAtencion: 0,
        FechaGeneracion: "",
        Motivo: "",
        Estdo: 0,
        Activo: 1
    },
    modo: modo,
})

export const reservar = (mascotaId, motivo) => ({
    type: RESERVAR,
    mascotaId: mascotaId,
    motivo: motivo
})

export const reservarFecha = (fecha, hora, tramoId) => ({
    type: RESERVARFECHA,
    fecha: fecha,
    hora: hora,
    tramoId: tramoId,

})

export const enAtencion = (registro) => ({
    type: ENATENCION,
    registro: registro
})

export const reservaParaChat = (registro) => ({
    type: RESERVA_PARA_CHAT,
    registro: registro

})

export const reservaCantidad = (options, onSuccess = RESERVA_CANTIDAD_SUCCESS, onError = RESERVA_CANTIDAD_ERROR) => ({
    type: RESERVA_CANTIDAD,
    options: options,
    onSuccess: onSuccess,
    onError: onError

})

export const traerUltimaReserva = (token, onSuccess = TRAER_ULTIMA_RESERVA_SUCCESS, onError = TRAER_ULTIMA_RESERVA_ERROR) => ({
    type: TRAER_ULTIMA_RESERVA,
    options: {
        top: 1,
        filter: "Activo",
        expand: "Mascota($select=Nombre,Id;$expand=Raza($expand=MascotasTipo))",
        orderby: "Id desc",
        token: token
    },
    onSuccess: onSuccess,
    onError: onError
});

export const calificarAtencion = (id, calificacion, comentario, token) => ({
    type: CALIFICAR,
    id: id,
    body: [{
        "op": "replace",
        "path": "/Calificacion",
        "value": calificacion
    }, {
        "op": "replace",
        "path": "/ComentarioCalificacion",
        "value": comentario
    }],
    token: token
});

export const reservasAFuturo = (mascotaId, token, fecha) => ({
    type: RESERVAS_A_FUTURO,
    options: {
        top:1,
        filter: "FechaAtencion ge " + fecha.substr(0,10) + " and MascotaId eq " + mascotaId + " and Activo",
        orderby:"FechaAtencion desc,HoraAtencion desc",
        token: token
    },

    onSuccess: RESERVAS_A_FUTURO_SUCCESS,
    onError: RESERVAS_A_FUTURO_ERROR
})


export const anularReserva = (id, token) => ({
    type: ANULAR_RESERVAS,
    id: id,
    body: [{
        "op": "replace",
        "path": "/Activo",
        "value": 0
    }],
    token: token,
    onSuccess: ANULAR_RESERVAS_SUCCESS,
    onError: ANULAR_RESERVAS_ERROR
});

export const agendarReserva = (mascotaId = 0, sintoma = "") => ({
    type: AGENDAR_RESERVA,
    mascotaId: mascotaId,
    sintoma: sintoma
})