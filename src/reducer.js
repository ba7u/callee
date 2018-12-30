import CONST from "./const";

export function reducer(state = {}, action) {
    switch (action.type) {
        case CONST.REQUEST:
            return {
                ...state,
                [action.name]: {
                    fetching: true,
                    fetched: false
                }
            }
        case CONST.SUCCESS:
            return {
                ...state,
                [action.name]: {
                    fetching: false,
                    fetched: true,
                    response: action.response
                }
            }
        case CONST.FAILURE:
            return {
                ...state,
                [action.name]: {
                    fetching: false,
                    fetched: false,
                    error: action.error
                }
            }
        case CONST.DELETE:
            return !Object.keys(state).includes(action.name) ? state :
                Object.entries(state).filter(([key]) => key !== action.name)
                    .reduce((obj, [key, val]) => ({
                        ...obj,
                        [key]: val
                    }), {});
        default:
            return state;
    }
}