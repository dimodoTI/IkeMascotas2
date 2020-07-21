import {
    SET_CURRENT
} from "./actions";

const initialState = {
    current: {
        pointer: 0,
        name: ""
    }

};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state
    };
    switch (action.type) {
        case SET_CURRENT:
            newState.current = action.node

            break;
    }
    return newState;
};