//Oculta o muestra spinner
export const SHOW_SPINNER = "[ui] show spinner";
export const HIDE_SPINNER = "[ui] hide spinner";

//oculta o muestra ventana de error
export const SHOW_ERROR = "[ui] show error";
export const HIDE_ERROR = "[ui] hide error";

//define el tamaño,forma orientacion de la UI
export const CAPTURE_MEDIA = "[ui] capture media"
export const SET_MEDIA = "[ui] set media"
export const SET_MEDIA_ORIENTATION = "[ui] set media orientation"

//define el layout de la UI
export const SET_LAYOUT = "[ui] set layout"

export const DISPARAR_TIMER = "[ui] DISPARAR_TIMER"
export const CANCELAR_TIMER = "[ui] CANCELAR_TIMER"
export const SET_TIMER = "[ui] SET_TIMER"
export const SET_CONTADOR = "[ui] SET_CONTADOR"

export const HEADER_MUESTRA_TAPA = "[ui] header muestra tapa"
export const FOOTHER_MUESTRA_TAPA = "[ui] foother muestra tapa"



export const showSpinner = () => ({
  type: SHOW_SPINNER
});
export const hideSpinner = () => ({
  type: HIDE_SPINNER
});

export const showError = (message) => ({
  type: SHOW_ERROR,
  message: message
});
export const hideError = () => ({
  type: HIDE_ERROR
});

export const captureMedia = () => ({
  type: CAPTURE_MEDIA
});
export const setMedia = (size) => ({
  type: SET_MEDIA,
  size: size
});

export const setMediaOrientation = (orientation) => ({
  type: SET_MEDIA_ORIENTATION,
  orientation: orientation
});

export const dispararTimer = (tiempo, target, pantallaQueLLamo) => ({
  type: DISPARAR_TIMER,
  tiempo: tiempo,
  target: target,
  pantallaQueLLamo: pantallaQueLLamo
});
export const setTimer = (timer, intervalo, tiempo, pantallaQueLLamo) => ({
  type: SET_TIMER,
  timer: timer,
  intervalo: intervalo,
  tiempo: tiempo,
  pantallaQueLLamo: pantallaQueLLamo
});

export const cancelarTimer = () => ({
  type: CANCELAR_TIMER
});
export const setContador = (tiempo) => ({
  type: SET_CONTADOR,
  tiempo: tiempo
});

export const headerMuestraTapa = (mostrar) => ({
  type: HEADER_MUESTRA_TAPA,
  mostrar: mostrar
});

export const footherMuestraTapa = (mostrar) => ({
  type: FOOTHER_MUESTRA_TAPA,
  mostrar: mostrar
});