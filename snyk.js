let util = require("util");
let execPromise = util.promisify(require("child_process").exec);

async function snykAuth() {
  let token = "da4d2380-86cf-40a8-8954-8b2ee3bdf305";
  try {
    let authResult = ({ stdout, stderr } = await execPromise(
      "snyk auth " + token
    ));
    return authResult;
  } catch (error) {
    return error;
  }
}
async function snykTest() {
  try {
    let testResult = ({ stdout, stderr } = await execPromise("snyk test"));
    return testResult;
  } catch (error) {
    return error;
  }
}

async function snykMonitor() {
  try {
    let testResult = ({ stdout, stderr } = await execPromise("snyk monitor"));
    return testResult;
  } catch (error) {
    return error;
  }
}

Promise.all([snykAuth(), snykTest(), snykMonitor()]).then(data => {
  console.log(data);
});
