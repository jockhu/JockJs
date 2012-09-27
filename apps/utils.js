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
exports.extend = function(target, source) {
    return (function(object) {
        for(var property in object.prototype) {
            this.prototype[property] = object.prototype[property];
        }
        return this;
    }).apply(target, [source]);
};