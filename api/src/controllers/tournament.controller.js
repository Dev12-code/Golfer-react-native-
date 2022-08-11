const db = require("../config/database");
const sq = require("../models");
const User = sq.user;
const Cttp_pick = sq.user_pick_cttp;

exports.listAllTournaments = async (req, res) => {
    const response = await db.query('SELECT * FROM tournaments_completed ORDER BY start_date');
    res.status(200).send(response.rows);
}

exports.findTournamentByID = async (req, res) => {
    const ID = parseInt(req.params.t_id);
    const response = await db.query(`SELECT * FROM tournaments_completed WHERE t_id = $1`, [ID]);
    const courses = await db.query(`SELECT C.* FROM tournament_hosts as T left join courses as C on c.course_number = T.course_number WHERE T.t_id = $1`, [ID]);
    //const rounds = await db.query(`SELECT R.* FROM scoreboard as T left join courses as C on c.course_number = T.course_number WHERE T.t_id = $1`, [ID]);

    if (response.rows.length > 0) {
        let tournament = response.rows[0];
        tournament.courses = courses.rows;
        //tournament.rounds = rounds.rows;
        res.status(200).send(tournament);
    } else {
        res.status(200).send({});
    }
}

exports.listTournamentsBySeason = async (req, res) => {
    const Season = parseInt(req.params.season);
    const response = await db.query(`SELECT * FROM tournaments_completed a INNER JOIN 
                                    (SELECT * FROM courses a INNER JOIN tournament_holes b
                                        ON a.course_number = b.course_number) b
                                    ON a.t_id = b.t_id
                                    WHERE season = $1`, [Season]);
    res.status(200).send(response.rows);
}

exports.listTournamentsByDateRange = async (req, res) => {
    const start = new Date(req.params.start);
    const end = new Date(req.params.end);
    const t_id = req.params.t_id;
   console.log("aaaaaaa",t_id);
    // const response = await db.query(`SELECT * FROM tournaments_completed  a INNER JOIN 
    //                                 (SELECT * FROM courses a INNER JOIN tournament_holes b
    //                                     ON a.course_number = b.course_number) b
    //                                 ON a.t_id = b.t_id 
    //                                 WHERE start_date > $1 AND start_date < $2`, [start, end]);
    // const response = await db.query(`SELECT * FROM tournaments_completed
    //                                 WHERE start_date > $1 AND start_date < $2`, [start, end]);
    const response = await db.query(`SELECT * FROM tournaments_completed
                                    WHERE t_id = $1 `, [t_id]);
    let tournaments = [];
    for (let row of response.rows) {
        const cou_response = await db.query(`SELECT C.* FROM tournament_hosts as T left join courses as C on c.course_number = T.course_number WHERE T.t_id = $1`, [row.t_id]);

        let courses = [];
        if (cou_response.rows.length > 0) {
            for (let crow of cou_response.rows) {
                const holes = await db.query(`SELECT hole_number, par, yardage FROM tournament_holes WHERE t_id = $1 AND course_number=$2`, [row.t_id, crow.course_number]);
                crow.holes = holes.rows;
                courses.push(crow);
            }

        }

        row.courses = courses;
        tournaments.push(row);
    }
    res.status(200).send(tournaments);
}

exports.listUserRabbitCards = async (req, res) => {
    const User = parseInt(req.params.user);
    const response = await db.query(`SELECT * FROM tournaments_completed a INNER JOIN 
                                    (SELECT * FROM cttp a INNER JOIN user_pick_cttps b
                                    ON a.id = b.cttp_id) b ON a.t_id = b.t_id 
                                    WHERE b.user_id = $1`, [User]);
    res.status(200).send(response.rows);
}

exports.listGroupingsinTournament = async (req, res) => {
    const t_id = parseInt(req.params.t_id);
    const response = await db.query(`SELECT * FROM groupings
                                    WHERE t_id = $1`, [t_id]);
    res.status(200).send(response.rows);
}

exports.listGroupsinRound = async (req, res) => {
    const t_id = parseInt(req.params.t_id);
    const round = parseInt(req.params.round);
    const response = await db.query(`SELECT * FROM groupings
                                    WHERE t_id = $1 AND round = $2`, [t_id, round]);
    res.status(200).send(response.rows);
}

exports.listGolfersinGrouping = async (req, res) => {
    const t_id = parseInt(req.params.t_id);
    const round = parseInt(req.params.round);
    const group_id = parseInt(req.params.group_id);
    const response = await db.query(`SELECT * FROM groupings
                                    WHERE t_id = $1 AND round = $2 AND group_id = $3`, [t_id, round, group_id]);
    res.status(200).send(response.rows);
}

exports.listCourseforTournament = async (req, res) => {
    const t_id = parseInt(req.params.t_id);
    const response = await db.query(`SELECT * FROM courses a, tournament_hosts b
                                    WHERE a.course_number = b.course_number AND b.t_id = $1 LIMIT 1`, [t_id]);
    res.status(200).send(response.rows);
}

exports.holesforCourse = async (req, res) => {
    const t_id = parseInt(req.params.t_id);
    const response = await db.query(`SELECT * FROM tournament_holes 
                                    WHERE t_id = $1
                                    ORDER BY hole_number`, [t_id]);
    res.status(200).send(response.rows);
}

