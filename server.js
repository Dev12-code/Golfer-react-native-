  const app = require('./api/src/app');
  const port = process.env.PORT;
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;


  app.set('views', __dirname + '/api/views')
  app.set("view engine", "jade")

  app.get('/', function (req, res) {
    res.render('index',
    {title: "RabbitCard"})
  })


  app.listen(port, () => {

    console.log("Running on ", port, ", babay")



  });
