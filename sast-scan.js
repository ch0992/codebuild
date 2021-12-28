let util = require("util");
let execPromise = util.promisify(require("child_process").exec);

/**
nodejsscan result key lists
  result.files;
  result.missing_sec_header;
  result.sec_issues;
  result.vuln_count;
  result.total_count;
*/
const args = process.argv.slice(2);
let options = {
  opt: args[0] ? "nodejsscan -f " : "nodejsscan -d ",
  name: args[0] ? __dirname + "/" + args[0] : __dirname + "/src"
};
console.log("options : " + JSON.stringify(options));

let command = options.opt + options.name;

console.log("command : " + command);

async function sastScan() {
  try {
    const { stdout, stderr } = await execPromise(command);
    if (stderr) {
      console.log(stderr);
      return process.exit(1);
    } else {
      if (args[0]) {
        console.log(stdout);
      } else {
        let temp = stdout.substr(stdout.indexOf("{"));
        let result = JSON.parse(temp);
        let sec_issues = JSON.stringify(result.sec_issues);

        if (sec_issues.length > 2) {
          console.log("Fail!! there is sec issues");
          console.log(result.sec_issues);
          return process.exit(1);
        } else {
          console.log(
            "Success!! there is no sec issues" +
            "\n" +
            JSON.stringify(result.files) +
            "\n" +
            JSON.stringify(result.total_count) +
            "\n" +
            JSON.stringify(result.missing_sec_header)
          );
          return process.exit(0);
        }
      }
    }
  } catch (error) {
    console.log(error);
    return process.exit(1);
  }
}

// async function sastScanSave() {
//   let result = {};
//   const { stdout, stderr } = await execPromise(
//     "nodejsscan -d " + __dirname + " -o result.json"
//   );
//   return;
// }

sastScan();
