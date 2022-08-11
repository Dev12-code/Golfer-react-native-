const axios = require('axios');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const { exists } = require('fs');
const { cli } = require('winston/lib/winston/config');

/*
const pool = new Pool({
    user: "me",
    password: "password",
    database: "pga",
    port: "5432",
    host: "localhost"
});
*/
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

async function idCourses() {
    return pool.query('SELECT course_number FROM courses');
}

async function coursesList() {
    const data = await idCourses();
    var ans = [];
    for (let x of data.rows) {
        ans.push(x.course_number);
    }
    return ans;
}

async function idTournaments() {
    return pool.query('SELECT t_id FROM tournaments_completed');
}

async function tournamentsList() {
    const data = await idTournaments();
    var ans = [];
    for (let x of data.rows) {
        ans.push(x.t_id);
    }
    return ans;
}

async function winnerFinder(t_id) {
    ans = pool.query("SELECT exists (SELECT 1 FROM winners WHERE t_id = $1 LIMIT 1);", [t_id]);
    return ans
}

async function holeFinder(t_id) {
    ans = pool.query("SELECT exists (SELECT 1 FROM tournament_holes WHERE t_id = $1 LIMIT 1);", [t_id]);
    return ans
}

async function holeArray(t_id, par) {
    ans = await pool.query(`SELECT * FROM tournament_holes WHERE t_id = $1 AND par = $2`, [t_id,par]);
    return ans
   
}

module.exports.tournamentSchedule = async function() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://tourapi.pgatourhq.com:8243/SyndSchedule/1.0.0/?format=json&T_CODE=R&YEAR=2022",
        //  + year.toString(),
        "method": "GET",
        "headers": {
            "authorization": process.env.PGA_TOKEN
        }
    }
    // console.log(settings)
    let res = await axios(settings)
        .catch(err => {
            if (err.response.status == 404) {
                console.log("404 error uh oh unfound")
            }
        });
    if (!res.data || res.data === []) {
        console.log("Empty 'data' in resonse. No Action!");
        return;
    }
    console.log("Found ['data'] in resonse. data.length = " + res.data.length);
    const tlist = await tournamentsList();
    const clist = await coursesList();
    for (let x of res.data) {
        var completed = false;

        if (!x["courses"] || x["courses"] === []) {
            continue;
        }
        var courses = x["courses"];
        if ("winners" in x) {
            completed = true;
            var winner = x["winners"]
        }
        for (let z of courses) {
            if (!clist.includes(z["number"])) {
                
                var location = z["city"];
                
                if ("state" in z) {
                    location += ", " + z["state"]
                }
                
                pool.query(`INSERT INTO courses (course_number, name, location, par_value, total_yardage)
                            VALUES ($1, $2, $3, $4, $5)
                            ON CONFLICT ON CONSTRAINT courses_pkey
                            DO NOTHING;`, [z["number"], z["name"], location, z["total_par_value"], z["total_yardage"]]);
                
            }
        }

        if (tlist.includes(x["T_ID"])) {
            win = winnerFinder(x["T_ID"]);
            if (!win.rows[0]["exists"]) {
                pool.query(`INSERT INTO winners (t_id, p_id, total_score, money_earned, fedex_points_earned)
                            VALUES ($1, $2, $3, $4, $5)
                            ON CONFLICT ON CONSTRAINT winners_pkey
                            DO NOTHING;`, [x["T_ID"], y["P_ID"], y["total_score"], y["money_earned"], y["fedex_points_earned"]])        
            }
        }

        if (!tlist.includes(x["T_ID"])) {
            t_id = x["T_ID"].substring(1);
            pool.query(`INSERT INTO tournaments_completed (t_id, name, season, played_year, sequence_number, 
                        start_date, end_date, purse, completed, rounds_official_money) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                        ON CONFLICT ON CONSTRAINT tournaments_completed_pkey
                            DO NOTHING;`,
                        [t_id, x.Tournament_Name, x.Year, x.played_year, x.sequence_number, x.start_date, x.end_date,
                        x["PURSE"], completed, x.rounds_official_money])

            if (completed) {
                for (let y of winner) {
                    pool.query(`INSERT INTO winners (t_id, p_id, total_score, money_earned, fedex_points_earned)
                                VALUES ($1, $2, $3, $4, $5)
                                ON CONFLICT ON CONSTRAINT winners_pkey
                            DO NOTHING;`, [t_id, y["P_ID"], y["total_score"], y["money_earned"], y["fedex_points_earned"]])
                }
            }

            for (let b of courses) {
                pool.query(`INSERT INTO tournament_hosts (t_id, course_number) VALUES ($1, $2)
                ON CONFLICT ON CONSTRAINT tournament_hosts_pkey
                            DO NOTHING;`,
                            [t_id, b["number"]]);
            }
        }

    }

    return
    
}