exports.tournamentscoreboardbyRound = async (req, res) => {
    const t_id = parseInt(req.params.t_id);
    const round = parseInt(req.params.round);
    const response = await db.query(`SELECT * FROM scoreboard
                                    WHERE t_id = $1 AND round = $2`, [t_id, round]);
    res.status(200).send(response.rows);
}

exports.tournamentPlayerScorebyRound = async (req, res) => {
    const t_id = parseInt(req.params.t_id);
    const round = parseInt(req.params.round);
    const p_id = parseInt(req.params.p_id);
    const response = await db.query(`SELECT * FROM scorecards
                                    WHERE t_id = $1 AND round = $2 AND p_id = $3
                                    ORDER BY hole_number`, [t_id, round, p_id]);
    res.status(200).send(response.rows);
}

exports.tournamentCTTP = async (req, res) => {
    const t_id = parseInt(req.params.t_id);
    const response = await db.query(`SELECT * FROM cttp
                                    WHERE t_id = $1`, [t_id]);
    res.status(200).send(response.rows);
}

exports.groupingsPar3s = async (req, res) => {
    const t_id = parseInt(req.params.t_id);
    const round = parseInt(req.params.round);
    const group_id = parseInt(req.params.group_id);
    // const response = await db.query(`SELECT a.hole_number "hole", a.t_id "t_id", a.course_number "course_number", a.par "par", a.yardage "yardage", b.round "round", b.group_id "group_id", b.won "won", b.p_id "p_id"
    //                                 FROM tournament_holes a inner join cttp b on a.t_id = b.t_id and a.hole_number = b.hole
    //                                 WHERE a.t_id = $1 and par = 3 and group_id = $2 and round = $3
    //                                 ORDER BY hole_number;`, [t_id, group_id, round]);
    const response = await db.query(`SELECT Distinct a.hole_number, a.t_id, a.course_number, a.par, a.yardage, b.round, b.group_id, b.won
                                    FROM tournament_holes a left join cttp b on a.t_id = b.t_id and a.hole_number = b.hole
                                    WHERE a.t_id = $1 and par = 3 and group_id = $2 and round = $3 and b.won = false
                                    ORDER BY hole_number;`, [t_id, group_id, round]);
    console.log(response);
    res.status(200).send(response.rows);
}

