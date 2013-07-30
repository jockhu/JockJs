/**
 * Log
 *
 */
(function(){
    var conf = require("../conf/config"),
    fs   = require("fs");

    var logPath = conf.logPath,
	    date    = new Date(),
	    year    = date.getFullYear(),
	    month   = date.getMonth() + 1,
	    day     = date.getDate(),
	    today   = year+'_'+month.toString().replace(/^(\d)$/,'0'+'$1')+'_'+day.toString().replace(/^(\d)$/,'0'+'$1'),
	    path    = logPath + '/' + today,
	    accessPath = path + '/access.log',
	    errorPath = path + '/error.log';

    function writeFile(typePath, content){
        var stat, result;
        //Log.log(content);

        if(!fs.existsSync(path)){
            try{
                fs.mkdirSync(path,0755);
                fs.writeFileSync(accessPath, '');
                fs.writeFileSync(errorPath, '');
            }catch(e){
                Log.log(e);
            };
        }

        try{

	        fs.createWriteStream(typePath,{
		        flags:'a',
		        encoding:null,
		        mode:0666
	        }).end(content + "\n");

        }catch(e){
	        var v = 'Read or write ' + typePath + ' error.\n';
            Log.log(v,e);
        }
    }

    var Log = exports.Log = {
        access:function(e){
	        var UTC = (new Date()).toUTCString();
            Log.log('Access:',e +' | '+UTC);
            if(conf.enableAccessLog)
                writeFile(accessPath, e +' '+UTC);
        },
        error:function(e){
	        var UTC = (new Date()).toUTCString();
            Log.log('Error:',e +' | '+UTC);
            if(conf.enableErrorLog)
                writeFile(errorPath, e +' '+UTC);
        },
        log: function() {
            if (conf.debug) {
                console.log.apply(this, arguments);
            }
        }
    };

})();
