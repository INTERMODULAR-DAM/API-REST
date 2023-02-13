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
let imgRouter = require('./imageComponent/imageRouter')

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI)


var app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    limit: '500mb',
    extended: true,
    parameterLimit:50000}));

app.use('public', express.static(path.join(__dirname + '/../public/images')));

app.use('/api/v1/users', v1UserRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/imgs', imgRouter);

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(8081, ()=>{console.log('Https server running on port 81')})

app.listen(8080, function(){
	console.log('Http server running on port 80');
});

