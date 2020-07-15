import * as std from "std";
import * as os from "os";

var parent = os.Worker.parent;

function exec (cmd) {
    var pip = std.popen(cmd, 'r');
    var exe = pip.readAsString();
    parent.postMessage({ type: "command", exe }); 
}

function emit () {
    parent.onmessage = function (e) {
        var ev = e.data;
        switch(ev.type) {
        case "abort":
            parent.postMessage({ type: "done" });
            break;
        case "exec":
            exec (ev.cmd);
            break;
        default:
            break;
        }
    }
}

emit ();