exports.specificHole = async (req, res) => {
    const t_id = parseInt(req.params.t_id);
    const hole = parseInt(req.params.hole);
    const round = parseInt(req.params.round);
    // const group_id = parseInt(req.params.group_id);
    // const response = await db.query(`SELECT a.g_id "g_id", a.round "round", a.hole "hole", a.group_id "group_id", a.won "won", a.t_id "t_id", b.course_number "course_number", b.par "par", b.yardage "yardage", b.id "hole_id", c.p_id "p_id", c.first_name "first_name", c.last_name "last_name" FROM cttp a, tournament_holes b, golfers c
    //                                 WHERE a.hole = b.hole_number and a.t_id = b.t_id
    //                                 and a.p_id = c.p_id and
    //                                 a.t_id = $1 and hole = $2 and round = $3 and group_id = $4;`,
    //                                 [t_id, hole, round, group_id]);
    const response = await db.query(`SELECT Distinct a.hole_number, a.t_id, a.course_number, a.par, a.yardage, b.round
      FROM tournament_holes a left join cttp b on a.t_id = b.t_id and a.hole_number = b.hole
      WHERE a.t_id = $1 and par = 3 and hole = $2 and round = $3;`, [t_id, hole, round]);


    // let list = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 14, 15]
    // list = list.sort(() => Math.random() - 0.5)
    
    const groups = await db.query(`SELECT a.group_id, a.p_id, a.hole, b.first_name, b.last_name, b.country, c.rank 
      FROM groupings as a 
      left join golfers as b 
      on a.p_id = b.p_id
      LEFT JOIN worldgolfrankings AS c
      ON a.p_id = c.p_id AND c.year = 2022
      WHERE t_id = $1 AND round = $2 AND hole = $3 
      order by group_id`, [t_id, round, hole]);
    let playerGroupsList = groups.rows;
  
    playerGroupsList.forEach( (el, i) => {
       console.log(i+" "+el.rank);
       if(el.rank === null) el.rank = 1;
    } )

    // count number of groups and number of players in each group and store them in array
    // there is a possibility that some group may total to 101 rather than 100 in probability of winning total
    // reason being we are rounding the number to just 2 decimal points
    let groupIDsList = [];
    for ( let i = 0; i < playerGroupsList.length; i++ ) {
      groupIDsList.push( playerGroupsList[i].group_id );
      let numOfPlayerinGroup = 1;
      let sumOfRankingsinGroup = 0;
      // sumOfRankingsinGroup = sumOfRankingsinGroup + playerGroupsList[i].rank;

      let groupPlayersRankingList = [playerGroupsList[i].rank];
      var last_id = -1;
      for ( let j = 0; j < playerGroupsList.length; j++ ) {
        if ( playerGroupsList[i].group_id == playerGroupsList[j].group_id ) {
          // console.log("correct syntax");
          sumOfRankingsinGroup = sumOfRankingsinGroup + playerGroupsList[j].rank;
          groupPlayersRankingList.push( playerGroupsList[j].rank );
          last_id = j;
        }
      }

      let playerRanking = playerGroupsList[i].rank;
      
      var playerPercRanking = Number( playerRanking / sumOfRankingsinGroup ).toFixed(3);
      if(i===last_id){
        var remainPercRanking = 0.0;
        for ( let j = 0; j < playerGroupsList.length; j++ ) {
          if ( playerGroupsList[i].group_id == playerGroupsList[j].group_id && j!=last_id ) {            
            remainPercRanking = remainPercRanking + parseFloat(playerGroupsList[j].ranking_perc);

          }
        }
        playerPercRanking = Number( 1 - remainPercRanking ).toFixed(3)

      }
      console.log("aaaaaaa",playerPercRanking);

      playerGroupsList[i].ranking_perc = playerPercRanking;  
      
      // bar color
      playerGroupsList[i].ranking_bar_color = "red";      
      
      // let playerPercWinningProbability = Number( 1 - playerPercRanking ).toFixed(3);
      //  playerGroupsList[i].rank_probability = playerPercRanking;

    }

    //  get Unique from array list
    function onlyUniqueFromArray(value, index, self) {
      return self.indexOf(value) === index;
    }

    let groupIDsListUnique = groupIDsList.filter(onlyUniqueFromArray);

    console.log(groupIDsListUnique);

    for ( let k = 0; k < 3; k++ ) {
      let playersIDsGroupWise = [];
      for ( let i = 0; i < playerGroupsList.length; i++ ) {
        if ( playerGroupsList[i].group_id == groupIDsListUnique[k] ) {
          playersIDsGroupWise.push(i);
        }
      }
      
      // we have index of playerGroupsList which are in same group
      // now work on max logic and the rank reverse
      if ( playersIDsGroupWise.length == 3 ) {

        if ( playerGroupsList[playersIDsGroupWise[0]].rank < playerGroupsList[playersIDsGroupWise[1]].rank && playerGroupsList[playersIDsGroupWise[0]].rank < playerGroupsList[playersIDsGroupWise[2]].rank ) {
          console.log("Best : " + playerGroupsList[playersIDsGroupWise[0]].p_id);
          playerGroupsList[playersIDsGroupWise[0]].ranking_bar_color = "green";

          let currentRank = playerGroupsList[playersIDsGroupWise[0]].ranking_perc; 
          if ( playerGroupsList[playersIDsGroupWise[1]].rank > playerGroupsList[playersIDsGroupWise[2]].rank  ) {
            playerGroupsList[playersIDsGroupWise[0]].ranking_perc = playerGroupsList[playersIDsGroupWise[1]].ranking_perc;
            playerGroupsList[playersIDsGroupWise[1]].ranking_perc = currentRank;
          }
          else {
            playerGroupsList[playersIDsGroupWise[0]].ranking_perc = playerGroupsList[playersIDsGroupWise[2]].ranking_perc;
            playerGroupsList[playersIDsGroupWise[2]].ranking_perc = currentRank;
          }


        }

        if ( playerGroupsList[playersIDsGroupWise[1]].rank < playerGroupsList[playersIDsGroupWise[0]].rank && playerGroupsList[playersIDsGroupWise[1]].rank < playerGroupsList[playersIDsGroupWise[2]].rank ) {
          console.log("Best : " + playerGroupsList[playersIDsGroupWise[1]].p_id);
          playerGroupsList[playersIDsGroupWise[1]].ranking_bar_color = "green";


          let currentRank = playerGroupsList[playersIDsGroupWise[1]].ranking_perc; 
          if ( playerGroupsList[playersIDsGroupWise[0]].rank > playerGroupsList[playersIDsGroupWise[2]].rank  ) {
            playerGroupsList[playersIDsGroupWise[1]].ranking_perc = playerGroupsList[playersIDsGroupWise[0]].ranking_perc;
            playerGroupsList[playersIDsGroupWise[0]].ranking_perc = currentRank;
          }
          else {
            playerGroupsList[playersIDsGroupWise[1]].ranking_perc = playerGroupsList[playersIDsGroupWise[2]].ranking_perc;
            playerGroupsList[playersIDsGroupWise[2]].ranking_perc = currentRank;
          }


        }

        if ( playerGroupsList[playersIDsGroupWise[2]].rank < playerGroupsList[playersIDsGroupWise[1]].rank && playerGroupsList[playersIDsGroupWise[2]].rank < playerGroupsList[playersIDsGroupWise[0]].rank ) {
          console.log("Best : " + playerGroupsList[playersIDsGroupWise[2]].p_id);
          playerGroupsList[playersIDsGroupWise[2]].ranking_bar_color = "green";


          let currentRank = playerGroupsList[playersIDsGroupWise[2]].ranking_perc; 
          if ( playerGroupsList[playersIDsGroupWise[0]].rank > playerGroupsList[playersIDsGroupWise[1]].rank  ) {
            playerGroupsList[playersIDsGroupWise[2]].ranking_perc = playerGroupsList[playersIDsGroupWise[0]].ranking_perc;
            playerGroupsList[playersIDsGroupWise[0]].ranking_perc = currentRank;
          }
          else {
            playerGroupsList[playersIDsGroupWise[2]].ranking_perc = playerGroupsList[playersIDsGroupWise[1]].ranking_perc;
            playerGroupsList[playersIDsGroupWise[1]].ranking_perc = currentRank;
          }


        }


      }

      if ( playersIDsGroupWise.length == 2 ) {
        
        // let currentRank = playerGroupsList[playersIDsGroupWise[0]].ranking_perc;
        // if ( playerGroupsList[playersIDsGroupWise[0]].rank < playerGroupsList[playersIDsGroupWise[1]].rank ) {
        //   playerGroupsList[playersIDsGroupWise[0]].ranking_perc = playerGroupsList[playersIDsGroupWise[1]].ranking_perc;

        //   playerGroupsList[playersIDsGroupWise[1]].ranking_perc = currentRank;

        // }
        // else {
        //   playerGroupsList[playersIDsGroupWise[1]].ranking_perc = playerGroupsList[playersIDsGroupWise[0]].ranking_perc;

        //   playerGroupsList[playersIDsGroupWise[0]].ranking_perc = currentRank;
        // }


      }


    }



      
    let holes = [];
    for (let row of response.rows) {
        row.groups = playerGroupsList;
        if(!row['rank'])row['rank'] = 0        
        if(!row['ranking_perc'])row['ranking_perc'] = 0
        holes.push(row);
    }
    console.log("\n\n\n holes : " + holes);
    res.status(200).send(holes);
}

