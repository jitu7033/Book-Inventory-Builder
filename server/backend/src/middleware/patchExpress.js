import { WrapAsync } from "./wrapSync.js";


/**
 * patchExpress
 * Automatically wraps all async route handlers to capture errors
 * @param {Express.Application} app 
 */
export function patchExpress(app) {
    const methods = ['get', 'post', 'put', 'delete', 'patch', 'all'];

    methods.forEach(method => {
        const original = app[method];

        app[method] = function (path, ...handlers) {
            const wrappedHandlers = handlers.map(fn => {
                if (fn.constructor.name === 'AsyncFunction') {
                    return WrapAsync(fn);
                }
                return fn;
            });

            return original.call(app, path, ...wrappedHandlers);
        };
    });
}
