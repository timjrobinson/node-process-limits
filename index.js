var cp = require("child_process");
var camelCase = require("camelcase");

function getProcessLimits(pid, callback) {
    cp.exec("cat /proc/" + pid + "/limits", function (err, stdout, stderr) {
        if (err) return callback(err);
        
        var limits = parseProcessLimits(stdout);
        callback(null, limits);
    });
}

function parseProcessLimits(limitData) {
    var limitLines = limitData.split("\n");
    var limits = {};
    limitLines.forEach(function (limitLine) {
        var limitColumns = limitLine.split(/[\s]{2,}/).map(function(col) { return col.trim(); });
        if (limitColumns[0].match(/Limit/)) return;
        
        var name = camelCase(limitColumns[0]);
        var soft = limitColumns[1] == "unlimited" ? Infinity : parseInt(limitColumns[1]);
        var hard = limitColumns[2] == "unlimited" ? Infinity : parseInt(limitColumns[2]);
        
        limits[name] = {
            soft: soft,
            hard: hard,
        };
        
        if (limitColumns[3] && limitColumns[3].length) {
            limits[name].units = limitColumns[3];
        }
    });

    return limits;
    
}

getProcessLimits._parseProcessLimits = parseProcessLimits;

module.exports = getProcessLimits;