exports.rabbitcardChoices = async (req, res) => {

    const t_id = parseInt(req.params.t_id);
    const round = parseInt(req.params.round);
    const cttp_flag = parseInt(req.params.cttp_flag);
    // var response =  await db.query(`SELECT distinct a.t_id, a.round, a.hole
    // FROM cttp a WHERE a.t_id = $1 AND a.round = $2`, [t_id, round]);
    // if(cttp_flag){
    const response = await db.query(`SELECT distinct a.t_id, a.round, a.hole, c.course_number, c.par, c.yardage
                                    FROM cttp a INNER JOIN tournament_holes c on a.t_id = c.t_id and a.hole = c.hole_number and c.par = 3
                                    WHERE a.t_id = $1 AND a.round = $2`, [t_id, round]);
    let choices = [];
    for (let row of response.rows) {
        var selected = await db.query(`select * from user_pick_cttps as u left join  cttp  as c on c.id=u.cttp_id 
                                        where u.user_id=$1 and c.t_id=$2 and round=$3 and hole=$4`, [req.userId, t_id, round, row.hole]);
    	if(selected.rows.length == 0)
        {
          const groups = await db.query(`SELECT a.group_id, a.p_id, a.hole, b.first_name, b.last_name, b.country, c.rank 
            FROM groupings as a 
            left join golfers as b 
            on a.p_id = b.p_id
            LEFT JOIN worldgolfrankings AS c
            ON a.p_id = c.p_id AND c.year = 2022
            WHERE t_id = $1 AND round = $2 AND hole = $3 
            order by group_id`, [t_id, round, row.hole]);
          var groupIDArray = []
          var gropuID = -1;
          for (let selectedRow of groups.rows) {
            if(selectedRow.group_id!= gropuID){
              groupIDArray.push(selectedRow.group_id)
              gropuID = selectedRow.group_id
            }
          }

          var players = await db.query(`SELECT g.p_id, g.group_id, a.first_name, a.last_name, a.country, s.thru, s.strokes, s.status, c.distance FROM groupings g
          left join golfers a on a.p_id=g.p_id left join scorecards s on s.p_id=g.p_id and g.t_id=s.t_id and g.round=s.round
          left join cttp_results c on c.p_id=g.p_id and c.t_id=g.t_id and c.round=g.round and c.hole=$3
          WHERE g.t_id = $1 AND g.round = $2 AND par=3 and hole_number=$3 and group_id in (SELECT group_id FROM cttp a
          INNER JOIN (SELECT a.p_id, b.rank FROM golfers a 
          INNER JOIN worldgolfrankings b 
          ON a.p_id = b.p_id)  b
          ON a.p_id = b.p_id
          WHERE t_id = $1 AND round = $2 AND group_id in ($4,$5,$6)
          group by group_id
          order by sum(rank)
          ) order by group_id`, [t_id, round, row.hole, groupIDArray[0], groupIDArray[1], groupIDArray[2]]);
          if(!cttp_flag){
              players = await db.query(`SELECT g.p_id, g.group_id, a.first_name, a.last_name, a.country FROM groupings g
              left join golfers a on a.p_id=g.p_id
              WHERE g.t_id = $1 AND g.round = $2 and g.hole=$3 and group_id in (SELECT group_id FROM cttp
              WHERE t_id = $1 AND round = $2 AND group_id in ($4,$5,$6)
              ) order by group_id`, [t_id, round, row.hole, groupIDArray[0], groupIDArray[1], groupIDArray[2]]);
          }

          let array9 = [];
            for (const selectedRow of groupIDArray) {
                for (const player of players.rows) {
                  var data = await db.query(`SELECT * FROM cttp WHERE t_id = $1 and hole = $2 and round = $3 and group_id = $4 and p_id = $5`,
                                    [t_id, row.hole, round, player.group_id, player.p_id]);
                  if (selectedRow == player.group_id) {
                    console.log("aaaaaaa",data.rows[0] ,player)

                       player.selected =  false;
                      if (player.selected === true && data.rows[0].won === true) player.status = 1;
                      else if (player.selected === true && data.rows[0].won === false) player.status = 2;
                      else if (player.selected === false && data.rows[0].won === false) player.status = 3;
                      else if (player.selected === false && data.rows[0].won === true) player.status = 4;
                      array9.push(player);
                      array9.sort((a, b) => parseFloat(a.group_id) - parseFloat(b.group_id));

                  }
                }
            }
          row.players = array9;
          choices.push(row);
        }else{
            var players = await db.query(`SELECT g.p_id, g.group_id, a.first_name, a.last_name, a.country, s.thru, s.strokes, s.status, c.distance FROM groupings g
            left join golfers a on a.p_id=g.p_id left join scorecards s on s.p_id=g.p_id and g.t_id=s.t_id and g.round=s.round
            left join cttp_results c on c.p_id=g.p_id and c.t_id=g.t_id and c.round=g.round and c.hole=$3
            WHERE g.t_id = $1 AND g.round = $2 AND par=3 and hole_number=$3 and group_id in (SELECT group_id FROM cttp a
            INNER JOIN (SELECT a.p_id, b.rank FROM golfers a 
            INNER JOIN worldgolfrankings b 
            ON a.p_id = b.p_id)  b
            ON a.p_id = b.p_id
            WHERE t_id = $1 AND round = $2 AND group_id in ($4,$5,$6)
            group by group_id
            order by sum(rank)
            ) order by group_id`, [t_id, round, row.hole, selected.rows[0].group_id, selected.rows[1].group_id, selected.rows[2].group_id]);
            if(!cttp_flag){
                players = await db.query(`SELECT g.p_id, g.group_id, a.first_name, a.last_name, a.country FROM groupings g
                left join golfers a on a.p_id=g.p_id
                WHERE g.t_id = $1 AND g.round = $2 and g.hole=$3 and group_id in (SELECT group_id FROM cttp
                WHERE t_id = $1 AND round = $2 AND group_id in ($4,$5,$6)
                ) order by group_id`, [t_id, round, row.hole, selected.rows[0].group_id, selected.rows[1].group_id, selected.rows[2].group_id]);
            }
  
            console.log("aaaaa", row.hole,selected.rows);

          let array9 = [];
            for (const selectedRow of selected.rows) {
                for (const player of players.rows) {
                  var data = await db.query(`SELECT * FROM cttp WHERE t_id = $1 and hole = $2 and round = $3 and group_id = $4 and p_id = $5`,
                                    [t_id, row.hole, round, player.group_id, player.p_id]);
                  if (selectedRow.group_id == player.group_id) {
                      player.selected = player.p_id == selectedRow.p_id ? true : false;
                      if (player.selected === true && data.rows[0].won === true) player.status = 1;
                      else if (player.selected === true && data.rows[0].won === false) player.status = 2;
                      else if (player.selected === false && data.rows[0].won === false) player.status = 3;
                      else if (player.selected === false && data.rows[0].won === true) player.status = 4;
                      array9.push(player);
                      array9.sort((a, b) => parseFloat(a.group_id) - parseFloat(b.group_id));

                  }
                }
            }
          row.players = array9;
          choices.push(row);
        }        
    }
    return res.status(200).send(choices);
}

