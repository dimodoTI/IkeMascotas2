import {
    CAPTURE_MEDIA,
    setMedia,
    setMediaOrientation
} from "./actions";

export const capture = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type == CAPTURE_MEDIA) {

        const small = window.matchMedia("(max-width: 600px)")
        small.addListener((e) => {
            if (e.matches) dispatch(setMedia("small"))
        })

        const medium = window.matchMedia("(max-width: 800px) and (min-width: 601px)")
        medium.addListener((e) => {
            if (e.matches) dispatch(setMedia("medium"))
        })

        const large = window.matchMedia("(min-width: 801px)")
        large.addListener((e) => {
            if (e.matches) dispatch(setMedia("large"))
        })

        const landscape = window.matchMedia("(orientation:landscape)")
        landscape.addListener((e) => {
            if (e.matches) dispatch(setMediaOrientation("landscape"))
        })

        const portrait = window.matchMedia("(orientation:portrait)")
        portrait.addListener((e) => {
            if (e.matches) dispatch(setMediaOrientation("portrait"))
        })


        if (small.matches) dispatch(setMedia("small"))
        if (medium.matches) dispatch(setMedia("medium"))
        if (large.matches) dispatch(setMedia("large"))
        if (landscape.matches) dispatch(setMediaOrientation("landscape"))
        if (portrait.matches) dispatch(setMediaOrientation("portrait"))
    }
};


export const middleware = [capture];