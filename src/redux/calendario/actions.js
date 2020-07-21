export const GET = "[calendario] GET";

export const GET_SUCCESS = "[calendario] GET success";

export const GET_ERROR = "[calendario] GET error";





export const get = (options) => ({
    type: GET,
    options: options
    //token: token
});