async function cttpFind(t_id, hole, round, group_id, p_id) {
    ans = db.query(`SELECT * FROM cttp WHERE t_id = $1 and hole = $2 and round = $3 and group_id = $4 and p_id = $5`,
        [t_id, hole, round, group_id, p_id]);
    return ans;
}

exports.userpickCTTP = (req, res) => {
    User.findOne({
        where: {
            id: req.body.user_id
        }
    })
        .then(async user => {

            const t_id = parseInt(req.body.t_id);
            const hole = parseInt(req.body.hole);
            const round = parseInt(req.body.round);
            const group_id = parseInt(req.body.group_id);
            const p_id = parseInt(req.body.p_id)
            const response = await cttpFind(t_id, hole, round, group_id, p_id);

            Cttp_pick.create({
                user_id: user.id,
                cttp_id: response.rows[0]["id"]
            })
                .then(cttp_pick => {
                    res.status(200).send({ success: true, message: cttp_pick })
                })
                .catch(err => {
                    res.status(500).send({ success: false, message: err.message });
                })
        })
        .catch(err => {
            res.status(500).send({ success: false, message: err.message });
        })
}

exports.rabbitcardRankings = async (req, res) => {
    const t_id = parseInt(req.params.t_id);
    const response = await db.query(`SELECT * FROM rabbitcard_rankings
                                    WHERE t_id = $1`, [t_id]);
    res.status(200).send(response.rows);
}

// exports.changeData = async (req, res) => {
//     try {
//         let totalLength = 0
//         let totalLengthfinal = 0
//         // console.log("++++++++++++++++++++++++++++++")
//         const t_id = parseInt(req.params.t_id);

