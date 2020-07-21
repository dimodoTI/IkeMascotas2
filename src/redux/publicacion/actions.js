export const GET = "[publicacion] GET";


export const GET_SUCCESS = "[publicacion] GET success";


export const GET_ERROR = "[publicacion] GET error";


export const get = (options) => ({
    type: GET,
    options: options,
    //token: token
});