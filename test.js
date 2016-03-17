
var test = require("tap").test;
var assert = require("assert");
var processLimits = require("./index");


test("getProcessLimits", function (t) {
    var limits = processLimits(process.pid, function (err, limits) {
        assert(!err, err);
        
        assert(limits.maxCpuTime);
        assert.equal(Object.keys(limits.maxCpuTime).length, 3);
        assert(limits.maxFileSize);
        assert.equal(Object.keys(limits.maxFileSize).length, 3);
        assert(limits.maxDataSize);
        assert.equal(Object.keys(limits.maxDataSize).length, 3);
        assert(limits.maxStackSize);
        assert.equal(Object.keys(limits.maxStackSize).length, 3);
        assert(limits.maxCoreFileSize);
        assert.equal(Object.keys(limits.maxCoreFileSize).length, 3);
        assert(limits.maxResidentSet);
        assert.equal(Object.keys(limits.maxResidentSet).length, 3);
        assert(limits.maxProcesses);
        assert.equal(Object.keys(limits.maxProcesses).length, 3);
        assert(limits.maxOpenFiles);
        assert.equal(Object.keys(limits.maxOpenFiles).length, 3);
        assert(limits.maxLockedMemory);
        assert.equal(Object.keys(limits.maxLockedMemory).length, 3);
        assert(limits.maxAddressSpace);
        assert.equal(Object.keys(limits.maxAddressSpace).length, 3);
        assert(limits.maxFileLocks);
        assert.equal(Object.keys(limits.maxFileLocks).length, 3);
        assert(limits.maxPendingSignals);
        assert.equal(Object.keys(limits.maxPendingSignals).length, 3);
        assert(limits.maxMsgqueueSize);
        assert.equal(Object.keys(limits.maxMsgqueueSize).length, 3);
        assert(limits.maxNicePriority);
        assert.equal(Object.keys(limits.maxNicePriority).length, 2);
        assert(limits.maxRealtimePriority);
        assert.equal(Object.keys(limits.maxRealtimePriority).length, 2);
        assert(limits.maxRealtimeTimeout);
        assert.equal(Object.keys(limits.maxRealtimeTimeout).length, 3);
        
        t.end();
    });
})

test("parseProcessLimits", function (t) {
     var sampleData = "" +
        "Limit                     Soft Limit           Hard Limit           Units     \n" +
        "Max cpu time              unlimited            unlimited            seconds   \n" +
        "Max file size             unlimited            unlimited            bytes     \n" +
        "Max data size             unlimited            unlimited            bytes     \n" +
        "Max stack size            8388608              unlimited            bytes     \n" +
        "Max core file size        0                    unlimited            bytes     \n" +
        "Max resident set          unlimited            unlimited            bytes     \n" +
        "Max processes             29863                29863                processes \n" +
        "Max open files            65536                65536                files     \n" +
        "Max locked memory         65536                65536                bytes     \n" +
        "Max address space         unlimited            unlimited            bytes     \n" +
        "Max file locks            unlimited            unlimited            locks     \n" +
        "Max pending signals       29863                29863                signals   \n" +
        "Max msgqueue size         819200               819200               bytes     \n" +
        "Max nice priority         0                    0                    \n" +
        "Max realtime priority     0                    0                    \n" +
        "Max realtime timeout      unlimited            unlimited            us    \n";
    var limits = processLimits._parseProcessLimits(sampleData);
    
    assert.equal(limits.limit, undefined);
    assert.deepEqual(limits.maxCpuTime, {
        soft: Infinity,
        hard: Infinity,
        units: "seconds"
    });
    assert.deepEqual(limits.maxFileSize, {
        soft: Infinity,
        hard: Infinity,
        units: "bytes"
    });
    assert.deepEqual(limits.maxDataSize, {
        soft: Infinity,
        hard: Infinity,
        units: "bytes"
    });
    assert.deepEqual(limits.maxStackSize, {
        soft: 8388608,
        hard: Infinity,
        units: "bytes"
    });
    assert.deepEqual(limits.maxCoreFileSize, {
        soft: 0,
        hard: Infinity,
        units: "bytes"
    });
    assert.deepEqual(limits.maxResidentSet, {
        soft: Infinity,
        hard: Infinity,
        units: "bytes"
    });
    assert.deepEqual(limits.maxProcesses, {
        soft: 29863,
        hard: 29863,
        units: "processes"
    });
    assert.deepEqual(limits.maxOpenFiles, {
        soft: 65536,
        hard: 65536,
        units: "files"
    });
    assert.deepEqual(limits.maxLockedMemory, {
        soft: 65536,
        hard: 65536,
        units: "bytes"
    });
    assert.deepEqual(limits.maxAddressSpace, {
        soft: Infinity,
        hard: Infinity,
        units: "bytes"
    });
    assert.deepEqual(limits.maxFileLocks, {
        soft: Infinity,
        hard: Infinity,
        units: "locks"
    });
    assert.deepEqual(limits.maxPendingSignals, {
        soft: 29863,
        hard: 29863,
        units: "signals"
    });
    assert.deepEqual(limits.maxMsgqueueSize, {
        soft: 819200,
        hard: 819200,
        units: "bytes"
    });
    assert.deepEqual(limits.maxNicePriority, {
        soft: 0,
        hard: 0
    });
    assert.deepEqual(limits.maxRealtimePriority, {
        soft: 0,
        hard: 0
    });
    assert.deepEqual(limits.maxRealtimeTimeout, {
        soft: Infinity,
        hard: Infinity,
        units: "us"
    });
    t.end();
});
