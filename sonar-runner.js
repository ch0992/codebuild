var util = require("util");
var execPromise = util.promisify(require("child_process").exec);

var prepareExecEnvironment = require("./sonar-scanner").prepareExecEnvironment;
// var sonarQubeExecutable = require("./sonarqube-scanner")
//   .getSonarQubeScannerExecutable;

require("dotenv").config();

async function scanCLI(params) {
  console.log("Starting SonarQube analysis...");

  // let command = sonarQubeExecutable();
  let options = prepareExecEnvironment(params, process);

  const { stdout, stderr } = await execPromise(
    // "./sonar-scanner/bin/sonar-scanner",
    "sonar-scanner",
    options
  );
  return { error: stderr, result: stdout };
}

var params = {
  serverUrl: process.env.SERVER_URL
    ? process.env.SERVER_URL
    : "http://10.10.0.56:9000",
  options: {
    "sonar.sources": ".",
    "sonar.inclusions": "src/**" // Entry point of your code
  }
};

scanCLI(params).then(data => {
  //data.error에 WARNING과 ERROR가 동시에 있는경우
  if (data.error.indexOf("WARNING") != -1) {
    let temp = data.error.split("\n");
    let temp2 = [];
    let isError = false;

    for (let i = 0; i < temp.length - 1; i++) {
      if (temp[i].indexOf("ERROR") != -1) {
        temp2.push(temp[i]);
        isError = true;
      }
    }
    data.error.length = 0;
    data.error = temp2.slice();

    if (isError) {
      console.error(data.error);
      return process.exit(1);
    } else {
      console.log(data.result);
      return process.exit(0);
    }
    //data.error에 error만 있는경우
  } else if (data.error.indexOf("ERROR") != -1) {
    console.error(data.error);
    return process.exit(1);
    //data.error가 없는 경우
  } else {
    console.log(data.result);
    return process.exit(0);
  }
});
