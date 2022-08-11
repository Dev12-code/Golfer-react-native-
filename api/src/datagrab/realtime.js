const axios = require('axios');
const { Pool } = require('pg');

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

async function golferExists(p_id) {
    ans = await pool.query("SELECT exists (SELECT 1 FROM golfers WHERE p_id = $1 LIMIT 1);", [p_id]);
    return ans
}

async function scoreBoarder(t_id) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://tourapi.pgatourhq.com:8243/SyndLeaderboard/1.0.0/?format=json&T_ID=R" + t_id.toString(),
        "method": "GET",
        "headers": {
            "authorization": process.env.PGA_TOKEN
        }
    }
    try {
        let res = await axios(settings)        
        var round = 0;
        for (let y of res.data[0]["rounds"]) {
            if (y["rndnum"] > round && (y["rndState"] == "RIP" || y["rndState"] == "ROF")  && round != 401) {
                round = y["rndnum"];
            }
        }

        await pool.query("DELETE FROM scoreboard WHERE t_id = $1 AND round = $2;", [t_id, round]);

        for (let x of res.data[0]["leaderboard"]) {
            exi = await golferExists(x["p_id"]);

            if (!exi.rows[0]["exists"]) {
                var l = x["last_name"];
                var f = x["first_name"];
                var country = x["country"];

                await pool.query(`INSERT INTO golfers (p_id, first_name, last_name, country)
                            VALUES ($1, $2, $3, $4) ON CONFLICT ON CONSTRAINT golfers_pkey DO NOTHING;`, [x["p_id"], f, l, country]);
            }

            await pool.query(`INSERT INTO scoreboard (t_id, p_id, round, status, start_hole, group_id, position, total,
                        today, thru) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) ON CONFLICT ON CONSTRAINT scoreboard_pkey DO NOTHING;`, 
                        [t_id, x["p_id"], round, x["status"], x["start_hole"], x["GrpNum"], x["position"], 
                    x["total"], x["round_score"], x["thru"]]);
        }
    } catch(err) {
        console.log(err);
    }        
}

async function scoreCardChecker(t_id, p_id, round, thru) {
    return await pool.query("SELECT exists (SELECT 1 FROM scorecards WHERE p_id = $1 AND t_id = $2 AND round = $3 AND thru = $4 LIMIT 1);",
                       [p_id, t_id, round, thru]);
}

async function scoreCarder(t_id) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://tourapi.pgatourhq.com:8243/SyndScorecard/1.0.0/?format=json&T_ID=R" + t_id.toString(),
        "method": "GET",
        "headers": {
            "authorization": process.env.PGA_TOKEN
        }
    }

    try {
        let res = await axios(settings)       
        for (let x of res.data) {
    
            var p_id = x["p_id"];
            var round = x["round"];
            var thru = x["thru"];
    
            updated = await scoreCardChecker(t_id, p_id, round, thru);
            if (!updated.rows[0]["exists"]) {
    
                await pool.query("DELETE FROM scorecards WHERE p_id = $1 AND round = $2 AND t_id = $3", [p_id, round, t_id]);
    
                for (let y of x["holes"]) {
                    await pool.query(`INSERT INTO scorecards (t_id, p_id, round, thru, hole_number, par, strokes, status)
                                VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT ON CONSTRAINT scorecards_pkey DO NOTHING;`, [t_id, p_id, round, thru, y["hole_number"],
                                y["par"], y["strokes"], y["status"]]);
                }
            }
        }
    } catch(err) {
        console.log(err);
    }
    
}

async function par3CTTP(t_id) {
    temp = await par3Holes(t_id);
    par3s = [];
    for (let x of temp.rows) {
        par3s.push(x["hole_number"]);
    }    

    temp1 = await roundFinder(t_id);
    for(let round =1 ; round<5;round++){

        // round = temp1.rows[0]["elapsed"] + 1;
        //  round = 2;
        if(round>4)  return
        temp2 = await roundsPlayers(t_id, round);

        var players = [];
        for (let x of temp2.rows) {
            players.push(x["p_id"]);
        }
        console.log("aaaaa", round,players)

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://tourapi.pgatourhq.com:8243/PlayByPlay/1.0.0/?format=json&T_ID=R" + t_id.toString() + "&RND_NUM=" + round.toString(),
            "method": "GET",
            "headers": {
                "authorization": process.env.PGA_TOKEN
            }
        }

        try {
            let res = await axios(settings)
            for (let x of res.data) {
                for (let y of x["Players"]) {                
                    if (players.includes(parseInt(y["PID"]))) {
                        for (let z of y["round"][0]["hole"]) {
                            if (par3s.includes(z["Number"])) {
                                exists = await redundancyChecker(t_id, round, y["PID"], z["Number"]);
                                if (!exists.rows[0]["exists"]) {
                                    let distance = (z["shot"][0]["PinDistance"]/12).toFixed(2);
                                    console.log("aaaaaaaa===========", y["PID"]);

                                    await pool.query(`INSERT INTO cttp_results (p_id, t_id, round, hole, distance)
                                                VALUES ($1, $2, $3, $4, $5) ON CONFLICT ON CONSTRAINT cttp_results_pkey DO NOTHING;`, [y["PID"], t_id, round, z["Number"], distance]);
                                }
                            }
                        }
                    }
                }
        
            }    
            await winnerFinder(t_id, round, par3s[0]);
        } catch(err) {
            console.log("aaaaaaa" ,err);
        }
      
    }        
    
}

