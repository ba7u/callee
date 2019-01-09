import { API } from "../initializer";
import { to } from "../helper";
import CONST from "./const";

export function callService(name, method, { target, params, config, external }) {
    return async dispatch => {
        dispatch(contentRequest(name, method));
        const [err, result] = await to(API[method]({ target, params, config, external }));
        if (err !== null) {
            return dispatch(contentFailure(name, err));
        }
        return dispatch(contentSuccess(name, result));
    }
}

function contentRequest(name, method) {
    return {
        type: CONST.REQUEST,
        name,
        method
    }
}

function contentSuccess(name, response) {
    return {
        type: CONST.SUCCESS,
        name,
        response
    }
}

function contentFailure(name, error) {
    return {
        type: CONST.FAILURE,
        name,
        error
    }
}

export function contentDelete(name) {
    return {
        type: CONST.DELETE,
        name
    }
}