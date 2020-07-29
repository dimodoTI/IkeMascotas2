export const GET = "[mascotas] GET";
export const ADD = "[mascotas] ADD";
export const PATCH = "[mascotas] PATCH";
export const UPDATE = "[mascotas] UPDATE";
export const REMOVE = "[mascotas] REMOVE";
export const EDIT = "[mascotas] EDIT"
export const GETEDIT = "[mascotas] GETEDIT"


export const GET_SUCCESS = "[mascotas] GET success";
export const ADD_SUCCESS = "[mascotas] ADD success";
export const PATCH_SUCCESS = "[mascotas] PATCH success";
export const UPDATE_SUCCESS = "[mascotas] UPDATE success";
export const REMOVE_SUCCESS = "[mascotas] REMOVE success";
export const GETEDIT_SUCCESS = "[mascotas] GETEDIT success";

export const GET_ERROR = "[mascotas] GET error";
export const ADD_ERROR = "[mascotas] ADD error";
export const PATCH_ERROR = "[mascotas] PATCH error";
export const UPDATE_ERROR = "[mascotas] UPDATE error";
export const REMOVE_ERROR = "[mascotas] REMOVE error";
export const GETEDIT_ERROR = "[mascotas] GETEDIT error";

export const GET_CANTIDAD = "[mascotas] GETCANTIDAD"
export const GET_CANTIDAD_SUCCESS = "[mascotas] GETCANTIDAD success";

export const GET_CANTIDAD_ERROR = "[mascotas] GETCANTIDAD error";


export const get = (options) => ({
    type: GET,
    options: options
});

export const getCantidad = (options) => ({
    type: GET_CANTIDAD,
    options: options
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

export const patch = (id, body, token) => ({
    type: PATCH,
    id: id,
    body: body,
    token: token
});

export const remove = (id, token) => ({
    type: REMOVE,
    id: id,
    token: token
});

export const getEdit = (options) => ({
    type: GETEDIT,
    options: options
})

export const edit = (modo, item) => ({
    type: EDIT,

    item: item || {
        Id: 0,
        idUsuario: 0,
        idRaza: 0,
        Nombre: "",
        Foto: "",
        FechaNacimiento: "",
        Activo: true,
        Raza: {
            Id: 0,
            Descripcion: "",
            MascotasTipo: {
                Id: 0,
                Descripcion: ""
            }
        },
        MascotasVacuna: [{
            Id: 0,
            MascotaId: 0,
            VacunaId: 0,
            Fecha: "",
            Realizada: false,
            Activo: true,
            Vacuna: {
                Id: 0,
                MascotaTipoId: 0,
                Descripcion: "",
                Activo: true
            }
        }],
        Reservas: []

    },
    modo: modo,
})