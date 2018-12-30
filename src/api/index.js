import Base from "./base";

const ApiBase = new Base();

export function Initializer({ baseURL, withCredentials, store }) {
    try {
        if (typeof baseURL === "undefined") {
            throw new Error("baseURL cannot be empty.");
        }

        ApiBase.createInstance({
            baseURL,
            credentials: withCredentials || false,
            store
        });

    } catch (err) {
        console.error(err.message);
    }
}

export default ApiBase;