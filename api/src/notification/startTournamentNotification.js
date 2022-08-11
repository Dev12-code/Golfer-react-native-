const db = require("../config/database");
var sendNotification = require('./notification.config')

module.exports.startTournamentNotification = async (req, res) => {

    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let d = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    
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