async function redundancyChecker(t_id, round, p_id, hole) {
    ans = await pool.query(`SELECT exists (SELECT 1 FROM cttp_results WHERE t_id = $1 AND round = $2 AND p_id = $3 AND hole = $4 LIMIT 1)`, [t_id, round, p_id, hole]);
    return ans;
}

async function winnerFinder(t_id, round, first) {
    console.log(t_id,round,first)
    temp = await selectCTTP(t_id, round);
    groupID = 0;
    shortPID = 1;
    hole = first;
    bestDist = 999;
     await pool.query(`UPDATE cttp SET won = false WHERE t_id = $1 AND round = $2;`, [t_id,round]);

     var count = 0;
    for (let x of temp.rows) {
        var distance = x["distance"];
        if(distance === null || distance === 'NaN'){
            distance = 998;
        }
           console.log("aaaaa",distance,bestDist,x["p_id"],x["hole"] ,  )
        if (x["hole"] != hole) {
              console.log("addd new data", shortPID,t_id,round,hole,)
            await pool.query(`UPDATE cttp SET won = true WHERE p_id = $1 AND t_id = $2 AND round = $3 and hole = $4;`, [shortPID, t_id, round, hole]);
            hole = x["hole"];
            bestDist = 999;
        }
        if (x["group_id"] != groupID) {
            groupID = x["group_id"]
        }
        if (distance < bestDist) {
            bestDist = distance;
            shortPID = x["p_id"];
        }
        count++;
        if(temp.rows.length  === count){
            console.log("addd new data", shortPID,t_id,round,hole)
            await pool.query(`UPDATE cttp SET won = true WHERE p_id = $1 AND t_id = $2 AND round = $3 and hole = $4;`, [shortPID, t_id, round, hole]);
        }
    }
}

async function selectCTTP(t_id, round) {
    ans = await pool.query(`SELECT a.t_id,a.round,a.hole, a.group_id, a.won, a.p_id , b.distance FROM cttp a 
                            LEFT JOIN cttp_results b
                            ON a.t_id = b.t_id AND a.round = b.round AND a.hole = b.hole AND a.p_id = b.p_id
                             WHERE a.t_id = $1 AND a.round = $2 ORDER BY a.group_id, a.hole,a.p_id;`, [t_id, round]);
    return ans;
}

async function par3Holes(t_id) {
    ans = await pool.query(`SELECT hole_number FROM tournament_holes 
                    WHERE t_id = $1 and par = 3
                    ORDER BY hole_number`, [t_id]);
    return ans;
}

async function roundFinder(t_id) {
    ans = await pool.query(`SELECT date_part('day', current_date - start_date) "elapsed" from tournaments_completed WHERE t_id = $1;`, [t_id]);
    return ans;
}

async function roundsPlayers(t_id, round) {
    // ans = await pool.query(`with top3groups as (SELECT group_id, sum(rank) FROM cttp a
    // INNER JOIN (SELECT a.p_id, b.rank FROM golfers a 
    // INNER JOIN worldgolfrankings b 
    // ON a.p_id = b.p_id)  b
    // ON a.p_id = b.p_id
    // WHERE t_id = $1 AND round = $2
    // group by group_id
    // order by sum(rank)
    // limit 3)

    // SELECT a.p_id "id" FROM top3groups, cttp a
    // INNER JOIN golfers b
    // ON a.p_id = b.p_id
    // WHERE t_id = $1 AND round = $2 AND top3groups.group_id = a.group_id
    // group by a.p_id;`,[t_id, round]);
    ans = await pool.query(`SELECT p_id FROM cttp 
    WHERE t_id = $1 and round = $2`,[t_id, round]);
    return ans;
}

async function currentTournament() {
    // ans = await pool.query("SELECT t_id FROM tournaments_completed;");
    ans = await pool.query("SELECT t_id FROM tournaments_completed WHERE DATE_PART('day', current_date - start_date) BETWEEN -6 and 6;");
    return ans;
}

function overflowWait() {
    var start = new Date().getTime();
    var end=0;
    while( (end-start) < 65000){
        end = new Date().getTime();
    }
    
}

module.exports.updater = async function () {
    word = await currentTournament();
    console.log("aaaaaaa", word.rows)
    // await par3CTTP(2022475);

    for (let x of word.rows) {
        console.log(x);
        await scoreBoarder(x["t_id"]);     
        await scoreCarder(x["t_id"]);        
        await par3CTTP(x["t_id"]);
    }
};

// updater();