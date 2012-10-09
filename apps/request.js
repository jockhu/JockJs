/**
 *
 * Request.js
 *
 */

var conf = require("../conf/config"),
    Router = require("./router").Router,
    url_ = require('url'),
    querystring = require('querystring');

/**
 * Request(request)
 *
 * @param {Object} request A http.ServerRequest instance.
 * @return {Object} Resource
 */
var Request = exports.Request = function(request) {

    /**
     * Sets request as http.ServerRequest instance
     */
    this.req = request;

    /**
     * Definde asset
     */
    this.asset = []

    /**
     * Default transfer encoding
     * @const
     */
    this.defTransferEncoding = conf.defTransferEncoding || 'utf8';

    /**
     * Default handers object
     * @const
     */
    this.headers = {};

    /**
     * Default handers send
     * @const
     */
    this.sentHeaders = false;

    /**
     * Default handers status objects
     * @const
     */

    this.init();
};
/**
 *
 * Resource.init()
 *
 * Resource initialize.
 *
 */
Request.prototype.init = function() {
}
/**
 *
 * Request.get(str)
 *
 * @param {String} str
 * @return {String}
 */
Request.prototype.get = function(str) {
    return querystring.parse(url_.parse(this.req.url).query)[str];
}

/**
 *
 * Request.getheader(str)
 *
 * @param {String} str
 * @return {String}
 */
Request.prototype.getheader = function(str) {
    return this.req.headers[str];
}