//         // console.log(round);
//         for (let round = 1; round < 5; round++) {
//             // console.log(round);
//             for (grup = 1; grup < 16; grup++) {
//                 // console.log(grup);
//                 const resp = await db.query(`SELECT p_id FROM groupings WHERE t_id = ${t_id} and group_id = ${grup} and round = ${round}`);
//                 // console.log(resp);
//                 let group = [];
//                 resp.rows.forEach(element => {
//                     group.push(element.p_id);
//                 });
//                 totalLength = totalLength + group.length
//                 // console.log(totalLength);
//                 // console.log(group.length);
//                 for (hole = 1; hole < 19; hole++) {
//                     totalLengthfinal = totalLengthfinal + 3
//                     // console.log(totalLengthfinal)
//                     // console.log(`round =  ${round} grup = ${grup} hole = ${hole} `)
//                     // console.log("inside ========================================")
//                     // console.log(hole)
//                     // console.log(t_id)
//                     // console.log("grup data " + group)
//                     // console.log(round)
//                     // let updt = await db.query(`update scorecards SET status = 4 where id = 16401`)
//                     // console.log(group.length)
//                     if (group.length == 1) {
//                         let id1 = await db.query(`select id from scorecards where t_id = ${t_id} and round =${round}  and hole_number = ${hole}  and p_id = ${group[0]}`)
//                         let upd1 = await db.query(`update scorecards SET status = 1 where id = ${id1.rows[0].id}`)
//                         // console.log(id1.rows[0].id)
//                     }
//                     if (group.length == 2) {
//                         // // console.log(id1.rows);
//                         let id2 = await db.query(`select id from scorecards where t_id = ${t_id} and round =${round}  and hole_number = ${hole}  and p_id = ${group[1]}`)
//                         // console.log(id2.rows[0].id);
//                         var upd2 = await db.query(`update scorecards SET status = 3 where id = ${id2.rows[0].id}`)
//                     }
//                     if (group.length == 3) {
//                         let id3 = await db.query(`select id from scorecards where t_id = ${t_id} and round =${round}  and hole_number = ${hole}  and p_id = ${group[2]}`)
//                         //     // console.log(id3);
//                         var upd3 = await db.query(`update scorecards SET status = 3 where id = ${id3.rows[0].id}`)
//                     }
//                     totalLengthfinal = totalLengthfinal + 3
//                     // console.log(totalLengthfinal)
//                     // console.log(`round =  ${round} grup = ${grup} hole = ${hole} `)
//                 }
//                 // group.forEach( async (el) => {
//                 //        var id = await db.query( `select * from scorecards where t_id = ${t_id} and round =  and hole_number =  and p_id = $1`)
//                 //     })
//             }
//         }
//     }
//     catch (err) {
//         console.log("ERROR --------------------")
//         console.log(err)
//         return res.send({ message: err.message })
//     }


    //     // for(let row of resp.rows) {
    //     //     group.push(row);
    //     // }

    //     // select * from scorecards where t_id = 2021060 and round = 1 and hole_number = 1 and (p_id = 29420);
    //     // update scorecards SET status = 1 where id = 16401

    // res.send(group);
// }

// exports.makeTournament = async(req, res) => {
//     let t_id = req.body.t_id;
//     let name = req.body.name;
//     let season = req.body.season;
//     let played_year = req.body.played_year;
//     let sequence_number = req.body.sequence_number;
//     let start_date = req.body.start_date;
//     let end_date = req.body.end_date;
//     let purse = req.body.purse;
//     let completed = req.body.completed;
//     let rounds_official_money = req.body.rounds_official_money;

//     let tournament_create = await db.query(`insert into tournaments_completed values(${t_id},${name},${season},${played_year},${sequence_number},${start_date},${end_date},${purse},${completed},${rounds_official_money})`)
//     return console.log(tournament_create);
// }

// exports.insertData = async (req, res) => {
//     // let g_id = 903;
//     let t_id = req.params.t_id;
//     let id = 3548

//     for (round = 1; round < 5; round++) {
//         for (group = 1; group < 16; group++) {
//             let grouping = await db.query(`select * from groupings where t_id = ${t_id} and round = ${round} and group_id = ${group}`);
//             let cttps = await db.query(`select * from cttp where t_id = ${t_id} and round = ${round} and group_id = ${group}`);
//             // console.log(grouping);
//             // console.log(grouping.rows[0].id)
//             // console.log(grouping.rows[1])
//             let groupi = [];
//             grouping.rows.forEach(element => {
//                 groupi.push(element.p_id);
//                 // groupi.push(element.id);
//             });
//             let plaId = [];
//             grouping.rows.forEach(element => {
//                 plaId.push(element.id);
//             });

//             let cttp = [];
//             cttps.rows.forEach(element => {
//                 cttp.push(element.p_id);
//                 // cttp.push(element.g_id);
//             });
//             let cttpgid = [];
//             cttps.rows.forEach(element => {
//                 cttpgid.push(element.g_id);
//             });

//             console.log(groupi);
//             console.log(cttp);
//             console.log(plaId);
//             console.log(cttpgid);

//             plaId.forEach(async (al) => {
//                 let isFound = cttpgid.includes(al);
//                 // console.log(al);

