import outerAPICall from './outerAPICall.js';
import innerAPICall from './innercall.js';

async function main() {
 
  const index = 3;

  const start = new Date();
  console.log("main program starts " + start);
  let valueReturnedByOuterAPICall;
  for (let i = 1; i <= index; i++) {
    console.log("outerAPICall_" + i + " starts : " + new Date());
    valueReturnedByOuterAPICall = await outerAPICall(i, i * 2, i);
    console.log("outerAPICall_" + i + " ends   : " + new Date());
    console.log(
      "outerAPICall_" + i + " has sent " + valueReturnedByOuterAPICall
    );
    for (let j = 1; j <= index; j++) {
      // to mock the conditions of innerAPI calls, we assume when the indexes are not equal, then we call the inner API
      if (j != i) {
        console.log("innerAPICall_" + j + " starts : " + new Date());
        let output = await innerAPICall(j, valueReturnedByOuterAPICall);
        console.log("innerAPICall_" + j + " ends   : " + new Date());
        console.log("innerAPICall_" + j + " has processed " + output);
      }
    }
  }

  console.log("main program ends " + new Date());
  var end = new Date() - start;
  console.info("Execution time: %dms", end);
}

main()
