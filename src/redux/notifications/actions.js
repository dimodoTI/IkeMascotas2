/** @format */

import { store } from "../store";
import { WebSocketNotificaciones } from "../../libs/webSocket";
export const ON_OPEN = "[notificactions] ON_OPEN";
export const ON_ERROR = "[notificactions] ON_ERROR";
export const ON_CLOSE = "[notificactions] ON_CLOSE";
export const ON_MESSSAGE = "[notificactions] ON_MESSAGE";

export const onOpen = (ws, connectionId) => ({
    type: ON_OPEN,
    ws: ws,
    connectionId: connectionId,
});
export const onError = (error) => ({
    type: ON_ERROR,
    error: error,
});
export const onClose = (close) => ({
    type: ON_CLOSE,
    close: close,
});
export const onMessage = (message) => ({
    type: ON_MESSSAGE,
    message: message,
});

export const WSconnect = (dispatch) => {
    WebSocketNotificaciones(dispatch, "wss://ws.chat.ikeargentina.com.ar:9080", null, onOpen, onMessage, onError, onClose);
};
