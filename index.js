const express=require('express');
const app=express();
require('./startup/db');
require('./startup/routes')(app);


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());


app.use(require("./helper/response"));
app.use(require("./helper/error").handleJoiErrors);
app.use(require("./helper/error").handleErrors);
const port=process.env.PORT||3000;
app.listen(port,()=>console.log(`listening on port ${port}`));