//                 groupi.forEach(async (el) => {
//                     let isFounded = cttp.includes(el);
//                     // console.log(isFounded)
//                     if (isFounded == false && isFound == false) {
//                         //   await  cttp.push(el)
//                         // console.log(el);
//                         // console.log(al);
//                         // console.log(grouping.rows);
//                         // console.log(id);
//                         let insertPlayer1 = await db.query(`insert into cttp (id,t_id,g_id,round,hole,group_id,won,p_id) 
//                         values(${(id = id + 1)},${t_id},${al},${round},17,${group},false,${el}), 
//                         (${(id = id + 1)},${t_id},${al},${round},6,${group},false,${el}), 
//                         (${(id = id + 1)},${t_id},${al},${round},3,${group},false,${el}), 
//                         (${(id = id + 1)},${t_id},${al},${round},13,${group},false,${el})`);
//                         //   await  id++
//                         //   console.log(id);

//                         // //   await  console.log(id);
//                         // //   await  cttp.push(el)
//                         //   let insertPlayer2 = await db.query(`insert into cttp (id,t_id,g_id,round,hole,group_id,won,p_id) values(${id},${t_id},${al},${round},15,${group},false,${el})`);
//                         //   await  id++
//                         //   console.log(id);

//                         // //   await  console.log(id);
//                         // //   await  cttp.push(el)
//                         //   let insertPlayer3 = await db.query(`insert into cttp (id,t_id,g_id,round,hole,group_id,won,p_id) values(${id},${t_id},${al},${round},9,${group},false,${el})`);
//                         //   await  id++
//                         //   console.log(id);

//                         // //   await  console.log(id);
//                         // //   await  cttp.push(el)
//                         //   let insertPlayer4 = await db.query(`insert into cttp (id,t_id,g_id,round,hole,group_id,won,p_id) values(${id},${t_id},${al},${round},11,${group},false,${el})`);
//                         //   await  id++
//                         //   console.log(id);
//                         //   await  id++
//                         //   console.log(id);

//                         //   await  console.log(id);
//                         //   await  g_id++
//                         //   await  console.log(g_id)
//                     }

//                 })
//             })
//             console.log({ round: round }, { group: group });
//             // console.log(groupi);
//             // console.log(cttp);

//             // cttp.forEach((el,i) => {
//             //     if (cttp.indexOf(groupi[i]) == -1)
//             //     {
//             //         // console.log("hi");
//             //     }
//             // })




//         }
//     }
//     // let arr1 = [1,1, 2,2];
//     // let arr2 = [4];

//     // let isFounded = arr1.includes(arr2[0]);
//     // console.log(isFounded);
// }


// exports.changeData = async (req, res) => {
//     // console.log(req.params.t_id);
// //     select * from tournament_holes where t_id = 2021060 and par=3
// // order by hole_numbers



// }

exports.playedRanking = async (req, res) => {
  const t_id = parseInt(req.params.t_id);
  const round = parseInt(req.params.round);

  const response = await db.query(`SELECT distinct a.t_id, a.round, a.hole, c.course_number, c.par, c.yardage
                                    FROM cttp a INNER JOIN tournament_holes c on a.t_id = c.t_id and a.hole = c.hole_number
                                    WHERE a.t_id = $1 AND a.round = $2`, [t_id, round]);
    let choices = [];
    let userMap = new Map();
    var holeArray = [];
    for (let row of response.rows) {
        const selected = await db.query(`select * from user_pick_cttps as u left join  cttp  as c on c.id=u.cttp_id 
                                        where c.t_id=$1 and round=$2 and hole=$3`, [ t_id, round, row.hole]);
        if(selected.rows.length === 0)
        {
            //return res.status(401).send({Message: "Selection for this round not found"});
          
        }else{
          for(let selectedRow of selected.rows){
            if(selectedRow.won){
              var count  = userMap.get(selectedRow.user_id);
              if(isNaN(count))count = 0
              userMap.set(selectedRow.user_id,count+1)
            }
          }
        }       
        holeArray.push(row.hole);

    }

    var hole =  Math.max(...holeArray);

    const cttp_result = await db.query(`select * from cttp_results as c
    where c.t_id=$1 and round=$2 and c.hole = $3`, [ t_id, round,hole]);
    var hole_distance = -1;
    if(cttp_result.rows.length >0)
      hole_distance =  cttp_result.rows[0].distance;
    for (var entry of userMap.entries()) {
      var key = entry[0],
          value = entry[1];
      const selected = await db.query(`select * from user_rabbitcards as c
          where c.t_id=$1 and round=$2 and user_id=$3`, [ t_id, round, key]);
      var distance = selected.rows[0].tie_feet + selected.rows[0].tie_inches /12
      let user =  await User.findOne({
          where: {
              id: key
          }
        })
        .then(async user => {
          return user
        })
        var obj = {
          user: user,
          ranking: value,
          distance: distance

        };
        choices.push(obj);      
    }

    choices.sort((a, b) => a.ranking - b.ranking);
    choices.sort(function(a, b) {
        if (a.ranking === b.ranking && hole.distance != -1) {
          // Price is only important when cities are the same
          return Math.abs(hole_distance -  a.distance) - Math.abs(hole_distance -  b.distance) ;
      }
     return a.ranking < b.ranking ? 1 : -1;
    });
  
    console.log("count ===" , choices.length)

    return res.status(200).send(choices);
}

