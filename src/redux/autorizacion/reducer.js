import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    RECUPERO_SUCCESS,
    RECUPERO_ERROR,
    RENOVACION_SUCCESS,
    RENOVACION_ERROR,
    LOGON_ERROR,
    LOGON_SUCCESS,
    UPDATE_PROFILE_ERROR,
    UPDATE_PROFILE_SUCCESS
} from "./actions";


const initialState = {
    loginTimeStamp: null,
    recuperoTimeStamp: null,
    renovacionTimeStamp: null,
    logonTimeStamp: null,
    updateProfileTimeStamp: null,
    commandErrorTimeStamp: null
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state
    };

    switch (action.type) {
        case LOGIN_SUCCESS:
            newState.loginTimeStamp = (new Date()).getTime();
            break;
        case RENOVACION_SUCCESS:
            newState.renovacionTimeStamp = (new Date()).getTime();
            break;
        case RECUPERO_SUCCESS:
            newState.recuperoTimeStamp = (new Date()).getTime();
            break;
        case LOGON_SUCCESS:
            newState.logonTimeStamp = (new Date()).getTime();
            break;
        case UPDATE_PROFILE_SUCCESS:
            newState.updateProfileTimeStamp = (new Date()).getTime();
            break;
        case LOGIN_ERROR || RECUPERO_ERROR || RENOVACION_ERROR || UPDATE_PROFILE_ERROR || LOGON_ERROR:
            newState.commandErrorTimeStamp = (new Date()).getTime();
            break;

    }
    return newState;
};