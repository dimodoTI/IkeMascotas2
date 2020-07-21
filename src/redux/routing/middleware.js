import {
    GO_NEXT,
    GO_PREV,
    GO_TO,
    setCurrent,
    SET_CURRENT
} from "./actions";
import {
    next as nextNode,
    prev as prevNode,
    goTo as goToNode,
    getNode as getNode
} from "./functions"
import {
    showScreen
} from "../screens/actions"
import {
    largeRoute
} from "./routs"

export const goNext = ({
    dispatch,
    getState
}) => next => action => {
    next(action);
    if (action.type == GO_NEXT) {
        let pointer = nextNode(getState().routing.current.pointer, largeRoute)
        dispatch(setCurrent(getNode(pointer, largeRoute)))
    }
};

export const goPrev = ({
    dispatch,
    getState
}) => next => action => {
    next(action);
    if (action.type == GO_PREV) {
        let pointer = prevNode(getState().routing.current.pointer, largeRoute)
        dispatch(setCurrent(getNode(pointer, largeRoute)))
    }
};

export const goTo = ({
    dispatch,
    getState
}) => next => action => {
    next(action);
    if (action.type == GO_TO) {
        let pointer = goToNode(action.name, largeRoute)
        dispatch(setCurrent(getNode(pointer, largeRoute)))
    }
};
export const set = ({
    dispatch,
    getState
}) => next => action => {
    next(action);
    if (action.type == SET_CURRENT) {
        dispatch(showScreen(getState().routing.current.name))
    }
};


export const middleware = [goNext, goPrev, goTo, set];