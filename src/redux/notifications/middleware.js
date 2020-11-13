/** @format */

import { ON_OPEN, ON_CLOSE, ON_ERROR, ON_MESSSAGE } from "./actions";
import { recibirMensaje } from "../chat/actions";
const NEW_CONNECTION = "new-connection";

export const onOpen = ({ dispatch, getState }) => (next) => (action) => {
    next(action);
    if (action.type === ON_OPEN) {
        const datos = getState().cliente.datos;

        action.ws.send(
            JSON.stringify({
                type: NEW_CONNECTION,
                id: datos.id,
                rol: "cli",
                name: datos.nombre,
            })
        );
    }
};
export const onClose = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === ON_CLOSE) {
        console.log("close");
    }
};
export const onError = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === ON_ERROR) {
        console.log("error");
    }
};
export const onMessage = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === ON_MESSSAGE) {
        console.log("message");
        dispatch(recibirMensaje());
    }
};
export const middleware = [onOpen, onClose, onError, onMessage];
