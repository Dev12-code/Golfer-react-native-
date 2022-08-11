const db = require("../config/database");
const sq = require("../models");
const FCM = require("fcm-node");

exports.sendNotification = async (req, res) => {

    // let user_device_tokens = await db.query(`SELECT device_token FROM users WHERE device_token IS NOT null`);

    // var serverKey = require("./rabbitcard-4ecbd-firebase-adminsdk-sopue-d27fd1dee6.json");
    var fcms = new FCM('AAAAYH7q8bY:APA91bEoHZZs6Fm1f0e7Bf9_tdW1UAebYX18VIJ4-K24nd1JpWImsJrLPRBk8asAN5AjRJLUM7tuWTkD0yvx2i0yB6Ts3FCPX8Ez7QnOG3unI9gD7dpLoHOjjTBfmmr1_e5kfTEJLzZ9');

    var message = {          //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to : '7e0b77a684ddf5fa8755caf907f5bb15212fdddc9ec86070f577410e9add6df0',

        notification: {
            title: 'Hello',
            body: 'Testing of notification in API'
        },
        data: {  
            type: 'A',
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