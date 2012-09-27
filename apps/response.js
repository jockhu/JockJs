/**
 *
 * response.js
 *
 */

var conf = require("../conf/config");

/**
 * Response(response)
 *
 * The Response object is a wrapper around the Node's http.ServerResponse object.
 * It makes manipulating a response easier.
 *
 * @param {Object} response A http.ServerResponse instance.
 * @return {Object} Response
 */
var Response = exports.Response = function(response) {

    /**
     * Extend response
     */
    //utils.extend(this, response);



    /**
     * Sets response as http.ServerResponse instance
     */
    this.res = response;

    /**
     * Default mine type
     * @const
     */
    this.defMineType = conf.mineType || 'text/javascript';

    /**
     * Sets enable gzip
     * @const
     */
    this.enableGzip = conf.enableGzip || false;

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
    this.status = {
        OK_200 : 200,
        NotModified_304 : 304,
        NotFound_404 : 404,
        InternalServerError_500 : 500
    };

    this.init();

};

/**
 *
 * Response.init()
 *
 * init
 *
 */
Response.prototype.init = function() {
    this.setHeader("Server", "NJ");
    this.setHeader('Content-Type', this.defMineType);
};


/**
 * Like Response.err404()
 *
 * The function to be sent hander to the client. Finish this request, closing the connection with the client.
 *
 *
 */
[[404,'Not Found'], [304,'Not Modified'], [500,'Internal Server Error']].forEach(function(item){
    Response.prototype['err'+item[0]] = function(){
        this.res.writeHead(item[0], item[1]);
        this.res.end();
        return;
    }
});

/**
 *
 * Response.setHeader(name, value)
 *
 * A way to set the header of an object.
 *
 * @param {String} name
 * @param {String} value
 *
 */
Response.prototype.setHeader = function(name, value) {
    this.res.setHeader(name, value);
};
/**
 *
 * Response.write(chunk, encoding)
 *
 * A way to set the header of an object.
 *
 * @param {String} chunk
 * @param {String} encoding
 *
 */
Response.prototype.write = function(chunk, encoding) {
    this.res.write(chunk, encoding || 'utf8');
};
/**
 *
 * Response.send(str)
 *
 * Very similar to http.ServerResponse.sendBody except it handles sending the
 * headers if they haven't already been sent.
 *
 * @param {String} str The string to be sent to the client.
 *
 */
Response.prototype.send = function(str) {
    this.write(str);
    this.end();
};
/**
 *
 * Response.end()
 *
 */
Response.prototype.end = function() {
    this.res.end();
};
/**
 *
 * Response.faviconFix(url)
 *
 * @param {String} url The string to be fix the Favicon.
 *
 */
Response.prototype.faviconFix = function(url) {
    if('/favicon.ico' === url) {
        var expires = new Date();
        expires.setTime(expires.getTime() + conf.maxAge * 1000);
        this.res.setHeader("Expires", expires.toUTCString());
        this.res.setHeader("Content-Type", 'image/x-icon');
        this.res.setHeader("ETag", 'FAVICONFIXED');
        this.res.setHeader("Cache-Control", 'public, max-age=' + conf.maxAge);
        this.res.writeHead(this.status.NotModified_304, 'Not Modified');
        this.res.end();
        return true;
    }
    return false;
};

