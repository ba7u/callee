import axios from "axios";
import { to } from "../helper";

export default class ApiBase {

    createInstance({ baseURL, withCredentials, store }) {
        this.base = axios.create({
            baseURL,
            withCredentials
        });
        this.baseURL = baseURL;
        this.credentials = withCredentials;
        this.store = store;
    }

    get({ target, params, config }) {
        return new Promise(async (resolve, reject) => {
            const asyncGet = this.base.get(target, { params, ...config });
            const [err, result] = await to(asyncGet);
            if (err !== null) {
                return reject(err);
            }
            return resolve({
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
                return reject(err);
            }
            return resolve({
                status: result.status,
                data: result.data
            });
        });
    }
}