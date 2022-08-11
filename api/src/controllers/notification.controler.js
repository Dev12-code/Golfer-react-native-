const db = require("../config/database");
var sendNotification = require('../notification/notification.config')
const weekend =  require('../datagrab/weekend');
const sq = require("../models");
const User = sq.user;


module.exports.everymonth = async (req, res) => {

    let currentDate = new Date();
    let futureTournaments = await db.query(`SELECT name FROM tournaments_completed where start_date > $1`, [currentDate]);
    let user_device_tokens = await db.query(`SELECT device_token FROM users WHERE device_token IS NOT null`);

    var names = "";
    futureTournaments.rows.map(function (item) {

        names = names + ',' + item['name']

    });
    names = names.substring(1);

    if (futureTournaments && futureTournaments.rows && futureTournaments.rows.length > 0) {
        user_device_tokens.rows.forEach(async el => {
            let title = 'Following Tournaments are Started Soon Please make Selection'
            
            await sendNotification.sendFirstDayOfMonthNotification(el.device_token, names, title, 'A')
        });
    }
}

module.exports.startTournamentNotification = async (req, res) => {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let d = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    // console.log(d);
    let currentTournaments = await db.query(`SELECT t_id, name, start_date FROM tournaments_completed where start_date = $1`, [d]);
    let user_device_tokens = await db.query(`SELECT device_token FROM users WHERE device_token IS NOT null`);


    if (currentTournaments && currentTournaments.rows && currentTournaments.rows.length > 0) {
        currentTournaments.rows.forEach(async el1 => {
            if (user_device_tokens && user_device_tokens.rows && user_device_tokens.rows.length > 0) {

                user_device_tokens.rows.forEach(async el2 => {
                    let title = 'Tournament Started Now'
                    await sendNotification.sendFirstDayOfMonthNotification(el2.device_token, el1.name, title, 'B')
                });
            }
        });
    }
}

module.exports.countDownEndNotification = async (req, res) => {  
    let tournamentMap = new Map();


    const response = await db.query(`SELECT Distinct id, a.t_id, a.round,a.state,a.user_id, b.start_date,b.name
    FROM user_rabbitcards a left join tournaments_completed b on a.t_id=b.t_id WHERE
    DATE_PART('day', CURRENT_DATE - b.start_date) - a.round <= 4 AND a.state = 1`);
    const getStartDate = (startDate, round) => {
        let dt = new Date(startDate);
        dt.setUTCDate(dt.getUTCDate() + round - 1);
        return dt
      }
      response.rows.forEach(async card => {
       
        var _startDate = getStartDate(card.start_date , card.round)   
        const start = new Date(_startDate.getTime());
        const total = Date.parse(start) - Date.parse(new Date());
        const start_weekday = _startDate.getDay()
        var tmpST = start;
        var newST;

        var first = _startDate.getUTCDate() - _startDate.getUTCDay(); // First day is the day of the month - the day of the week
        if( card.round === 1 ||  card.round === 2){
            var curr = new Date();
            curr.setUTCHours(13)
            curr.setMinutes(0)
            curr.setSeconds(0)
            curr.setMonth(_startDate.getMonth())
            newST = new Date(curr.setUTCDate(first + 2))
        
        }else if( card.round === 3){
            var curr = new Date();
            curr.setUTCHours(2)
            curr.setMinutes(0)
            curr.setSeconds(0)
            curr.setMonth(_startDate.getMonth())
            newST = new Date(curr.setUTCDate(first + 6))

        }else if(card.round === 4){
            var curr = new Date();
            var second = curr.getUTCDate() - curr.getUTCDay(); // First day is the day of the month - the day of the week
        
            curr.setUTCHours(2)
            curr.setMinutes(0)
            curr.setSeconds(0)     
            curr.setMonth(_startDate.getMonth())   
            if(first === second+7){
                newST = new Date(curr.setUTCDate(second+7))
            }else{
                newST = new Date(curr.setUTCDate(first))            
            }
          }
      
        const newDST = new Date(newST);
      
        var dateFuture = new Date(newDST.getTime());
        var dateNow = new Date();
      
        var seconds = Math.floor((dateFuture - (dateNow)) / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);
      
        hours = hours - (days * 24);
        minutes = minutes - (days * 24 * 60) - (hours * 60);
        seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);
      
        seconds = seconds; 
        minutes = minutes;
        hours = hours+(days*24);
        days = days;

        if(hours === 0 && minutes === 0 && seconds === 0){
                var message = "Tournament Count Down was finished";          
                let user = await db.query(`SELECT * FROM users WHERE device_token IS NOT null AND id =$1`, [card.user_id]);
                if(user.rows.length >0) {
                    let token  = user.rows[0].device_token
                    let name = user.rows[0].first_name + " " + user.rows[0].last_name
                    await sendNotification.sendFirstDayOfMonthNotification(token, card.name, message, 'B')
                }
                
        }
        _startDate.setUTCHours(13)
        var currentDate = new Date();
        const currentMilionSecond = currentDate.valueOf();        
        if (parseInt((currentMilionSecond -  _startDate.valueOf())/1000) === 46800){

            var message = "All results are in! Check out the winners!";          
            let user = await db.query(`SELECT * FROM users WHERE device_token IS NOT null AND id =$1`, [card.user_id]);
            if(user.rows.length >0) {
                let token  = user.rows[0].device_token
                let name = user.rows[0].first_name + " " + user.rows[0].last_name
                await sendNotification.sendFirstDayOfMonthNotification(token, card.name, message, 'B')
            }
            var mapKey = String(card.t_id )+  String(card.round);
            if(!tournamentMap.has(mapKey)) {
                tournamentMap.set(mapKey,true)            
                sendWinnerNotification(card)
            }
          
        }
        // console.log(hours + " hour" + minutes + "min" + seconds + "     " + card.user_id + "   " + card.t_id + "   " + card.round + "  "  + parseInt((currentMilionSecond -  _startDate.valueOf())/1000) + "    " + card.name )

      })

}

