// set up ========================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb

// configuration =================

mongoose.connect('mongodb://nicolayh:zsefvf3eywhd4@novus.modulusmongo.net:27017/rad9Awed'); 	// connect to mongoDB database on modulus.io

app.configure(function() {
	app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
	app.use(express.logger('dev')); 						// log every request to the console
	app.use(express.bodyParser()); 							// pull information from html in POST
  app.engine('html', require('ejs').renderFile);
});

app.get('/', function(req, res) {

    app.render('index', function(err, html){
    });

});

// define model =================
	var Users = mongoose.model('Users', {
		text : String
	});

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");

// routes ======================================================================

// api ---------------------------------------------------------------------
// get all users
app.get('/api/users', function(req, res) {

	// use mongoose to get all users in the database
	Users.find(function(err, users) {

		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err)
			res.send(err)

		res.json(users); // return all users in JSON format
	});
});

// create user and send back all users after creation
app.post('/api/users', function(req, res) {

	// create a user, information comes from AJAX request from Angular
	Users.create({
		text : req.body.text,
		done : false
	}, function(err, user) {
		if (err)
			res.send(err);

		// get and return all the users after you create another
		Users.find(function(err, users) {
			if (err)
				res.send(err)
			res.json(users);
		});
	});

});

// delete a user
app.delete('/api/users/:user_id', function(req, res) {
	Users.remove({
		_id : req.params.user_id
	}, function(err, user) {
		if (err)
			res.send(err);

		// get and return all the users after you create another
		Users.find(function(err, users) {
			if (err)
				res.send(err)
			res.json(users);
		});
	});
});
