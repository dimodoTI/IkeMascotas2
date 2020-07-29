import {
    ALL_BODY,
    HEADER_BODY_FOOT,
    BODY_FOOT,
    HEADER_BODY,
    SLIDER_HEADER_BODY
} from "./layouts"




export const screenLayuts = {
    splash: {
        small: ALL_BODY,
        medium: ALL_BODY,
        large: ALL_BODY
    },

    onboarding: {
        small: ALL_BODY,
        medium: ALL_BODY,
        large: ALL_BODY
    },

    inicioSesion: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY
    },

    principal: {
        small: HEADER_BODY_FOOT,
        medium: SLIDER_HEADER_BODY,
        large: SLIDER_HEADER_BODY
    },

    videoRTC: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY
    },

    crearclave: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY
    },
    accesoplan: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY
    },
    vercobertura: {
        small: ALL_BODY,
        medium: ALL_BODY,
        large: ALL_BODY

    },
    recuperaclave: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY
    },
    recuperaclavemsg: {
        small: ALL_BODY,
        medium: ALL_BODY,
        large: ALL_BODY
    },
    usuariodetalle: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY
    },
    usuarioregistro: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY
    },
    mascota: {
        small: HEADER_BODY_FOOT,
        medium: SLIDER_HEADER_BODY,
        large: SLIDER_HEADER_BODY
    },
    mascotaver: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY
    },
    calendario: {
        small: HEADER_BODY_FOOT,
        medium: SLIDER_HEADER_BODY,
        large: SLIDER_HEADER_BODY
    },
    vacuna: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY
    },
    vacunaMsg: {
        small: ALL_BODY,
        medium: ALL_BODY,
        large: ALL_BODY
    },
    vacunaMsgMascota: {
        small: ALL_BODY,
        medium: ALL_BODY,
        large: ALL_BODY
    },
    mascotaalta: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY
    },
    mascotaeditar: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY
    },
    mascotaAltaMsg: {
        small: ALL_BODY,
        medium: ALL_BODY,
        large: ALL_BODY
    },
    misConsultas: {
        small: HEADER_BODY_FOOT,
        medium: SLIDER_HEADER_BODY,
        large: SLIDER_HEADER_BODY

    },
    consulta: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY
    },
    consultaTurnos: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY
    },
    diagnosticoDetalles: {
        small: HEADER_BODY_FOOT,
        medium: SLIDER_HEADER_BODY,
        large: SLIDER_HEADER_BODY
    },
    diagnosticoDetallesM: {
        small: HEADER_BODY_FOOT,
        medium: SLIDER_HEADER_BODY,
        large: SLIDER_HEADER_BODY
    },
    fotos: {
        small: ALL_BODY,
        medium: ALL_BODY,
        large: ALL_BODY
    },
    mascotaEditarFoto: {
        small: ALL_BODY,
        medium: ALL_BODY,
        large: ALL_BODY
    },
    mascotaAltaFoto: {
        small: ALL_BODY,
        medium: ALL_BODY,
        large: ALL_BODY
    },

    videoMasocotaVer: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY
    },

    videoConsulta: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY
    },
    vacunaMascota: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY
    },
    consultaMascota: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY
    },
    consultaTurnosMascota: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY
    },


}


export const getLayout = (state) => {
    if (!state.screen.layouts[state.ui.media.size]) throw "no hay un layout definido en el state para media-size:" + state.ui.media.size
    let layout = state.screen.layouts[state.ui.media.size]
    if (state.screen.layouts[state.ui.media.size][state.ui.media.orientation]) {
        layout = state.screen.layouts[state.ui.media.size][state.ui.media.orientation]
    }
    return layout
}

export const isInLayout = (state, area) => {
    return getLayout(state).areas.find(a => a == area)
}