module.exports.holeInfo = async function() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://tourapi.pgatourhq.com:8243/SyndSchedule/1.0.0/?format=json&T_CODE=R&YEAR=2022",
        //  + year.toString(),
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
    // const tlist = await tournamentsList();

    for (let x of res.data) {
        exist = await holeFinder(x["T_ID"].substring(1));
        if (!exist.rows[0]["exists"]) {
            if (!x["courses"] || x["courses"] === []) {
                continue;
            }
            for (let y of x["courses"]) {
                for (let z of y["holes"]) {           
                             
                    hole_Array = await holeArray(x["T_ID"].substring(1),z["par_value"]);
                    if(hole_Array.rows.length >=4)continue
                    holeExist = hole_Array.rows.filter(function(element) {
                        return element.hole_number === z["hole_number"];
                      });
                    if(holeExist.length>0)continue
                    console.log("aaaa", holeArray.rows , x["T_ID"])
                    pool.query(`INSERT INTO tournament_holes (hole_number, t_id, course_number, par, yardage)
                                    VALUES ($1, $2, $3, $4, $5)
                                    ON CONFLICT ON CONSTRAINT tournament_holes_pkey
                                DO NOTHING;`, [z["hole_number"], x["T_ID"].substring(1), y["number"], z["par_value"], z["scorecard_yardage"]]);
                }
            }
        }
    }

    return;
}

module.exports.overflowWait = function() {
    var start = new Date().getTime();
    var end=0;
    while( (end-start) < 65000){
        end = new Date().getTime();
    }
    
}

module.exports.tournamentOver = function() {
    pool.query("UPDATE tournaments_completed SET completed = True WHERE DATE_PART('day', current_date - end_date) >= 1;")
}

async function golferExists(p_id) {
    ans = pool.query("SELECT exists (SELECT 1 FROM golfers WHERE p_id = $1 LIMIT 1);", [p_id]);
    return ans
}
async function worldeExists(p_id) {
    ans = pool.query("SELECT exists (SELECT 1 FROM worldgolfrankings WHERE p_id = $1 AND year = $2 LIMIT 1);", [p_id,year]);
    return ans
}

module.exports.worldgolfRankings = async function() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://tourapi.pgatourhq.com:8243/YTD_EVT_Statistics/1.0.0/?format=json&T_CODE=R&STAT_ID=186&YEAR=2022&LANG=EN&TYPE=YTD",
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
    console.log(res.data);
    // if(res.data.length>0){

    //     pool.query("DELETE FROM worldgolfrankings WHERE year = $1", [year]);
    //     pool.query("DELETE FROM golfers WHERE country = $1", [null]);
    // }

    for (let x of res.data["tours"][0]["years"][0]["stats"][0]["details"]) {
        exi = await golferExists(x["plrNum"]);
        console.log(x)

        if (!exi.rows[0]["exists"]) {

            var l = x["plrName"][0]["last"];
            var f = x["plrName"][0]["first"];            
            pool.query(`INSERT INTO golfers (p_id, first_name, last_name, country)
                        VALUES ($1, $2, $3, $4)
                        ON CONFLICT ON CONSTRAINT golfers_pkey
                            DO NOTHING;`, [x["plrNum"], f, l, null]);
        }
        
        exist = await worldeExists(x["plrNum"]);

        if (!exi.rows[0]["exists"]) {
            pool.query(`INSERT INTO worldgolfrankings (p_id, rank, year, prev_rank)
                        VALUES ($1, $2, $3, $4)
                        ON CONFLICT ON CONSTRAINT worldgolfrankings_pkey
                                DO NOTHING;`, [x["plrNum"], x["curRank"], year, x["prevRank"]]);
        }
    }
}

// var d = new Date();
// var y = d.getFullYear();

// tournamentSchedule(y);
// overflowWait();
// holeInfo(y);
// overflowWait();
// tournamentOver();
// worldgolfRankings(y);

// module.exports.tournamentSchedule = tournamentSchedule(y);
// module.exports.overflowWait = overflowWait();
// module.exports.holeInfo = holeInfo(y);
// module.exports.overflowWait = overflowWait();
// module.exports.tournamentOver = tournamentOver();
// module.exports.worldgolfRankings = worldgolfRankings(y);