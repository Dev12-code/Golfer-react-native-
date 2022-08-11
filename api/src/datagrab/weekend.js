const axios = require('axios');
const { Pool } = require('pg');
const { set } = require('../app');
//const pool = require("../config/database");

const pool = new Pool({
    user: "postgres",
    password: "root@123",
    database: "postgres",
    port: "5432",
    host: "api.rabbitcards.com",
    ssl: true
});
// const pool = new Pool({
//     user: "postgres",
//     password: "root@123",
//     database: "rabbitcard_testserver",
//     port: "5432",
//     host: "3.143.227.24",
//     ssl: true
// });

async function groupGetter(t_id) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://tourapi.pgatourhq.com:8243/SyndGroupings/1.0.0/?format=json&T_ID=R" + t_id,
        //  + t_id.toString(),
        "method": "GET",
        "headers": {
            "authorization": process.env.PGA_TOKEN
        }
    }
    // console.log("aaaaaaaa",settings)
    try {
        let res = await axios(settings)
        par3s = await par3Finder(t_id);
      
        for (let x of res.data) {
    
            var round = x["RndNum"];
            var count = 0 ;
            var par = par3s[0];
            var parCount = par3s.rows.length;
            var savedHoleCount = 0 ;
            var count_ = 0 ;
            for (let y of x["segments"]) {
                for (let z of y["groups"]) {
                    var players = z["players"];
                    if(players.length === 1)continue;
                    if(savedHoleCount >= parCount){
                        break
                    }else{
                        par = par3s.rows[savedHoleCount];
                        const group_checker = await groupChecker(t_id,round,par.hole_number)
                        var groupID = -1;
                        var groupCount = 0 ;          
                                  
                        const grouping = await getGrouping(t_id,round) 
                        for(let row of grouping.rows){
                            if(row.group_id != groupID){
                                    groupCount++;
                                    groupID = row.group_id
                            }
                        }
                         console.log("bbbbbbb", savedHoleCount,group_checker.rows.length,par.hole_number, groupCount);
                        if(groupCount >= 12) break;
                        if(group_checker.rows.length >=9 ) {
                            savedHoleCount ++
                            count = 0
                            continue;
                        }
                    }
                    var group = z["GrpNum"];
                    var teetime = z["TeeTime"];
                    
                    exists = await groupExists(t_id, round, group);
                    if (!exists.rows[0]["exists"]) {
                        if(count >= 3){
                            count = 0 ;
                            savedHoleCount++;
                            continue;
                            
                        }
                        for (let a of z["players"]) {                           
                            await pool.query(`INSERT INTO groupings (group_id, t_id, p_id, round, tee_time,hole)
                                        VALUES ($1, $2, $3, $4, $5,$6) ON CONFLICT ON CONSTRAINT groupings_pkey DO NOTHING;`, [group, t_id, a["PID"], round, teetime,par.hole_number]);
                          
                        }
                        count++;
                    }
                    
                   
    
                }
    
            }
        }
        console.log("aaaaa","end");
    } catch(err) {
        console.log(err);
    }
    

}
module.exports.groupExisting = async function groupExisting(t_id , round) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://tourapi.pgatourhq.com:8243/SyndTournamentStatus/1.0.0/?format=json&T_ID=R" + t_id,
        //  + t_id.toString(),
        "method": "GET",
        "headers": {
            "authorization": process.env.PGA_TOKEN
        }
    }
    try {
        let res = await axios(settings)
        console.log("aaaaaaaa",res.data)

        for (let row of res.data) {
            if(row.round_number === round){
                console.log("bbbbbbbb", row.round_state)
                return row.round_state
            }
        }

         
    } catch(err) {
        console.log(err);
    }
    return "";

}

async function groupGrabber(t_id) {
    ans = await pool.query(`SELECT * FROM groupings WHERE t_id = $1`, [t_id]);
    return ans
}
async function groupChecker(t_id, round,hole) {
    ans = await pool.query(`SELECT * FROM groupings WHERE t_id = $1 AND round = $2 AND hole = $3`, [t_id,round,hole]);
    return ans
}

async function getGrouping(t_id, round) {
    ans = await pool.query(`SELECT * FROM groupings WHERE t_id = $1 AND round = $2`, [t_id,round]);
    return ans
}


async function cttpChecker(t_id, round, group_id, p_id) {
    ans = await pool.query("SELECT exists (SELECT 1 FROM cttp WHERE t_id = $1 AND round = $2 AND group_id = $3 AND p_id = $4 LIMIT 1);", [t_id, round, group_id, p_id]);    
    return ans;
}

async function par3Finder(t_id) {
    ans = await pool.query("SELECT hole_number FROM tournament_holes WHERE t_id = $1 and par = 3", [t_id]);
    return ans;
}

async function cttpCreator(t_id) {
    groups = await groupGrabber(t_id);
    par3s = await par3Finder(t_id);
    for (let x of groups.rows) {
        exists = await cttpChecker(x.t_id, x.round, x.group_id, x.p_id);
        console.log("exist" , exists.rows , x.round)
        if (!exists.rows[0]["exists"]) {
            for (let y of par3s.rows) {
                await pool.query(`INSERT INTO cttp (t_id, g_id, p_id, round, hole, group_id, won)
                            VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT ON CONSTRAINT cttp_pkey DO NOTHING;`, [t_id, x.id, x.p_id, x.round, y.hole_number, x.group_id, false]);
            }
        }
    }
    console.log("aaaaa", "end");
}

async function groupExists(t_id, round, group_id) {
    ans = await pool.query("SELECT exists (SELECT 1 FROM groupings WHERE t_id = $1 AND round = $2 AND group_id = $3 LIMIT 1);", [t_id, round, group_id]);
    return ans
}

async function currentTournament() {
    // ans = await pool.query("SELECT t_id FROM tournaments_completed;");
    ans = await pool.query("SELECT t_id FROM tournaments_completed WHERE DATE_PART('day', current_date - start_date) BETWEEN -15 and 15;");
    return ans;
}

function overflowWait() {
    var start = new Date().getTime();
    var end=0;
    while( (end-start) < 65000){
        end = new Date().getTime();
    }
    
}

module.exports.updater = async function updater() {
    word = await currentTournament();
    await groupGetter(2022012);
     await cttpCreator(2022012);
    // console.log(word.rows)
    
    // for (let x of word.rows) {
    //     console.log(x);
    //     await groupGetter(x["t_id"]);
    //     await cttpCreator(x["t_id"]);
    // } 

};

// updater();