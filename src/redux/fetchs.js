import {
  ODataEntity,
  ODataFetchFactory
} from "@brunomon/odata-fetch-factory"

import {
  fetchFactory
} from "../libs/fetchFactory"


const mascotasDomain = "https://apis.mascotas.ikeargentina.com.ar"
//const mascotasDomain = "http://localhost:5000"



const publicacionesDomain = "https://apis.publicaciones.ikeargentina.com.ar"

const webApiUsuarios = "https://apis.usuarios.ikeargentina.com.ar/api"

const chatDomain = "https://apis.chat.ikeargentina.com.ar"
//const chatDomain = "http://localhost:5000"



const webApiMascotas = mascotasDomain + "/api"
const webApiChat = chatDomain + "/api"

const OdataMascotas = ODataFetchFactory({
  fetch: fetch,
  domain: mascotasDomain
})
const OdataPublicaciones = ODataFetchFactory({
  fetch: fetch,
  domain: publicacionesDomain
})
const OdataChat = ODataFetchFactory({
  fetch: fetch,
  domain: chatDomain
})



export const ikeUsuarioFetch = fetchFactory(webApiUsuarios, "Usuario")
export const ikeLoginFetch = fetchFactory(webApiUsuarios, "Autorizacion/login")
export const ikeRenovacionFetch = fetchFactory(webApiUsuarios, "Autorizacion/renovacion")
export const ikeRecuperoFetch = fetchFactory(webApiUsuarios, "Autorizacion/recupero")
export const ikeLogonFetch = fetchFactory(webApiUsuarios, "Autorizacion/logon")
export const ikeUpdateProfileFetch = fetchFactory(webApiUsuarios, "Autorizacion/updateProfile")

export const ikeMascotas = fetchFactory(webApiMascotas, "Mascotas")
export const ikeConfiguracion = fetchFactory(webApiMascotas, "Configuracion")
export const ikePuestos = fetchFactory(webApiMascotas, "Puestos")
export const ikeTramos = fetchFactory(webApiMascotas, "Tramos")
export const ikeReservas = fetchFactory(webApiMascotas, "Reservas")
export const ikeAtenciones = fetchFactory(webApiMascotas, "Atenciones")
export const ikeMascotasVacunas = fetchFactory(webApiMascotas, "MascotasVacunas")
export const ikeTurnosDisponibles = fetchFactory(webApiMascotas, "TurnosDisponibles")
export const ikeAdjuntos = fetchFactory(webApiMascotas, "Adjuntos")

export const ikeChat = fetchFactory(webApiChat, "Chat")
export const ikeNotificacionDetalle = fetchFactory(webApiChat, "Notificaciones/Leido")

export const ikeMascotasQuery = ODataEntity(OdataMascotas, "MascotasQuery")
export const ikeMascotasTipoQuery = ODataEntity(OdataMascotas, "MascotasTipoQuery")
export const ikeRazasQuery = ODataEntity(OdataMascotas, "RazasQuery")
export const ikeConfiguracionQuery = ODataEntity(OdataMascotas, "ConfiguracionQuery")
export const ikePuestosQuery = ODataEntity(OdataMascotas, "PuestosQuery")
export const ikeTramosQuery = ODataEntity(OdataMascotas, "TramosQuery")
export const ikeReservasQuery = ODataEntity(OdataMascotas, "ReservasQuery")
export const ikeAtencionesQuery = ODataEntity(OdataMascotas, "AtencionesQuery")
export const ikeCalendarioQuery = ODataEntity(OdataMascotas, "CalendarioQuery")
export const ikeVacunasQuery = ODataEntity(OdataMascotas, "VacunasQuery")
export const ikeMascotasVacunasQuery = ODataEntity(OdataMascotas, "MascotasVacunasQuery")
export const ikeAdjuntosQuery = ODataEntity(OdataMascotas, "AdjuntosQuery")
export const ikeChatQuery = ODataEntity(OdataChat, "ChatQuery")
export const ikeNotificacionDetalleQuery = ODataEntity(OdataChat, "NotificacionDetalleQuery")

export const ikeOdataPublicaciones = ODataEntity(OdataPublicaciones, "PublicacionesQuery")