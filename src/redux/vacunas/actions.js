import {
    GET_CANTIDAD
} from "../mascotas/actions";

export const GET = "[vacunas] GET";

export const GET_SUCCESS = "[vacunas] GET success";

export const GET_ERROR = "[vacunas] GET error";




export const get = (options) => ({
    type: GET,
    options: options
    //token: token
});