
/**
 * wrap sync 
 * Wrap sync route handler to catch error and forward to error middleware 
 */

export const WrapAsync = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    }
}