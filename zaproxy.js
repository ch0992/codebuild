const ZapClient = require('zaproxy');
const cliProgress = require('cli-progress');
require("dotenv").config();

const zapOptions = {
    // apiKey: "3bnr8lsq81igt8prf54g89cj7f",
    proxy: "http://ec2-15-165-158-30.ap-northeast-2.compute.amazonaws.com:8070/zap"
}

console.log(zapOptions);

const zap = new ZapClient(zapOptions);
const spider_bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
const active_bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const scan = async () => {
    let target = "https://poc-2nd.dev-nsmall.com/";
    try {
        //Exploring the App (run spider)
        //run spider scan & get spider_scanID
        let spider_scanID = await zap.spider.scan(target);
        console.log("\n\n spider_scanID : " + spider_scanID.scan + "\n");

        //get spider scan status
        let i = 0;
        spider_bar.start(100, 0);
        while (i < 100) {
            let spider_status = await zap.spider.status(spider_scanID);
            let spider_num = parseInt(spider_status.status);
            // console.log("spider_num : " + spider_num);

            spider_bar.update(100, spider_num);
            i = spider_num;

            await sleep(100);

            if (i == 100) {
                console.log("\n\n spider scan completed");
                spider_bar.stop();
                break;
            }
        }

        //get spider scan result
        let spider_result = await zap.spider.results(spider_scanID);
        console.log("\n=========================================================");
        console.log("Exploring the App");
        console.log("=========================================================");
        console.log("1) spider 스캔 결과 : " + JSON.stringify({ spider_result }, null, 2));

        //Attacking the App (run active scan) & get active_scanID
        let active_scanID = await zap.ascan.scan(target);
        console.log("\n\n active_scanID : " + active_scanID.scan + "\n");

        //get active scan status
        let j = 0;
        active_bar.start(100, 0);
        while (j < 100) {
            let active_status = await zap.ascan.status(spider_scanID);
            let active_num = parseInt(active_status.status);
            // console.log("spider_num : " + spider_num);

            active_bar.update(100, active_num);
            j = active_num;

            await sleep(200);

            if (j == 100) {
                console.log("\n\n active scan completed");
                active_bar.stop();
                break;
            }
        }

        //Getting the Results(run alerts)
        let alert = await zap.core.alerts();
        let alertSummary = await zap.core.alertsSummary();
        let isIssue = false;
        let highWarningTemp = [];

        console.log("\n=========================================================");
        console.log("Attacting the App");
        console.log("=========================================================");
        console.log("2) 보안경고 총 " + alert.alerts.length + " 개 \n");

        for (let i = 0; i < alert.alerts.length; i++) {

            if (alert.alerts[i].risk.indexOf("High") != -1) {
                highWarningTemp.push(alert.alerts[i]);
            }

            if (i == alert.alerts.length - 1) {
                if (highWarningTemp.length > 0) {
                    console.log(JSON.stringify(highWarningTemp, null, 2));
                    isIssue = true;
                } else {
                    for (let i = 0; i < alert.alerts.length; i++) {
                        delete alert.alerts[i].other
                        console.log(alert.alerts[i]);
                    }
                }
            }
        }


        console.log("\n=========================================================");
        console.log("Getting the Result");
        console.log("=========================================================");
        console.log("3) alerts 요약 \n" + JSON.stringify(alertSummary, null, 2));

        if (isIssue) {
            console.log("\n*********************************************************");
            console.log("Penetration Testing Failed");
            console.log("*********************************************************");
            return process.exit(1);
        } else {
            console.log("\n*********************************************************");
            console.log("Penetration Testing Passed");
            console.log("*********************************************************");
            return process.exit(0);
        }
    } catch (error) {
        console.error(error);
        return process.exit(1);
    }
}

scan();

const sleep = (ms) => {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}













