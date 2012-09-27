var server = require("./server");

function App(){}

App.prototype.start = function(){
    server.initialize();
}

exports.App = App;
