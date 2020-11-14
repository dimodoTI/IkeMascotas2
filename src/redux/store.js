/** @format */

import { applyMiddleware, createStore, compose } from "redux";
import { logger } from "redux-logger";
import { rootReducer as reducers } from "./reducers";
import { middleware as ui } from "./ui/middleware";
import { middleware as api } from "./api/middleware";
import { middleware as rest } from "./rest/middleware";
import { middleware as route } from "./routing/middleware";

import { middleware as atenciones } from "./atenciones/middleware";
import { middleware as autorizacion } from "./autorizacion/middleware";
import { middleware as cliente } from "./cliente/middleware";
import { middleware as calendario } from "./calendario/middleware";
import { middleware as configuracion } from "./configuracion/middleware";
import { middleware as mascotas } from "./mascotas/middleware";
import { middleware as mascotastipo } from "./mascotastipo/middleware";
import { middleware as mascotasvacunas } from "./mascotasvacunas/middleware";
import { middleware as publicacion } from "./publicacion/middleware";
import { middleware as puestos } from "./puestos/middleware";
import { middleware as razas } from "./razas/middleware";
import { middleware as reservas } from "./reservas/middleware";
import { middleware as tramos } from "./tramos/middleware";
import { middleware as turnosdisponibles } from "./turnosdisponibles/middleware";
import { middleware as usuario } from "./usuario/middleware";
import { middleware as vacunas } from "./vacunas/middleware";
import { middleware as adjuntos } from "./adjuntos/middleware";
import { middleware as chat } from "./chat/middleware";
import { middleware as notificacion } from "./notificacion/middleware";
import { middleware as notifications } from "./notifications/middleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let mdw = [api, rest, ...ui, ...route, ...atenciones, ...autorizacion, ...cliente, ...calendario, ...configuracion, ...mascotas, ...mascotastipo, ...mascotasvacunas, ...publicacion, ...puestos, ...razas, ...reservas, ...tramos, ...turnosdisponibles, ...usuario, ...vacunas, ...adjuntos, ...chat, ...notificacion, ...notifications];

if (process.env.NODE_ENV !== "production") {
    mdw = [...mdw, logger];
}

const initialData = {};

export const store = createStore(reducers, initialData, composeEnhancers(applyMiddleware(...mdw)));
