import * as std from "std";
import * as os from "os";

var worker;

function async_run (command)
{
    /* Note: can use std.loadFile() to read from a file */
    let sub = std.loadFile ('./work.js');
    worker = new os.Worker(sub);

    worker.onmessage = function (e) {
        switch(e.data.type) {
            case "command":
                //console.log (e.data.exe);
                console.log ('1aa');
                worker.postMessage ({ type: "abort" });
                break;
            case "done": {
                /* terminate */
                worker.onmessage = null;
                break;
            }
        }
    };

    worker.postMessage ({ type: "exec", cmd:command });
}

async_run ('grep -nri js *');
