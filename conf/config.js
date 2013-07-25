
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
 *         node service.js 8000 true  false    20120101
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
exports.debug = (process.argv[3] != undefined) ? process.argv[3] == 'true' : false;

/**
 * Default enable compression
 * @const
 */
exports.enableCompress = (process.argv[4] != undefined) ? process.argv[4] == 'true' : true;

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
 * Default user root path
 * @const
 */
exports.userRoot = 'libs';

/**
 * Default user modules
 * @const
 */
exports.userModules = [];

/**
 * Default component root path
 * @const
 */
exports.componentRoot = 'libs';

/**
 * Default component modules
 * @const
 */
exports.componentModules = [];

/**
 * Default cache path
 * @const
 */
exports.cache = 'cache';

/**
 * Default log path
 * @const
 */
exports.logPath = 'log';

/**
 * Default javascript host
 * @const
 */
exports.jsHost = '';

/**
 * Default javascript path
 * @const
 */
exports.jsPath = '';

/**
 * Default style hosts
 * @const
 */
exports.cssHost = '';

/**
 * Default style path
 * @const
 */
exports.cssPath = '';

/**
 * Default enable access log
 * @const
 */
exports.enableAccessLog = false;

/**
 * Default enable error log
 * @const
 */
exports.enableErrorLog = false;

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
