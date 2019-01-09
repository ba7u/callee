import { API } from "../initializer";
import { isvalidobject } from "../helper";

export function Getter(instanceID) {
    const { caller } = API.store.getState();
    if (isvalidobject(caller[instanceID])) {
        return caller[instanceID].response || caller[instanceID].error
    }
    return null;
}