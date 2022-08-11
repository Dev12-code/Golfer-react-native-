const db = require("../config/database");
var sendNotification = require('./notification.config')

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
}