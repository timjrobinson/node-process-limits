# node-process-limits
Get the system limits (max open files etc) for a process ID in nodejs. It gives the same format as `cat /proc/PID/limits` just in a nice object that's easy to work with.

## Usage

```js
var processLimits = require("process-limits");
var pid = process.pid; // Or any other process on the machine

processLimits(process.pid, function (err, limits) {
    console.log(limits);
    /* Outputs the following: (unlimited in output is converted to the JS number Infinity)
    {
        maxCpuTime: {
            soft: Infinity,
            hard: Infinity,
            units: "seconds"
        },
        maxFileSize: {
            soft: Infinity,
            hard: Infinity,
            units: "bytes"
        },
        maxDataSize: {
            soft: Infinity,
            hard: Infinity,
            units: "bytes"
        },
        maxStackSize: {
            soft: 8388608,
            hard: Infinity,
            units: "bytes"
        },
        maxCoreFileSize: {
            soft: 0,
            hard: 0,
            units: "bytes"
        },
        maxResidentSet: {
            soft: Infinity,
            hard: Infinity,
            units: "bytes"
        },
        maxProcesses: {
            soft: 1048576,
            hard: 1048576,
            units: "processes"
        },
        maxOpenFiles: {
            soft: 1048576,
            hard: 1048576,
            units: "files"
        },
        maxLockedMemory: {
            soft: 65536,
            hard: 65536,
            units: "bytes"
        },
        maxAddressSpace: {
            soft: Infinity,
            hard: Infinity,
            units: "bytes"
        },
        maxFileLocks: {
            soft: Infinity,
            hard: Infinity,
            units: "locks"
        },
        maxPendingSignals: {
            soft: 209280,
            hard: 209280,
            units: "signals"
        },
        maxMsgqueueSize: {
            soft: 819200,
            hard: 819200,
            units: "bytes"
        },
        maxNicePriority: {
            soft: 0,
            hard: 0
        },
        maxRealtimePriority: {
            soft: 0,
            hard: 0
        },
        maxRealtimeTimeout: {
            soft: Infinity,
            hard: Infinity,
            units: "us"
        }
    }
    */
});
```

## Test

Run tests with `npm test`. Let me know if any fail on your system, please include system details from `uname -a`.

## License

MIT
