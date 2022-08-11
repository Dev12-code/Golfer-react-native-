const db = require("../config/database");
const sq = require("../models");
const FCM = require("fcm-node");
const config = require("../config/auth.config")
const { tournamentCTTP } = require("../controllers/tournament.controller");

exports.sendFirstDayOfMonthNotification = (token , data ,title ,type ,card ) => {

    // console.log(card);
    var fcms = new FCM(config.FCM_SERVER_KEY);
    var message = {        

        to:token,
        notification: {
            title: title,
            body: data
        },
        data:{
            type :type,
            card :card
        }
    };
    
    fcms.send(message, function(err, response){
        if (err) {
            console.log("error : " + err);
        } else {
            console.log("Successfully sent with response: ", response);
          
        }
    });
}