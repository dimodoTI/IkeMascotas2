import {
  reducer as uiReducer
} from "./ui/reducer"
import {
  reducer as screenReducer
} from "./screens/reducer"
import {
  reducer as routingReducer
} from "./routing/reducer"

import {
  reducer as apiReducer
} from "./api/reducer"
import {
  reducer as atencionesReducer
} from "./atenciones/reducer"
import {
  reducer as autorizacionReducer
} from "./autorizacion/reducer"
import {
  reducer as calendarioReducer
} from "./calendario/reducer"
import {
  reducer as clienteReducer
} from "./cliente/reducer"
import {
  reducer as configuracionReducer
} from "./configuracion/reducer"
import {
  reducer as mascotasReducer
} from "./mascotas/reducer"
import {
  reducer as mascotasTipoReducer
} from "./mascotastipo/reducer"
import {
  reducer as mascotasvacunasReducer
} from "./mascotasvacunas/reducer"
import {
  reducer as publicacionReducer
} from "./publicacion/reducer"
import {
  reducer as puestosReducer
} from "./puestos/reducer"
import {
  reducer as razasReducer
} from "./razas/reducer"
import {
  reducer as reservasReducer
} from "./reservas/reducer"
import {
  reducer as tramosReducer
} from "./tramos/reducer"
import {
  reducer as turnosdisponiblesReducer
} from "./turnosdisponibles/reducer"
import {
  reducer as usuarioReducer
} from "./usuario/reducer"
import {
  reducer as vacunasReducer
} from "./vacunas/reducer"

import {
  reducer as fotosReducer
} from "./fotos/reducer"

import {
  reducer as adjuntosReducer
} from "./adjuntos/reducer"

import {
  reducer as chatReducer
} from "./chat/reducer"

import {
  reducer as notificacionesReducer
} from "./notificacion/reducer"

export const rootReducer = (state = {}, action) => {
  return {
    api: apiReducer(state.reducer, action),
    ui: uiReducer(state.ui, action),
    screen: screenReducer(state.screen, action),
    routing: routingReducer(state.routing, action),
    atenciones: atencionesReducer(state.atenciones, action),
    autorizacion: autorizacionReducer(state.autorizacion, action),
    calendario: calendarioReducer(state.calendario, action),
    cliente: clienteReducer(state.cliente, action),
    configuracion: configuracionReducer(state.configuracion, action),
    mascotas: mascotasReducer(state.mascotas, action),
    mascotastipo: mascotasTipoReducer(state.mascotastipo, action),
    mascotasvacunas: mascotasvacunasReducer(state.mascotasvacunas, action),
    publicacion: publicacionReducer(state.publicacion, action),
    puestos: puestosReducer(state.puestos, action),
    razas: razasReducer(state.razas, action),
    reservas: reservasReducer(state.reservas, action),
    tramos: tramosReducer(state.tramos, action),
    turnosdisponibles: turnosdisponiblesReducer(state.turnosdisponibles, action),
    usuario: usuarioReducer(state.usuario, action),
    vacunas: vacunasReducer(state.vacunas, action),
    fotos: fotosReducer(state.fotos, action),
    adjuntos: adjuntosReducer(state.adjuntos, action),
    chat: chatReducer(state.chat, action),
    notificacion: notificacionesReducer(state.notificacion, action)
  }
}