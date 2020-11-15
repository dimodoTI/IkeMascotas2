import { SHOW_SPINNER, HIDE_SPINNER, SHOW_ERROR, HIDE_ERROR, SET_MEDIA, SET_MEDIA_ORIENTATION, SHOW_WARNING, HIDE_WARNING, HEADER_MUESTRA_TAPA, FOOTHER_MUESTRA_TAPA, SELECTMENU, SHOW_ALERT, HIDE_ALERT } from "./actions";

const initialState = {
	spinner: {
		loading: 0,
	},
	error: {
		message: "",
		timestamp: null,
	},
	warning: {
		pagina: "",
		nroWarning: -1,
		backgroundColor: "fondoInformacion",
		timeStamp: null,
		hidden: true,
		tineOut: 1500,
	},
	media: {
		size: "large",
		orientation: "landscape",
		timeStamp: null,
	},
	headerMuestraTapa: false,
	footherMuestraTapa: false,
	selectMenu: 1,
	alert: {
		tipo: 0,
		header: null,
		timeStamp: null,
		message: null,
		respuesta: null,
		hidden: false,
	},
};

export const reducer = (state = initialState, action) => {
	const newState = {
		...state,
	};

	switch (action.type) {
		case SHOW_SPINNER:
			newState.spinner.loading += 1;
			break;
		case HIDE_SPINNER:
			newState.spinner.loading -= 1;
			break;
		case SHOW_ERROR:
			newState.error.timeStamp = new Date().getTime();
			newState.error.messages = action.message;
			break;
		case HIDE_ERROR:
			newState.error.timeStamp = new Date().getTime();
			newState.error.messages = null;
			break;
		case SHOW_WARNING:
			newState.warning.timeStamp = new Date().getTime();
			newState.warning.pagina = action.pagina;
			newState.warning.backgroundColor = action.backgroundColor;
			newState.warning.nroWarning = action.nroWarning;
			newState.warning.hidden = false;
			newState.warning.timeOut = action.timeOut;
			break;
		case HIDE_WARNING:
			newState.warning.timeStamp = new Date().getTime();
			newState.warning.pagina = "";
			newState.warning.nroWarning = -1;
			newState.warning.hidden = true;
			newState.warning.timeOut = 1500;
			break;
		case SET_MEDIA:
			newState.media.size = action.size;
			newState.media.timeStamp = new Date().getTime();
			break;
		case SET_MEDIA_ORIENTATION:
			newState.media.orientation = action.orientation;
			newState.media.timeStamp = new Date().getTime();
			break;
		case HEADER_MUESTRA_TAPA:
			newState.headerMuestraTapa = action.mostrar;
			break;
		case FOOTHER_MUESTRA_TAPA:
			newState.footherMuestraTapa = action.mostrar;
			break;
		case SELECTMENU:
			newState.selectMenu = action.opcion;
			break;
		case SHOW_ALERT:
			newState.alert.timeStamp = new Date().getTime();
			newState.alert.message = action.message;
			newState.alert.header = action.header;
			newState.alert.tipo = action.tipo;
			newState.alert.hidden = false;
			break;
		case HIDE_ALERT:
			newState.alert.timeStamp = new Date().getTime();
			newState.alert.respuesta = action.respuesta;
			newState.alert.hidden = true;
	}
	return newState;
};
