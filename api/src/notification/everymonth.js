const db = require("../config/database");
var sendNotification = require('./notification.config')


module.exports.everymonth = async (req, res) => {

    let currentDate = new Date();
    let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    let year = currentDate.getFullYear();

    console.log(month);
    let futureTournaments = await db.query(`SELECT name FROM tournaments_completed where extract(month from start_date) = $1 and  extract(year from start_date) = $2 ORDER BY start_date ASC `, [month,year]);
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