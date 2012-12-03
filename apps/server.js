(function () {
    var http = require("http"), url = require("url"), conf = require("../conf/config"), Log = require("./log").Log, zlib = require("zlib");

    exports.initialize = function () {
        if (process.argv[2] == '--help' || process.argv[2] == 'help') {
            console.log('\nnode service.js [[[[port]  debug]  compress]  version]');
            console.log('\nExample\nnode service.js 8000 true true\n');
            return;
        }

        var Response = require("./response").Response, Resource = require("./resource").Resource;

        http.createServer(function (request, response) {
            var res = new Response(response), resource = new Resource(request, res), content, useGzip;

            if (res.faviconFix(request.url)) return;

            if ("/" === url.parse(request.url).pathname.slice(-1)){
                Log.log('Error:404 Not Found ' + request.url,' Referer:' + request.headers.referer);
                res.err404();
                return;
            }

            content = resource.getResource();
            useGzip = /gzip/.test(request.headers['accept-encoding']);

            // 小于 150b 不进行gzip压缩
            if (useGzip && conf.enableGzip && content.length > 150) {
                zlib.gzip(content, function (err, buf) {
                    if (!err) {
                        Log.log('Content gziped')
                        res.setHeader('content-encoding', 'gzip');
                        res.send(buf);
                    } else Log.log(err);
                });
            } else {
                Log.log('No gzip')
                res.send(content);
            }

        }).listen(conf.port);
        console.log('Server running at port: ' + conf.port + '.');
    };
})();
