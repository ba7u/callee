import { createSelector } from "reselect";
import { isvalidobject } from "../helper";

const getRequest = (state, instanceID) => {
    if (isvalidobject(state.caller[instanceID])) {
        return state.caller[instanceID];
    }
    return {};
}

export const makeRequestState = () => createSelector(
    [getRequest],
    (request) => ({ request })
);