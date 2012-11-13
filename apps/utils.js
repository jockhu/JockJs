/**
 *
 * utils.js
 *
 */

/**
 * Extends a objects prototype
 *
 * @param {Object} target The object to be extended.
 * @param {Object} source The object to extend with.
 * @return {Object} The new extended object.
 * @ignore
 */
exports.extend = function (target, source) {
    for (var p in source) {
        if (source.hasOwnProperty(p)) {
            target[p] = source[p];
        }
    }
    return target;
};