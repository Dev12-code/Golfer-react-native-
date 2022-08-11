const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const sequelizeDB = require("./models");
const loggerMorgan = require("morgan");
global.logger = require("../../logger");
var cron = require('node-cron');

const app = express();

app.use(loggerMorgan(':date - :remote-addr - :remote-user - :url - :user-agent - :response-time - :status'))

const index = require('./routes/index');
const tournamentRoute = require('./routes/tournament.routes');
const golferRoute = require('./routes/golfer.routes');
const rabbitcardRoute = require('./routes/rabbitcard.routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.use(index);
app.use('/api/', tournamentRoute);
app.use('/api/', golferRoute);
app.use('/api/', rabbitcardRoute);

app.use('/test/api/', tournamentRoute);
app.use('/test/api/', golferRoute);
app.use('/test/api/', rabbitcardRoute);

const allUserDetails = require('./routes/userdetails.routes');
app.use('/test/api/', allUserDetails);

require('./routes/auth.routes')(app);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
const notificationcronjobs =  require('./controllers/notification.controler');

// const basefillers =  require('./datagrab/basefillers');
// const dailyfillers =  require('./datagrab/dailyfillers');
// const realtime =  require('./datagrab/realtime');
// const weekend =  require('./datagrab/weekend');

const test =  require('./notification/index');
app.use('/test/noti/', test);

const basefillers =  require('./datagrab/basefillers');
const dailyfillers =  require('./datagrab/dailyfillers');
const realtime =  require('./datagrab/realtime');
const weekend =  require('./datagrab/weekend');
sequelizeDB.sequelize.sync();
//for first day of every month
// cron.schedule('* * 1 * *',async () => {

//     await notificationcronjobs.everymonth();

// });
// cron.schedule('* * * * * *',async () => {

//     // await notificationcronjobs.startTournamentNotification();
//     await notificationcronjobs.countDownEndNotification();


// });
// cron.schedule('* 10 * * * *',async () => {

//     await notificationcronjobs.completeround();

// });
// var count = true
// cron.schedule('* * * * * *',async () => {
//     if(count){
//         count = false;
//         await weekend.updater()
//         //await basefillers.worldgolfRankings();

//     }
// });

// // cron.schedule('0 */3 * * *',async () => {
// //     await weekend.updater()
// //     await basefillers.worldgolfRankings();

// // });
// cron.schedule('0 2 * * *',async () => {

//     await basefillers.tournamentSchedule();

// });

// var count = true
// cron.schedule('* * * * * *',async () => {
//     if(count){
//         count = false;
//           await basefillers.holeInfo();
//         // await dailyfillers.golferStats();

//     }
// });
// cron.schedule('0 3 * * *',async () => {

//     await dailyfillers.golferStats();
//     await dailyfillers.makeGolfers();
//     await dailyfillers.printer();

// });
// // cron.schedule('0 */2 * * *',async () => {
// //     await realtime.updater();
// // });


// var count = true
// cron.schedule('* * * * * *',async () => {
//     if(count){
//         count = false
//         await realtime.updater();

//     }
// });

module.exports = app;










// const express = require('express');
// const cors = require('cors');
// const bodyParser = require("body-parser");
// const sequelizeDB = require("./models");
// const loggerMorgan = require("morgan");
// global.logger = require("../../logger");
// var cron = require('node-cron');

// const app = express();

// app.use(loggerMorgan(':date - :remote-addr - :remote-user - :url - :user-agent - :response-time - :status'))

// const index = require('./routes/index');
// const tournamentRoute = require('./routes/tournament.routes');
// const golferRoute = require('./routes/golfer.routes');
// const rabbitcardRoute = require('./routes/rabbitcard.routes');

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.json({ type: 'application/vnd.api+json' }));
// app.use(cors());

// app.use(index);
// app.use('/api/', tournamentRoute);
// app.use('/api/', golferRoute);
// app.use('/api/', rabbitcardRoute);

// app.use('/test/api/', tournamentRoute);
// app.use('/test/api/', golferRoute);
// app.use('/test/api/', rabbitcardRoute);

// const allUserDetails = require('./routes/userdetails.routes');
// app.use('/test/api/', allUserDetails);

// require('./routes/auth.routes')(app);
// require('./routes/auth.routes')(app);
// require('./routes/user.routes')(app);
// const notificationcronjobs =  require('./controllers/notification.controler');

// // const basefillers =  require('./datagrab/basefillers');
// // const dailyfillers =  require('./datagrab/dailyfillers');
// // const realtime =  require('./datagrab/realtime');
// // const weekend =  require('./datagrab/weekend');

// const test =  require('./notification/index');
// app.use('/test/noti/', test);

// const basefillers =  require('./datagrab/basefillers');
// const dailyfillers =  require('./datagrab/dailyfillers');
// const realtime =  require('./datagrab/realtime');
// const weekend =  require('./datagrab/weekend');
// sequelizeDB.sequelize.sync();
// //for first day of every month
// //cron.schedule('* * 1 * *',async () => {

//    // await notificationcronjobs.everymonth();

// //});
// cron.schedule('* * * * * *',async () => {

//  await notificationcronjobs.startTournamentNotification();
//   await notificationcronjobs.countDownEndNotification();


// });
// cron.schedule('* 10 * * * *',async () => {

//     await notificationcronjobs.completeround();

// });
var count = true
cron.schedule('* * * * * *',async () => {
    if(count){
        count = false;
        // await weekend.updater()
        await basefillers.worldgolfRankings();

    }
});

// cron.schedule('0 */1 * * *',async () => {
//     await weekend.updater()
//     await basefillers.worldgolfRankings();

// });
// cron.schedule('0 2 * * *',async () => {

//     await basefillers.tournamentSchedule();
//     await basefillers.holeInfo();

// });
// cron.schedule('0 3 * * *',async () => {

//     await dailyfillers.golferStats();
//     await dailyfillers.makeGolfers();
//     await dailyfillers.printer();

// });
// cron.schedule('0 */2 * * *',async () => {
//     await realtime.updater();
// });


// // var count = true
// // cron.schedule('* * * * * *',async () => {
// //     if(count){
// //         count = false
// //         await realtime.updater();

// //     }
// // });

// module.exports = app;
