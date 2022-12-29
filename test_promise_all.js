import outerAPICall from './outerAPICall.js';
import innerAPICall from './innercall.js';

async function main() {

    const index = 3
    const start = new Date()
    console.log("starts main program " + start)
    let valueReturnedByOuterAPICall
    let innerAPICalls = []
    for (let i = 1; i <= index; i++) {
        console.log("outerAPICall_" + i + " starts : " + new Date())
        valueReturnedByOuterAPICall = await outerAPICall(i, i * 2, i);
        console.log("outerAPICall_" + i + " ends   : " + new Date())
        console.log("outerAPICall_" + i + " has sent " + valueReturnedByOuterAPICall)
        for (let j = 1; j <= index; j++) {
            if (j != i) {
                console.log("starts pushing innerAPICall_" + j + ": " + (new Date()))
                innerAPICalls.push(innerAPICall(j, valueReturnedByOuterAPICall))
                console.log("ends pushing innerAPICall_" + j + ": " + (new Date()))
            }
        }
    }

    console.log("end preparing innerAPICalls " + (new Date()))
    await Promise.all(innerAPICalls)
    console.log("ends " + (new Date()))
    var end = new Date() - start
    console.info('Execution time: %dms', end)
}

main()