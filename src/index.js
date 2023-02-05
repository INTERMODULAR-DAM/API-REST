const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const fs = require ('fs');
const bodyParser = require('body-parser');
const https = require('https');
const dotenv = require('dotenv');
dotenv.config();

let credentials = {
    key : fs.readFileSync(__dirname + "/ssl/localhost-2023-01-22-113121.pkey", 'utf-8'),
    cert : fs.readFileSync(__dirname + "/ssl/localhost-2023-01-22-113121.cer")
}

let v1UserRouter = require('./users/userRoutes');
let postRouter = require('./posts/postRoutes');
let commentRouter = require('./comments/commentRoutes');

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI)


var app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    limit: '500mb',
    extended: true,
    parameterLimit:50000}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/users', v1UserRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/comments', commentRouter);

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(8081, ()=>{console.log('Servidor http corriendo en el puerto 81')})

app.listen(8080, function(){
	console.log('Servidor http corriendo en el puerto 80');
});

