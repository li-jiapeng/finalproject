let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'), //created model loading here
    bodyParser = require('body-parser');

// mongoose instance connection url connection
// mongoose.connect('mongodb://localhost:27017/tododb', {useNewUrlParser: true});
mongoose.connect('mongodb+srv://test:Jp740126469@cluster0-karyt.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
mongoose.Promise = global.Promise;

//Adding body parser for handling request and response objects.
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Enabling CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

const initApp = require('./app/app');
initApp(app);

app.listen(port);
console.log('User RESTful API server started on: ' + port);