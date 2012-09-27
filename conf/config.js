

/**
 * @name app config for Nodejs framework
 * @version undefined
 * @author Jock
 *
 * The main configuration file is some constant,
 * for the basic configuration of the framework.
 *
 *
 * example
 *
 *         node server.js 8000 true  false    20120101
 *                        port debug compress version
 *
 */




/**
 * Default port
 * @const
 */
exports.port = process.argv[2] || 8000;

/**
 * Default debug
 * @const
 */
exports.debug = process.argv[3] == 'true' || false;

/**
 * Default enable compression
 * @const
 */
exports.enableCompress = process.argv[4] == 'true' || false;

/**
 * Default version
 * @const
 */
exports.version = process.argv[5];

/**
 * Default root path
 * @const
 */
exports.root = 'libs';

/**
 * Default cache path
 * @const
 */
exports.cache = 'cache';

/**
 * Default log path
 * @const
 */
exports.logPath = '/var/log/jsapi';

/**
 * Default enable access log
 * @const
 */
exports.enableAccessLog = true;

/**
 * Default mineType
 * @const
 */
exports.mineType = 'text/javascript';

/**
 * Default transfer Encoding
 * @const
 */
exports.transferEncoding = 'UTF-8';

/**
 * Default enable gzip
 * @const
 */
exports.enableGzip = true;

/**
 * Default enable cache
 * @const
 */
exports.enableCache = false;

/**
 * Default expires maxAge 1 years
 * @const
 */
exports.maxAge = 60*60*24*365;

/**
 * Default except -> uglify object property
 * @const
 */
exports.except = ['J','eval'];
