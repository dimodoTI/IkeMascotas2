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
    EDIT,
    UPLOAD_SUCCESS,
    UPLOAD_ERROR,
    DEL_CLIENTE_SUCCESS,
    DEL_CLIENTE_ERROR,
    DEL_VETERINARIO_SUCCESS,
    DEL_VETERINARIO_ERROR

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
    uploadErrorTimeStamp: null,
    uploadTimeStamp: null,
    delClienteTimeStamp: null,
    delClienteErrorTimeStamp: null,
    entityDelCliente: null,
    entitityDelVeterinario: null,
    delVeterinarioTimeStamp: null,
    delVeterinarioErrorTimeStamp: null,

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
        case UPDATE_ERROR:
        case REMOVE_ERROR:
        case PATCH_ERROR:
        case ADD_ERROR:
            newState.commandErrorTimeStamp = (new Date()).getTime();
            break;
        case UPLOAD_SUCCESS:
            newState.uploadTimeStamp = (new Date()).getTime();
            break;
        case UPLOAD_ERROR:
            newState.uploadErrorTimeStamp = (new Date()).getTime();
            break;
        case DEL_CLIENTE_SUCCESS:
            newState.entityDelCliente = action.payload.receive;
            newState.delClienteTimeStamp = (new Date()).getTime();
            break;
        case DEL_CLIENTE_ERROR:
            newState.delClienteErrorTimeStamp = (new Date()).getTime();
            break;
        case DEL_VETERINARIO_SUCCESS:
            newState.entitityDelVeterinario = action.payload.receive;
            newState.delVeterinarioTimeStamp = (new Date()).getTime();
            break;
        case DEL_VETERINARIO_ERROR:
            newState.delVeterinarioErrorTimeStamp = (new Date()).getTime();
            break;

    }
    return newState;
};