import React from "react";
import Base from "./api";

const ApiBase = new Base();

export function Initializer({ baseURL, withCredentials, store, context }) {
    try {
        if (typeof baseURL === "undefined") {
            throw new Error("baseURL cannot be empty.");
        }

        ApiBase.createInstance({
            baseURL,
            credentials: withCredentials || false,
            store,
            context
        });

    } catch (err) {
        console.error(err.message);
    }
}

export { ApiBase as API };