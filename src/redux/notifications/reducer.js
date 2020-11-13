/** @format */

import { ON_OPEN, ON_CLOSE, ON_ERROR, ON_MESSSAGE } from "./actions";

const initialState = {
    message: "",
    messageTimeStamp: null,
    error: "",
    errorTimeStamp: null,
    openTimeStamp: null,
    close: "",
    closeTimeStamp: null,
    ws: null,
    connectionId: null,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };

    switch (action.type) {
        case ON_OPEN:
            newState.openTimeStamp = new Date().getTime();
            newState.ws = action.ws;
            newState.connectionId = action.connectionId;
            break;
        case ON_CLOSE:
            newState.closeTimeStamp = new Date().getTime();
            newState.close = action.close;
            break;
        case ON_ERROR:
            newState.error = action.error;
            newState.errorTimeStamp = new Date().getTime();
            break;
        case ON_MESSSAGE:
            newState.message = action.message;
            newState.messageTimeStamp = new Date().getTime();
            break;
    }
    return newState;
};
