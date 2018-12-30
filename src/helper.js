export function to(promise) {
    return promise
        .then(data => [null, data])
        .catch((err) => [err]);
}

export function executeIfValid(func, params) {
    func instanceof Function && func(params);
}