(function () {
    var server = require("./server");

    var App = exports.App = function App() {
    };

    App.prototype.start = function () {
        server.initialize();
    };
})();

