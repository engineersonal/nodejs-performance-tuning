// const outerAPICall = require("./outerAPICall");
// const innerAPICall = require("./innercall");
import pMap from 'p-map';
import outerAPICall from './outerAPICall.js';
import innerAPICall from './innercall.js';

async function main() {
  const index = 3;
  const start = new Date();
  console.log("starts main program " + start);
  let valueReturnedByOuterAPICall;
  // declare a list for parameters to store, no need to create a list for the api calls anymore
  let innerAPICallParameters = [];
  for (let i = 1; i <= index; i++) {
    console.log("outerAPICall_" + i + " starts : " + new Date());
    valueReturnedByOuterAPICall = await outerAPICall(i, i * 2, i);
    console.log("outerAPICall_" + i + " ends   : " + new Date());
    console.log(
      "outerAPICall_" + i + " has sent " + valueReturnedByOuterAPICall
    );
    for (let j = 1; j <= index; j++) {
      if (j != i) {
        console.log("starts pushing innerAPICall_" + j + ": " + new Date());
        // innerAPICalls.push(innerAPICall(j, valueReturnedByOuterAPICall))
        innerAPICallParameters.push({ j, valueReturnedByOuterAPICall });
        console.log("ends pushing innerAPICall_" + j + ": " + new Date());
      }
    }
  }

  var concurrency_limit = 5;
  console.log("end preparing innerAPICalls " + new Date());
  console.log("start running innerAPICalls " + new Date());
  if (innerAPICallParameters.length > 0) {
    const mapper = async (data) => {
      const { j, valueReturnedByOuterAPICall } = data;
      await innerAPICall(j, valueReturnedByOuterAPICall);
    };
    //use pMap
    await pMap(
      innerAPICallParameters,
      mapper,
      { concurrency: concurrency_limit },
      false
    );
  }
  console.log("ends " + (new Date()))
  var end = new Date() - start
  console.info('Execution time: %dms', end)
}
main()
