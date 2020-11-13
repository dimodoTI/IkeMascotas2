/** @format */
import { uuidv4 } from "../libs/funciones";
export const WebSocketNotificaciones = (dispatch, url, id, onOpen, onMessage, onError, onClose, autoConnect = true) => {
    if (!url) {
        console.log("no se especifico url para el WebSocket");
        return;
    }
    let ws = new WebSocket(url);

    ws.onopen = () => {
        let connectionId = id || uuidv4();
        if (onOpen) dispatch(onOpen(ws, connectionId));
    };

    ws.onerror = (err) => {
        if (onError) dispatch(onError(err));
    };

    ws.onclose = (e) => {
        if (onClose) dispatch(onClose(e));
        if (autoConnect) reconect(1000);
    };

    ws.onmessage = (msg) => {
        if (onMessage) dispatch(onMessage(msg));
    };

    const reconect = (timeOut) => {
        setTimeout(() => {
            ws.close();
            ws = WebSocketNotificaciones(dispatch, url, id, onOpen, onMessage, onError, onClose, autoConnect);
        }, timeOut);
    };

    return ws;
};