async function sendWinnerNotification(rabbit) {
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
     var message = "Congratulations! You are the winner for round " + String(round) + " in " + rabbit.name;          
     let user = await db.query(`SELECT * FROM users WHERE device_token IS NOT null AND id =$1`, [userID]);
     if(user.rows.length >0) {
         let token  = user.rows[0].device_token
         let name = user.rows[0].first_name + " " + user.rows[0].last_name
         await sendNotification.sendFirstDayOfMonthNotification(token, rabbit.name, message, 'B')
     }
 }

module.exports.completeround = async (req, res) => {

    const response = await db.query(`SELECT Distinct  a.t_id, a.round,
    CASE                                              
            WHEN DATE_PART('day', CURRENT_DATE - b.start_date) - a.round > -1 THEN 'played'
            ELSE null END status
    FROM user_rabbitcards a left join tournaments_completed b on a.t_id=b.t_id `);

    
    let data = response.rows.forEach(async element => {

        if (element.status != null) {
            const filterdata = await db.query(`select user_id,t_id,round from user_rabbitcards where t_id = $1 and round = $2 and notification = false `, [element.t_id, element.round])

            const name = await db.query(`select name from tournaments_completed where t_id = $1`, [element.t_id]);
            
            var names = "";
            name.rows.map(function (item) {

                names = names + ',' + item['name']

            });
            names = names.substring(1);

            filterdata.rows.forEach(async filter => {
                const userfilter = await db.query(`select id,device_token from users where id = $1`, [filter.user_id]);
                
                let card = {'t_id': filter.t_id, 'round': filter.round};

                userfilter.rows.forEach(async token => {
  
                    let title = 'Round Completed';
                    await sendNotification.sendFirstDayOfMonthNotification(token.device_token,names, title,  'C' ,card)
                   const chnageflag = await db.query(`update user_rabbitcards set notification = true where t_id = $1 and round = $2`, [element.t_id, element.round]);
                });
            });
        }
    });

   







    // let data = response.rows.forEach(async element => {

    //     if (element.status != null) {
    //         const filterdata = await db.query(`select user_id from user_rabbitcards where t_id = $1 and round = $2 and notification = false `, [element.t_id, element.round])

    //         const name = await db.query(`select name from tournaments_completed where t_id = $1`, [element.t_id]);
    //         var names = "";
    //         name.rows.map(function (item) {

    //             names = names + ',' + item['name']

    //         });
    //         names = names.substring(1);

    //         filterdata.rows.forEach(async filter => {
    //             const userfilter = await db.query(`select id,device_token from users where id = $1`, [filter.user_id]);
    //             userfilter.rows.forEach(async token => {

    //                 let title = 'Round Completed'
    //                 await sendNotification.sendFirstDayOfMonthNotification(token.device_token, names, title, 'C')
    //                 const chnageflag = await db.query(`update user_rabbitcards set notification = true where t_id = $1 and round = $2`, [element.t_id, element.round]);
    //             });
    //         });
    //     }
    // });
}