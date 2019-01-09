import axios from "axios";
import { to } from "./helper";

export default class ApiBase {

    createInstance({ baseURL, withCredentials, context, store }) {
        this.base = axios.create({
            baseURL,
            withCredentials
        });
        this.baseURL = baseURL;
        this.credentials = withCredentials;
        this.context = context;
        this.store = store;
    }

    get({ target, params, config }) {
        return new Promise(async (resolve, reject) => {
            const asyncGet = this.base.get(target, { params, ...config });
            const [err, result] = await to(asyncGet);
            if (err !== null) {
                if (typeof err.response !== 'undefined') {
                    const { response: { status }, message: data } = err;
                    return reject({ error: true, status, data });
                } else {
                    return reject({ error: true, status: 500, data: err });
                }
            }
            return resolve({
                error: false,
                status: result.status,
                data: result.data
            });
        });
    }

    post({ target, params, config }) {
        return new Promise(async (resolve, reject) => {
            const asyncPost = this.base.post(target, { params, ...config });
            const [err, result] = await to(asyncPost)
            if (err !== null) {
                if (typeof err.response !== 'undefined') {
                    const { response: { status }, message: data } = err;
                    return reject({ error: true, status, data });
                } else {
                    return reject({ error: true, status: 500, data: err });
                }
            }
            return resolve({
                error: false,
                status: result.status,
                data: result.data
            });
        });
    }
}