async function getTieBreakerWinner(rabbit) {
  const t_id = rabbit.t_id;
  const round = rabbit.round;
 const response = await db.query(`SELECT distinct a.t_id, a.round, a.hole, c.course_number, c.par, c.yardage
                                   FROM cttp a INNER JOIN tournament_holes c on a.t_id = c.t_id and a.hole = c.hole_number
                                   WHERE a.t_id = $1 AND a.round = $2`, [t_id, round]);
   let choices = [];
   let userMap = new Map();
   var holeArray = [];
   for (let row of response.rows) {
       const selected = await db.query(`select * from user_pick_cttps as u left join  cttp  as c on c.id=u.cttp_id 
                                       where c.t_id=$1 and round=$2 and hole=$3`, [ t_id, round, row.hole]);
       if(selected.rows.length === 0)
       {
           //return res.status(401).send({Message: "Selection for this round not found"});
         
       }else{
         for(let selectedRow of selected.rows){
           if(selectedRow.won){
             var count  = userMap.get(selectedRow.user_id);
             if(isNaN(count))count = 0
             userMap.set(selectedRow.user_id,count+1)
           }
         }
       }       
       holeArray.push(row.hole);

   }

   var hole =  Math.max(...holeArray);
   if(hole <=0) return -1;
   const cttp_result = await db.query(`select * from cttp_results as c
   where c.t_id=$1 and round=$2 and c.hole = $3`, [ t_id, round,hole]);
   var hole_distance = 1000000 , userID = -1;
   if(cttp_result.rows.length >0)
     hole_distance =  cttp_result.rows[0].distance;       
   for (var entry of userMap.entries()) {
     var key = entry[0],
         value = entry[1];
     const selected = await db.query(`select * from user_rabbitcards as c
         where c.t_id=$1 and round=$2 and user_id=$3`, [ t_id, round, key]);   
         if(selected.rows.length>0){
              if(selected.rows[0].tie_feet === undefined)selected.rows[0].tie_feet =  1000000;
              if(selected.rows[0].tie_inches === undefined)selected.rows[0].tie_inches =  1000000;           
              var distance = selected.rows[0].tie_feet + selected.rows[0].tie_inches /12
      
              var obj = {
                  user: key,
                  ranking: value,
                  distance: distance
      
              };
              choices.push(obj);      
         }
     
   }
   choices.sort((a, b) => a.ranking - b.ranking);
   choices.sort(function(a, b) {
       if (a.ranking === b.ranking && hole.distance != -1) {
         // Price is only important when cities are the same
         return Math.abs(hole_distance -  a.distance) - Math.abs(hole_distance -  b.distance) ;
     }
    return a.ranking < b.ranking ? 1 : -1;
   });
  //  
  if(choices.length>0){
      userID = choices[0].user
  }
   return userID;
}


exports.allUserRanking = async (req, res) => {
  const users = await db.query(`SELECT * FROM users`);

  let choices = [];

  for (var user of users.rows) {
    const rabbitcards = await db.query(`SELECT Distinct id, a.t_id, a.round,
           CASE                                             
            WHEN DATE_PART('day', CURRENT_DATE - b.start_date) - a.round > -1 THEN 'played'
            ELSE null END status
    FROM user_rabbitcards a left join tournaments_completed b on a.t_id=b.t_id WHERE user_id = $1`, [user.id]);
    if(rabbitcards.rows === 0){
      var obj = {
        user: user,
        ranking: 0,
        winnerCount:0,
        playedRound:0
      };
      choices.push(obj);
      continue;
    }
    var count = 0, round = 0 ;
    for(const rabbit of rabbitcards.rows){
      if(rabbit.status != 'played') continue;      
      round++;
      const response = await db.query(`SELECT distinct a.t_id, a.round, a.hole, c.course_number, c.par, c.yardage
      FROM cttp a INNER JOIN tournament_holes c on a.t_id = c.t_id and a.hole = c.hole_number
      WHERE a.t_id = $1 AND a.round = $2`, [rabbit.t_id, rabbit.round]);
      for (let row of response.rows) {
        
        const selected = await db.query(`select * from user_pick_cttps as u left join  cttp  as c on c.id=u.cttp_id 
                                        where u.user_id=$1 and c.t_id=$2 and round=$3 and hole=$4`, [user.id, rabbit.t_id, rabbit.round, row.hole]);
        if(selected.rows.length === 0){          
          continue;
        }

        var winnerID = await getTieBreakerWinner(rabbit);
        if(winnerID === user.id)
          count++;
        for(let selectedRow of selected.rows){
          if(selectedRow.won){
           count++;
          }
        }
      }
    }
    var obj = {
      user: user,
      ranking: count == 0  ? 0: Number( count/round ).toFixed(3),
      winnerCount:count,
      playedRound:round
    };
    choices.push(obj);

  }
  choices.sort((a, b) => a.ranking - b.ranking);
  choices.sort(function(a, b) {
      if (a.ranking === b.ranking) {
        // Price is only important when cities are the same
        return b.playedRound - a.playedRound;
    }
   return a.ranking < b.ranking ? 1 : -1;
  });

  console.log("count ===" , choices.length)
  res.status(200).send(choices);
}
