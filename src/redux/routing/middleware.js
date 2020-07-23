import {
    GO_NEXT,
    GO_PREV,
    GO_TO,
    GO_TO_NODE,
    setCurrent,
    SET_CURRENT
} from "./actions";
import {
    next as nextNode,
    prev as prevNode,
    goToNode as goToNode,
    goTo as goToOption,
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
        dispatch(setCurrent(getNode(goToOption(action.name, largeRoute), largeRoute)))
    }
    if (action.type == GO_TO_NODE) {
        dispatch(setCurrent(getNode(goToNode(action.node, largeRoute), largeRoute)))
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