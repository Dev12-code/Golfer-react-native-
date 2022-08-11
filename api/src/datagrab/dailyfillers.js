const axios = require('axios');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const { resourceUsage } = require('process');

/*
const pool = new Pool({
    user: "me",
    password: "password",
    database: "pga",
    port: "5432",
    host: "localhost"
});
*/
// eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IllUbGtaVEUyTW1OaFpUWTVZVGMzWW1FMVlXWXhNVEZrTW1ZelpUQTJPV1UzWldNeVlUVmtNQT09In0.eyJhdWQiOiJodHRwOlwvXC9vcmcud3NvMi5hcGltZ3RcL2dhdGV3YXkiLCJzdWIiOiJSYWJiaXRDYXJkQGNhcmJvbi5zdXBlciIsImFwcGxpY2F0aW9uIjp7Im93bmVyIjoiUmFiYml0Q2FyZCIsInRpZXIiOiJVbmxpbWl0ZWQiLCJuYW1lIjoicmFiYml0Y2FyZHByb2QiLCJpZCI6Mzg5LCJ1dWlkIjpudWxsfSwic2NvcGUiOiJhbV9hcHBsaWNhdGlvbl9zY29wZSBkZWZhdWx0IiwiaXNzIjoiaHR0cHM6XC9cL3RvdXJhcGkucGdhdG91cmhxLmNvbTo5NDQzXC9vYXV0aDJcL3Rva2VuIiwidGllckluZm8iOnsiQnJvbnplIjp7InN0b3BPblF1b3RhUmVhY2giOnRydWUsInNwaWtlQXJyZXN0TGltaXQiOjEsInNwaWtlQXJyZXN0VW5pdCI6InNlYyJ9fSwia2V5dHlwZSI6IlBST0RVQ1RJT04iLCJzdWJzY3JpYmVkQVBJcyI6W3sic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJTeW5kR3JvdXBpbmdzIiwiY29udGV4dCI6IlwvU3luZEdyb3VwaW5nc1wvMS4wLjAiLCJwdWJsaXNoZXIiOiJhYmFyYWR3YWoiLCJ2ZXJzaW9uIjoiMS4wLjAiLCJzdWJzY3JpcHRpb25UaWVyIjoiQnJvbnplIn0seyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlN5bmRQbGF5ZXJCaW8iLCJjb250ZXh0IjoiXC9TeW5kUGxheWVyQmlvXC8xLjAuMCIsInB1Ymxpc2hlciI6ImFiYXJhZHdhaiIsInZlcnNpb24iOiIxLjAuMCIsInN1YnNjcmlwdGlvblRpZXIiOiJCcm9uemUifSx7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiQnJvYWRjYXN0U3luZGljYXRlIiwiY29udGV4dCI6IlwvQnJvYWRjYXN0U3luZGljYXRlXC8xLjAuMCIsInB1Ymxpc2hlciI6ImFkbWluIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IkJyb256ZSJ9LHsic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJTeW5kUGxheWVyc01hc3RlciIsImNvbnRleHQiOiJcL1N5bmRQbGF5ZXJzTWFzdGVyXC8xLjAuMCIsInB1Ymxpc2hlciI6ImFiYXJhZHdhaiIsInZlcnNpb24iOiIxLjAuMCIsInN1YnNjcmlwdGlvblRpZXIiOiJCcm9uemUifSx7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiTGl2ZVN0YXRSYW5raW5ncyIsImNvbnRleHQiOiJcL0xpdmVTdGF0UmFua2luZ3NcLzEuMC4wIiwicHVibGlzaGVyIjoic2hhdWdodG9uIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IkJyb256ZSJ9LHsic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJTeW5kU2NoZWR1bGUiLCJjb250ZXh0IjoiXC9TeW5kU2NoZWR1bGVcLzEuMC4wIiwicHVibGlzaGVyIjoiYWJhcmFkd2FqIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IkJyb256ZSJ9LHsic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJTeW5kU2NvcmVjYXJkIiwiY29udGV4dCI6IlwvU3luZFNjb3JlY2FyZFwvMS4wLjAiLCJwdWJsaXNoZXIiOiJhYmFyYWR3YWoiLCJ2ZXJzaW9uIjoiMS4wLjAiLCJzdWJzY3JpcHRpb25UaWVyIjoiQnJvbnplIn0seyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlN5bmRMZWFkZXJib2FyZCIsImNvbnRleHQiOiJcL1N5bmRMZWFkZXJib2FyZFwvMS4wLjAiLCJwdWJsaXNoZXIiOiJhYmFyYWR3YWoiLCJ2ZXJzaW9uIjoiMS4wLjAiLCJzdWJzY3JpcHRpb25UaWVyIjoiQnJvbnplIn0seyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6Ik5vY0V2ZW50U3RhdGUiLCJjb250ZXh0IjoiXC9Ob2NFdmVudFN0YXRlXC8xLjAuMCIsInB1Ymxpc2hlciI6ImFkbWluIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IkJyb256ZSJ9LHsic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJTeW5kVG91cm5hbWVudERldGFpbHMiLCJjb250ZXh0IjoiXC9TeW5kVG91cm5hbWVudERldGFpbHNcLzEuMC4wIiwicHVibGlzaGVyIjoiYWJhcmFkd2FqIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IkJyb256ZSJ9LHsic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJTeW5kVG91cm5hbWVudEhvbGVTdGF0cyIsImNvbnRleHQiOiJcL1N5bmRUb3VybmFtZW50SG9sZVN0YXRzXC8xLjAuMCIsInB1Ymxpc2hlciI6ImFiYXJhZHdhaiIsInZlcnNpb24iOiIxLjAuMCIsInN1YnNjcmlwdGlvblRpZXIiOiJCcm9uemUifSx7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiU3luZFNjb3JlY2FyZFN0YXRzIiwiY29udGV4dCI6IlwvU3luZFNjb3JlY2FyZFN0YXRzXC8xLjAuMCIsInB1Ymxpc2hlciI6ImFiYXJhZHdhaiIsInZlcnNpb24iOiIxLjAuMCIsInN1YnNjcmlwdGlvblRpZXIiOiJCcm9uemUifSx7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiU3luZFRvdXJuYW1lbnRGaWVsZCIsImNvbnRleHQiOiJcL1N5bmRUb3VybmFtZW50RmllbGRcLzEuMC4wIiwicHVibGlzaGVyIjoiYWJhcmFkd2FqIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IkJyb256ZSJ9LHsic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJUZXN0Rm9yTWlzc2luZ0NvbnZlcnRlcnMiLCJjb250ZXh0IjoiXC9UZXN0Rm9yTWlzc2luZ0NvbnZlcnRlcnNcLzEuMC4wIiwicHVibGlzaGVyIjoiYWRtaW4iLCJ2ZXJzaW9uIjoiMS4wLjAiLCJzdWJzY3JpcHRpb25UaWVyIjoiQnJvbnplIn0seyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6InRlc3RBUEkiLCJjb250ZXh0IjoiXC90ZXN0XC8xLjAuMCIsInB1Ymxpc2hlciI6ImFkbWluIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IkJyb256ZSJ9LHsic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJTeW5kU3RhdGlzdGljTGlzdCIsImNvbnRleHQiOiJcL1N5bmRTdGF0aXN0aWNMaXN0XC8xLjAuMCIsInB1Ymxpc2hlciI6ImFiYXJhZHdhaiIsInZlcnNpb24iOiIxLjAuMCIsInN1YnNjcmlwdGlvblRpZXIiOiJCcm9uemUifSx7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiVE9VUkFQSURvY3VtZW50YXRpb24iLCJjb250ZXh0IjoiXC9kb2N1bWVudGF0aW9uXC8xLjAuMCIsInB1Ymxpc2hlciI6ImFiYXJhZHdhaiIsInZlcnNpb24iOiIxLjAuMCIsInN1YnNjcmlwdGlvblRpZXIiOiJCcm9uemUifSx7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiVGltZVpvbmVUZXN0IiwiY29udGV4dCI6IlwvVGltZVpvbmVUZXN0XC8xLjAuMCIsInB1Ymxpc2hlciI6ImFkbWluIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IkJyb256ZSJ9LHsic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJTeW5kVG91cm5hbWVudFN0YXR1cyIsImNvbnRleHQiOiJcL1N5bmRUb3VybmFtZW50U3RhdHVzXC8xLjAuMCIsInB1Ymxpc2hlciI6ImFiYXJhZHdhaiIsInZlcnNpb24iOiIxLjAuMCIsInN1YnNjcmlwdGlvblRpZXIiOiJCcm9uemUifSx7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiWVREX0VWVF9TdGF0aXN0aWNzIiwiY29udGV4dCI6IlwvWVREX0VWVF9TdGF0aXN0aWNzXC8xLjAuMCIsInB1Ymxpc2hlciI6ImFiYXJhZHdhaiIsInZlcnNpb24iOiIxLjAuMCIsInN1YnNjcmlwdGlvblRpZXIiOiJCcm9uemUifV0sImNvbnN1bWVyS2V5IjoiR05sdnA2RldJUGNma21NWmZrbUw2N0l4aXJVYSIsImV4cCI6Mzc3NjkzMjI5NCwiaWF0IjoxNjI5NDQ4NjQ3LCJqdGkiOiJkMGJjNTRjYi02MGM5LTRhNTUtYjU0Ny01ZTdkODBlOTBlYjcifQ.NEm9qIawHmyoohjffbNmImISbPeedcYKc-jJeV7avUkMCktJTTdEn2jN8FWLzO40GbNqzfEbhhf0P8HI0ZRKiEHhWElsdPO1qk9s8iDBnk8zAjBRrJyL5pOeLBxoreeYOVXdXttdiHHOG1SzxEL1tpmNymScq0zlVZ4SbcroAvxqVe5Vm2eJTFJN9ZLlc3eANNf6IbYHHoy0ooerF8RhGRdu1MxBlA5GmCq4Xc_t1yoVAKbjwdZXZksjdPZhkuB32Y4YnonG45Fq2xU9Mk5MHElrwhdhJOF0ElOXlmpntP8Kp_sDrEtNKqlstnZWMFI688Gaga1RVpjC5DMEeeZ2WQ

