var innerAPICall = async function(interval) {
    return new Promise(function(resolve, reject) {
        console.log("Func innerAPICall will, after " + interval + "s, send : " + interval)
        setTimeout(resolve, interval * 1000, interval * 1000 + " processed");
    });
}

export default innerAPICall;