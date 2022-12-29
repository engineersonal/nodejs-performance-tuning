    //mock an api call to wait for intervalOuterAPICall, and
    var outerAPICall = async function(index, intervalOuterAPICall, intervalInnerAPICall) {
        return new Promise(function(resolve, reject) {
            console.log("Func outerAPICall" + index + " will, after " + intervalOuterAPICall + "s, send : " + intervalInnerAPICall)
            // means after intervalOuterAPICall secs, intervalInnerAPICall will be resolved and returned, so it means the outerAPICall will return intervalInnerAPICall after intervalInnerAPICall secs
            setTimeout(resolve, intervalOuterAPICall * 1000, intervalInnerAPICall);
        });
    }

    export default outerAPICall;