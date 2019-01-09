export function to(promise) {
    return promise
        .then(data => [null, data])
        .catch((err) => [err]);
}

export function executeIfValid(func, params) {
    func instanceof Function && func(params);
}

export function isvalidobject(obj) {
    return typeof obj !== "undefined" && Object.keys(obj).length > 0;
}