var d = new Date();
var year = d.getFullYear();

// const pool = new Pool({
//     user: "rabbitcards",
//     password: "rabbitcards",
//     database: "rabbitcards",
//     port: "5432",
//     host: "rabbitcards.cjeeyhc5nam8.us-east-1.rds.amazonaws.com",
//     ssl: true
// });
const pool = new Pool({
    user: "postgres",
    password: "root@123",
    database: "postgres",
    port: "5432",
    host: "api.rabbitcards.com",
    ssl: true
});

function overflowWait() {
    var start = new Date().getTime();
    var end=0;
    while( (end-start) < 100000){
        end = new Date().getTime();
    }
    
}

async function idGolfers(p_id) {
    return pool.query("SELECT exists (SELECT 1 FROM golfers WHERE p_id = $1 LIMIT 1);", [p_id]);
}

async function statGolfers(p_id, year) {
    return pool.query("SELECT exists (SELECT 1 FROM golfer_stats WHERE p_id = $1 AND year = $2 LIMIT 1);", [p_id, year]);
}

module.exports.golferStats = async function() {

    const birdie = "02333"
    const driving = "102"
    const app100125 = "02364"
    const app125150 = "02366"
    const app150175 = "02367"
    const app175200 = "02368"
    const app200 = "02369"
    const scrambling = "130"
    const sandsave = "111"
    const putting = "02428"
    try {
        data = {};

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://tourapi.pgatourhq.com:8243/YTD_EVT_Statistics/1.0.0/?format=json&T_CODE=R&STAT_ID=" + birdie + "&YEAR=" + year + "&TYPE=YTD",
            "method": "GET",
            "headers": {
                "authorization": process.env.PGA_TOKEN
            }
        }
        let count = 0;
        let res = await axios(settings)

        for (let x of res.data["tours"][0]["years"][0]["stats"][0]["details"]) {

            data[x["plrNum"]] = [];
            data[x["plrNum"]].push(x["statValues"][0]["statValue1"] | "");
            data[x["plrNum"]].push(x["curRank"] | 0);
            count++;
            
        }

        console.log('api 1=', count);
        overflowWait();        
    
        settings["url"] = "https://tourapi.pgatourhq.com:8243/YTD_EVT_Statistics/1.0.0/?format=json&T_CODE=R&STAT_ID=" + driving + "&YEAR=" + year + "&TYPE=YTD";

        let res1 = await axios(settings)
        count = 0;
        for (let x of res1.data["tours"][0]["years"][0]["stats"][0]["details"]) {
            
            if (x["plrNum"] in data) {
                data[x["plrNum"]].push(x["statValues"][0]["statValue1"] | "");
                data[x["plrNum"]].push(x["curRank"] | 0);
                count++;
            }

        }

        for (let y in data) {
            if(data[y].length < 4) {
                data[y].push("");
                data[y].push(0);
            }
        }

        console.log('api 2=', count);
        overflowWait();

        settings["url"] = "https://tourapi.pgatourhq.com:8243/YTD_EVT_Statistics/1.0.0/?format=json&T_CODE=R&STAT_ID=" + app100125 + "&YEAR=" + year + "&TYPE=YTD";

        let res2 = await axios(settings)
        count = 0;
        for (let x of res2.data["tours"][0]["years"][0]["stats"][0]["details"]) {
            
            if (x["plrNum"] in data) {
                data[x["plrNum"]].push(x["statValues"][0]["statValue1"] | "");
                data[x["plrNum"]].push(x["curRank"] | 0);
                count++;
            }
        }

        for (let y in data) {
            if(data[y].length < 6) {
                data[y].push("");
                data[y].push(0);
            }
        }

        console.log('api 3=', count);
        overflowWait();

        settings["url"] = "https://tourapi.pgatourhq.com:8243/YTD_EVT_Statistics/1.0.0/?format=json&T_CODE=R&STAT_ID=" + app125150 + "&YEAR=" + year + "&TYPE=YTD";

        let res3 = await axios(settings)
        count = 0;
        for (let x of res3.data["tours"][0]["years"][0]["stats"][0]["details"]) {
            
            if (x["plrNum"] in data) {
                data[x["plrNum"]].push(x["statValues"][0]["statValue1"] | "");
                data[x["plrNum"]].push(x["curRank"] | 0);
                count++;
            }
        }

        for (let y in data) {
            if(data[y].length < 8) {
                data[y].push("");
                data[y].push(0);
            }
        }

        console.log('api 4=', count);
        overflowWait();

        settings["url"] = "https://tourapi.pgatourhq.com:8243/YTD_EVT_Statistics/1.0.0/?format=json&T_CODE=R&STAT_ID=" + app150175 + "&YEAR=" + year + "&TYPE=YTD";

        let res4 = await axios(settings)
        count = 0;
        for (let x of res4.data["tours"][0]["years"][0]["stats"][0]["details"]) {
            
            if (x["plrNum"] in data) {
                data[x["plrNum"]].push(x["statValues"][0]["statValue1"] | "");
                data[x["plrNum"]].push(x["curRank"] | 0);
                count++;
            }
        }

        for (let y in data) {
            if(data[y].length < 10) {
                data[y].push("");
                data[y].push(0);
            }
        }
        console.log('api 5=', count);
        overflowWait();

        settings["url"] = "https://tourapi.pgatourhq.com:8243/YTD_EVT_Statistics/1.0.0/?format=json&T_CODE=R&STAT_ID=" + app175200 + "&YEAR=" + year + "&TYPE=YTD";

        let res5 = await axios(settings)
        count = 0;
        for (let x of res5.data["tours"][0]["years"][0]["stats"][0]["details"]) {
            
            if (x["plrNum"] in data) {
                data[x["plrNum"]].push(x["statValues"][0]["statValue1"] | "");
                data[x["plrNum"]].push(x["curRank"] | 0);
                count++;
            }
        }

        for (let y in data) {
            if(data[y].length < 12) {
                data[y].push("");
                data[y].push(0);
            }
        }
        console.log('api 6=', count);
        overflowWait();

        settings["url"] = "https://tourapi.pgatourhq.com:8243/YTD_EVT_Statistics/1.0.0/?format=json&T_CODE=R&STAT_ID=" + app200 + "&YEAR=" + year + "&TYPE=YTD";

        let res6 = await axios(settings)
        count = 0;
        for (let x of res6.data["tours"][0]["years"][0]["stats"][0]["details"]) {
            
            if (x["plrNum"] in data) {
                data[x["plrNum"]].push(x["statValues"][0]["statValue1"] | "");
                data[x["plrNum"]].push(x["curRank"] | 0);
                count++;
            }
        }
        for (let y in data) {
            if(data[y].length < 14) {
                data[y].push("");
                data[y].push(0);
            }
        }
        console.log('api 7=', count);
        overflowWait();

        settings["url"] = "https://tourapi.pgatourhq.com:8243/YTD_EVT_Statistics/1.0.0/?format=json&T_CODE=R&STAT_ID=" + scrambling + "&YEAR=" + year + "&TYPE=YTD";

        let res7 = await axios(settings)
        count = 0;
        for (let x of res7.data["tours"][0]["years"][0]["stats"][0]["details"]) {
            
            if (x["plrNum"] in data) {
                data[x["plrNum"]].push(x["statValues"][0]["statValue1"] | "");
                data[x["plrNum"]].push(x["curRank"] | 0);
                count++;
            }
        }
        for (let y in data) {
            if(data[y].length < 16) {
                data[y].push("");
                data[y].push(0);
            }
        }
        console.log('api 8=', count);
        overflowWait();

        settings["url"] = "https://tourapi.pgatourhq.com:8243/YTD_EVT_Statistics/1.0.0/?format=json&T_CODE=R&STAT_ID=" + sandsave + "&YEAR=" + year + "&TYPE=YTD";

        let res8 = await axios(settings)
        count = 0;
        for (let x of res8.data["tours"][0]["years"][0]["stats"][0]["details"]) {
            
            if (x["plrNum"] in data) {
                data[x["plrNum"]].push(x["statValues"][0]["statValue1"] | "");
                data[x["plrNum"]].push(x["curRank"] | 0);
                count++;
            }
        }
        for (let y in data) {
            if(data[y].length < 18) {
                data[y].push("");
                data[y].push(0);
            }
        }
        console.log('api 9=', count);
        overflowWait();

        settings["url"] = "https://tourapi.pgatourhq.com:8243/YTD_EVT_Statistics/1.0.0/?format=json&T_CODE=R&STAT_ID=" + putting + "&YEAR=" + year + "&TYPE=YTD";

        let res9 = await axios(settings)
        count = 0;
        for (let x of res9.data["tours"][0]["years"][0]["stats"][0]["details"]) {
            
            if (x["plrNum"] in data) {
                data[x["plrNum"]].push(x["statValues"][0]["statValue1"] | "");
                data[x["plrNum"]].push(x["curRank"] | 0);
                count++;
            }
        }
        for (let y in data) {
            if(data[y].length < 20) {
                data[y].push("");
                data[y].push(0);
            }
        }
        console.log('api 10=', count);
        for (let y in data) {
            added = [y, year];
            for (let z of data[y]) {
                added.push(z);
            }
            console.log(added.length);
            await pool.query("DELETE FROM golfer_stats WHERE p_id = $1 AND year = $2", [y, year]);
            await pool.query(`INSERT INTO golfer_stats (p_id, year, birdie_conversion, bc_rank, driving_accuracy, da_rank, 
                        approach_100125, a100_rank, approach_125150, a125_rank, approach_150175, a150_rank, approach_175200, a175_rank, 
                        approach_200, a200_rank, scrambling_perc, sp_rank, sand_save, ss_rank, putting_perc, pp_rank) VALUES 
                        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
                        ON CONFLICT ON CONSTRAINT golfer_stats_pkey
                            DO NOTHING;`, 
                        added);
        }
    } catch(err) {
        console.log(err);
    }
}


