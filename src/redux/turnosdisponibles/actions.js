export const GET = "[turnosdisponibles] GET";

export const GET_SUCCESS = "[turnosdisponibles] GET success";

export const GET_ERROR = "[turnosdisponibles] GET error";





export const get = (options) => ({
    type: GET,
    options: options
    //token: token
});