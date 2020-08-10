import {
    GET_SUCCESS,
    GET_ERROR,
    PATCH_SUCCESS,
    PATCH_ERROR,
    UPDATE_SUCCESS,
    UPDATE_ERROR,
    ADD_SUCCESS,
    ADD_ERROR,
    REMOVE_SUCCESS,
    REMOVE_ERROR,
    EDIT
} from "./actions";


const initialState = {
    entities: null,
    timeStamp: null,
    removeTimeStamp: null,
    updateTimeStamp: null,
    addTimeStamp: null,
    errorTimeStamp: null,
    commandErrorTimeStamp: null,
    editTimeStamp: null,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state
    };

    switch (action.type) {
        case GET_SUCCESS:
            newState.entities = action.payload.receive
            newState.timeStamp = (new Date()).getTime();
            break;
        case EDIT:
            newState.editTimeStamp = (new Date()).getTime();
            newState.entities.currentItem = action.item
            newState.modo = action.modo;
            break;
        case UPDATE_SUCCESS:
            newState.updateTimeStamp = (new Date()).getTime();
            break;
        case PATCH_SUCCESS:
            newState.updateTimeStamp = (new Date()).getTime();
            break;
        case REMOVE_SUCCESS:
            newState.removeTimeStamp = (new Date()).getTime();
            break;
        case ADD_SUCCESS:
            newState.addTimeStamp = (new Date()).getTime();
            break;
        case GET_ERROR:
            newState.errorTimeStamp = (new Date()).getTime();
            break;
        case UPDATE_ERROR || REMOVE_ERROR || PATCH_ERROR || ADD_ERROR:
            newState.commandErrorTimeStamp = (new Date()).getTime();
            break;

    }
    return newState;
};