module.exports.makeGolfers = async function() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://tourapi.pgatourhq.com:8243/SyndPlayersMaster/1.0.0/?format=json&T_CODE=R",
        "method": "GET",
        "headers": {
            "authorization": process.env.PGA_TOKEN
        }
    }

    let res = await axios(settings)
        .catch(err => {
        if (err.response.status == 404) {
            console.log("404 error uh oh unfound")
        }

        })

    for (let x of res.data) {
        exists = await idGolfers(x.p_id);
        if (exists.rows[0]["exists"]) {
            pool.query(`UPDATE golfers SET country = $1 WHERE p_id = $2`, [x.country, x.p_id]);
        }
        else {
            pool.query('INSERT INTO golfers (p_id, first_name, last_name, country) VALUES ($1, $2, $3, $4) ON CONFLICT ON CONSTRAINT golfers_pkey DO NOTHING;', [x.p_id, x.first_name, x.last_name, x["country"]]);
        }
        
    }

    return;
}

module.exports.printer = async function() {
    t = await tournamentField();
    for (let x of t.rows) {
        t_id = x["t_id"].toString();
        await pool.query("DELETE FROM tournament_field WHERE t_id = $1;", [t_id]);

        var year = t_id.substring(0, 4);
        var tourney = t_id.substring(4);

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://tourapi.pgatourhq.com:8243/SyndTournamentField/1.0.0/?format=json&T_CODE=R&YEAR=" + year.toString() + "&T_NUM=" + tourney.toString(),
            "method": "GET",
            "headers": {
                "authorization": process.env.PGA_TOKEN
            }
        }

        let res = await axios(settings)
        .catch(err => {
            if (err.response.status == 404) {
                console.log("404 error uh oh unfound")
            }
        })

        for (let y of res.data["Tournament"]["Players"]) {            
            await pool.query("INSERT INTO tournament_field (t_id, p_id) VALUES ($1, $2) ON CONFLICT ON CONSTRAINT tournament_field_pkey DO NOTHING;", [t_id, y["TournamentPlayerId"]]);
        }

        overflowWait();

    }
    
}

async function tournamentField() {
    tourneys = await pool.query("SELECT t_id FROM tournaments_completed;");
    //tourneys = await pool.query("SELECT t_id FROM tournaments_completed WHERE DATE_PART('day', start_date - current_date) BETWEEN -260 and -220;");
    return tourneys;
  
}


async function checker(p_id) {
    return pool.query("SELECT exists (SELECT 1 FROM golfers WHERE p_id = $1 LIMIT 1);", [p_id]);
    
}

async function check() {
    data = await checker();
    console.log(data.rows[0]["exists"]);
}

// var d = new Date();
// var y = d.getFullYear();

//makeGolfers();
// golferStats(y);
//overflowWait();
// printer();