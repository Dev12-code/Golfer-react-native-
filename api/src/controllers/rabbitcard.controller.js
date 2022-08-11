const db = require("../config/database");
const sq = require("../models");
const User = sq.user;
const UserRabbitCard = sq.user_rabbitcards;

var nodemailer = require('nodemailer');

exports.listAllRabbitCards = async (req, res) => {
    // replace '2021-09-06' to CURRENT_DATE
    // var response = await db.query(`SELECT Distinct id, a.t_id, a.round,a.state,b.start_date,b.end_date,
    //                                     CASE 
    //                                             WHEN DATE_PART('day', CURRENT_DATE - b.start_date) - a.round <= -1 THEN 'selected'
    //                                             WHEN DATE_PART('day', CURRENT_DATE - b.start_date) - a.round = 0 THEN 'in_progress'
    //                                             WHEN DATE_PART('day', CURRENT_DATE - b.start_date) - a.round BETWEEN -2 AND -1 THEN 'ready'                                                
    //                                             WHEN DATE_PART('day', CURRENT_DATE - b.start_date) - a.round > 0 THEN 'played'
    //                                             ELSE null END status
    //                                     FROM user_rabbitcards a left join tournaments_completed b on a.t_id=b.t_id WHERE user_id = $1`, [req.userId]);

    var response = await db.query(`SELECT Distinct id, a.t_id, a.round,a.state,b.start_date,b.end_date,a.winner_state, CURRENT_DATE,
    CASE 
            WHEN DATE_PART('day', CURRENT_DATE - b.start_date) - a.round < -1 THEN 'selected'
            WHEN DATE_PART('day', CURRENT_DATE - b.start_date) - a.round >= -1 THEN 'played'
            ELSE null END status
    FROM user_rabbitcards a left join tournaments_completed b on a.t_id=b.t_id WHERE user_id = $1`, [req.userId]);


    let cards = [];
    const getStartDate = (startDate, round) => {
        let dt = new Date(startDate);
        dt.setUTCDate(dt.getUTCDate() + round - 1);
      
        return dt
      }
     Date.prototype.getWeek = function () {
        var onejan = new Date(this.getFullYear(), 0, 1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    };
    for (var i = 0; i < response.rows.length; i++) {
        var row = response.rows[i];        
        // if(i === 8) row.status = "played"
        if(row.status === "selected"){ 
            var _startDate = getStartDate(row.start_date , row.round)           
            var currentDate = new Date();
            const currentMilionSecond = currentDate.valueOf();
            var first = currentDate.getUTCDate() - currentDate.getUTCDay(); // First day is the day of the month - the day of the week
            var start_week = _startDate.getUTCDate() - _startDate.getUTCDay(); 
            // console.log("ccccccccccc", start_week ,first ,_startDate , row.round,_startDate.getDate())
            if(start_week === first || (start_week === first+7 && _startDate.getDate() === start_week)) {       
                if(row.round === 1 || row.round === 2){
                    var curr = new Date();
                    curr.setUTCHours(13)
                    curr.setMinutes(0)
                    curr.setSeconds(0)
                    curr.setMonth(_startDate.getMonth())

                    var tuesday = new Date(curr.setUTCDate(first + 2))
                    if(tuesday.valueOf() <= currentMilionSecond){
                        row.status = "ready"
                    }
                     

                }else if(row.round === 3){
                    var curr = new Date();
                    curr.setUTCHours(2)
                    curr.setMinutes(0)
                    curr.setSeconds(0)
                    curr.setMonth(_startDate.getMonth())

                    var friday = new Date(curr.setUTCDate(first + 6))
                    if(friday.valueOf() <= currentMilionSecond){
                        row.status = "ready"
                    }
                }else if(row.round === 4){
                    var curr = new Date();
                    var second = curr.getUTCDate() - curr.getUTCDay(); // First day is the day of the month - the day of the week

                    curr.setUTCHours(2)
                    curr.setMinutes(0)
                    curr.setSeconds(0)
                    curr.setMonth(_startDate.getMonth())

                    // var saturday = new Date(curr.setDate(first + 6))

                    saturday = new Date(curr.setUTCDate(first + 7))

                    if(saturday.valueOf() <= currentMilionSecond){
                        row.status = "ready"
                    }
                }

            }
        
            _startDate.setUTCHours(13)
            // if((currentMilionSecond -  _startDate.valueOf())/1000 >= 25200 &&  (currentMilionSecond -  _startDate.valueOf())/1000 <=75600 ){                
            //     row.status = "in_progress"
            // }
            if((currentMilionSecond -  _startDate.valueOf())/1000 >= 0 &&  (currentMilionSecond -  _startDate.valueOf())/1000 <=46800 ){                
                row.status = "in_progress"
            }else if ((currentMilionSecond -  _startDate.valueOf())/1000 >46800){
                row.status = "played"
            }
            // console.log("ccccccccc", currentMilionSecond , _startDate.valueOf(), row.round,_startDate, row.status)
            row.curr = currentMilionSecond;
            row.startmilion =  _startDate.valueOf()

        }
        else if(row.status === "played"){      
            var _startDate = getStartDate(row.start_date , row.round)
            
            var currentDate = new Date();
            const currentMilionSecond = currentDate.valueOf();
            var first = _startDate.getUTCDate() - _startDate.getUTCDay(); // First day is the day of the month - the day of the week

           if(_startDate.valueOf() >= currentMilionSecond ) {    
                
                if(row.round === 1){
                    var curr = new Date();
                    curr.setUTCHours(1)
                    curr.setMinutes(0)
                    curr.setSeconds(0)
                    curr.setMonth(_startDate.getMonth())

                    var thursday = new Date(curr.setUTCDate(first + 5))
                    // console.log(thursday , currentMilionSecond , thursday.valueOf())
                    if(thursday.valueOf() > currentMilionSecond){
                        row.status = "ready"
                    }

                }else if(row.round === 2){
                    var curr = new Date();
                    curr.setUTCHours(1)
                    curr.setMinutes(0)
                    curr.setSeconds(0)
                    var friday = new Date(curr.setUTCDate(first + 6))
                    console.log(friday , currentMilionSecond , friday.valueOf())
                    if(friday.valueOf() > currentMilionSecond){
                        row.status = "ready"
                    }

                }else if(row.round === 3){
                    var curr = new Date();
                    curr.setUTCHours(1)
                    curr.setMinutes(0)
                    curr.setSeconds(0)
                    curr.setMonth(_startDate.getMonth())
                    var saturday = new Date(curr.setUTCDate(first + 7))
                    // console.log(saturday , currentMilionSecond , saturday.valueOf())
                    if(saturday.valueOf() > currentMilionSecond){
                        row.status = "ready"
                    }
                }else if(row.round === 4){
                    var curr = new Date();
                    curr.setUTCHours(1)
                    curr.setMinutes(0)
                    curr.setSeconds(0)
                    curr.setMonth(_startDate.getMonth())
                    var sunday = new Date(curr.setUTCDate(first+1))
                    // console.log(sunday , currentMilionSecond , sunday.valueOf(),row.round)
                    if(sunday.valueOf() > currentMilionSecond){
                        row.status = "ready"
                    }
                }
            }

            _startDate.setUTCHours(13)
            if((currentMilionSecond -  _startDate.valueOf())/1000 < 0 ){
                   row.status = "ready"
            }
            if((currentMilionSecond -  _startDate.valueOf())/1000 >= 0 &&  (currentMilionSecond -  _startDate.valueOf())/1000 <=46800 ){                
                row.status = "in_progress"
            }else if ((currentMilionSecond -  _startDate.valueOf())/1000 >46800){
                row.status = "played"
            }
          
            // console.log("bbbb", currentMilionSecond , _startDate.valueOf(), row.round,_startDate, row.status)
            row.curr = currentMilionSecond;
            row.startmilion =  _startDate.valueOf()
          
        }
        if(row.status === "ready"){      
            const cttp_results = await db.query(`select * from user_pick_cttps as u left join  cttp  as c on c.id=u.cttp_id 
            where u.user_id=$1 and c.t_id=$2 and round=$3`, [req.userId,row.t_id, row.round]);            
            if(cttp_results.rows.length>=12){
                row.status = "in_progress"
            }
        }
        // row.winner_id = -1;
        // if(row.status === "played")        
        // {   
        //           row.winner_id  = await getWinner(row);

            
        // }
        const tournaments = await db.query(`SELECT * FROM tournaments_completed WHERE t_id = $1`, [row.t_id]);
        const courses = await db.query(`SELECT C.* FROM tournament_hosts as T left join courses as C on c.course_number = T.course_number WHERE T.t_id = $1`, [row.t_id]);
        const groups = await db.query(`SELECT group_id, sum(rank) FROM cttp a
                                        INNER JOIN (SELECT a.p_id, b.rank FROM golfers a 
                                        INNER JOIN worldgolfrankings b 
                                        ON a.p_id = b.p_id)  b
                                        ON a.p_id = b.p_id
                                        WHERE t_id = $1 AND round = $2
                                        group by group_id
                                        order by sum(rank)
                                        limit 1`, [row.t_id, row.round]);

        if (tournaments.rows.length > 0) {
            let tournament = tournaments.rows[0];
            tournament.courses = courses.rows;
            if (groups.rows.length > 0)
                row.group_id = groups.rows[0].group_id;
            row.tournament = tournament;
        }

        cards.push(row);
    }
    res.status(200).send(cards);
}

async function getWinner(rabbit) {
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
    //  console.log("aaaa",hole);
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
    //  console.log(userID, choices[0])
     return userID;
 }


exports.listAllRabbitCardsMOD = async (req, res) => {
    const response = await db.query(`SELECT *,
                                        CASE
                                        WHEN b.t_id IN (SELECT t_id FROM user_rabbitcards WHERE user_id = $1) AND DATE_PART('day', b.start_date - CURRENT_DATE) > 2 THEN 'SELECTED'
                                        WHEN b.t_id IN (SELECT t_id FROM user_rabbitcards WHERE user_id = $1) AND DATE_PART('day', b.start_date - CURRENT_DATE) BETWEEN 0 AND 2 THEN 'READY TO PLAY'
                                        WHEN b.t_id IN (SELECT t_id FROM user_rabbitcards WHERE user_id = $1) AND DATE_PART('day', CURRENT_DATE - b.start_date) BETWEEN 0 AND 3 THEN 'IN PROGRESS'
                                        WHEN b.t_id IN (SELECT t_id FROM user_rabbitcards WHERE user_id = $1) AND DATE_PART('day', CURRENT_DATE - b.start_date) > 3 THEN 'COMPLETED'
                                        ELSE null 
                                    END
                                    FROM tournaments_completed b inner join user_rabbitcards on b.t_id = user_rabbitcards.t_id`, [req.userId]);

    res.status(200).send(response.rows);
}

exports.getRabbitCardById = async (req, res) => {
    const ID = parseInt(req.params.id);
    const response = await db.query(`SELECT * FROM user_rabbitcards WHERE id = $1`, [ID]);

    let card = {}

    if (response.rows.length > 0) {
        card = response.rows[0];
        const tournaments = await db.query(`SELECT * FROM tournaments_completed WHERE t_id = $1`, [card.t_id]);
        const courses = await db.query(`SELECT C.* FROM tournament_hosts as T left join courses as C on c.course_number = T.course_number WHERE T.t_id = $1`, [card.t_id]);

        if (tournaments.rows.length > 0) {
            let tournament = tournaments.rows[0];
            tournament.courses = courses.rows;
            card.tournament = tournament;
        }
    }
    res.status(200).send(card);
}

exports.createRabbitCard = async(req, res) => {
    const t_id = parseInt(req.body.t_id);
    const round = parseInt(req.body.round);
    const state = parseInt(req.body.state);

    if (t_id && round) {
        const existing = await db.query(`SELECT * FROM user_rabbitcards WHERE user_id = $1 AND t_id = $2 AND round = $3 `, [req.userId,t_id,round]);        
    

        if(existing.rows.length === 0){
            UserRabbitCard.create({
                user_id: req.userId,
                t_id: t_id,
                round: round,
                state:state
            })
                .then(userRabbitCard => {
                    res.status(200).send({ success: true, data: userRabbitCard })
                })
                .catch(err => {
                    res.status(500).send({ success: false, message: err.message });
                })
        }else{
            UserRabbitCard.update({state:state}, {
                where: {t_id: t_id, round: round, user_id:req.userId}
            }) .then(userRabbitCard => {
                res.status(200).send({ success: true, data: userRabbitCard })
            })
            .catch(err => {
                res.status(500).send({ success: false, message: err.message });
            })
        }
       
    } else {
        res.status(500).send({ success: false, message: "Invalid parameter!" });
    }
}

exports.deleteRabbitCard = async (req, res) => {
    const ID = parseInt(req.params.id);
    // res.status(200).send({ success: true })
    
    const userRabbitcards = await db.query(`SELECT * FROM user_rabbitcards WHERE id = $1`, [ID]);
    const usersPicks = await db.query(`SELECT * FROM user_pick_cttps WHERE user_id = $1`, [req.userId]);
    const players = await db.query(`SELECT * FROM cttp WHERE t_id =$1 AND round = $2`, [userRabbitcards.rows[0].t_id,userRabbitcards.rows[0].round]);
    // console.log(players);
    players.rows.forEach(async element => {
        const deleteUsersPicks = await db.query(`DELETE FROM user_pick_cttps WHERE cttp_id = ${element.id} AND user_id = ${req.userId} AND`);
    });
    const response = await db.query(`DELETE FROM user_rabbitcards WHERE id = $1`, [ID]);
    res.status(200).send({status:true});
}


exports.tournamentRabbitCardsInfo = async (req, res) => {
    const t_id = parseInt(req.params.t_id);
    const round = parseInt(req.params.round);
    const response = await db.query(`SELECT distinct * 
                                    FROM tournaments_completed b
                                    inner join cttp c on b.t_id = c.t_id
                                    WHERE b.t_id = $1 AND c.round = $2
                                    AND DATE_PART('day', b.start_date - CURRENT_DATE) < 2
                                    AND c.group_id in 
                                    (SELECT group_id FROM cttp a
                                                                        INNER JOIN (SELECT a.p_id, b.rank FROM golfers a 
                                                                        INNER JOIN worldgolfrankings b 
                                                                        ON a.p_id = b.p_id)  b
                                                                        ON a.p_id = b.p_id
                                                                        WHERE t_id = $1 AND round = $2
                                                                        group by group_id
                                                                        order by sum(rank)
                                                                        limit 3)`, [t_id, round]);
    res.status(200).send(response.rows);
}

exports.addTieBreaker = async (req, res) => {
    const ID = parseInt(req.params.id);
    const feet = parseInt(req.params.feet);
    const inche = parseInt(req.params.inche);
    UserRabbitCard.update({tie_feet: feet, tie_inches: inche}, {
        where: {id: ID}
    });
    res.status(200).send({status:true});
}

exports.readWinner = async (req, res) => {
    const t_id = parseInt(req.params.t_id);
    const round = parseInt(req.params.round);

    UserRabbitCard.update({winner_state:true}, {
        where: {t_id: t_id, round: round, user_id:req.userId}
    }) .then(userRabbitCard => {
        console.log("aaa", t_id,round,req.userId)
        res.status(200).send({ success: true, data: userRabbitCard })
    })
    .catch(err => {
        res.status(500).send({ success: false, message: err.message });
    })

    // res.status(200).send({status:true});
}

exports.rabbitPurse = async (req, res) => {
    const t_id = req.body.t_id;
    const round = req.body.round;
    const name = req.body.name;
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;
    const email = req.body.email;
    await db.query('INSERT INTO user_shipping (t_id, round, name, address,city,state,zip,email) VALUES ($1, $2, $3, $4,$5,$6,$7,$8)', [t_id,round,name,address,city,state,zip,email]);

    var transporter = nodemailer.createTransport({
        service: 'gmail',  // service: 'gmail',
        port: 465,
        secure: true,
        auth: {
          user: process.env.GMAIL,                  
          pass: process.env.PASSWORD              
        }
      });
    
      transporter.verify((err, success) => {
        if (err) console.error(err);
        console.log('Your config is correct');
      });

      var mailOptions = {
        from: 'Do Not Reply <rabbitcards@freeformagency.com>',
        to: "shea@freeformagency.com",
        // to: "honestdeveloper10@gmail.com",

        subject: 'Verification Code',
        html: '<p>My Rabbit Purse </p><p>Shipping Details </p><p>Full Name: ' + name + '</p>' + 
        '<p>Street Address: ' + address + '</p><p>City: ' + city + '</p><p>State: '  + state + '</p><p>ZIP Code: ' +
        zip + '</p><p>Email for Confirmation: ' + email +  '</p>'

        
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log("Email error", error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    
    res.status(200).send({status:true});
}


