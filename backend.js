var http = require('http');
var mongoose = require('mongoose');

var uristring =
	'mongodb://localhost/test';
	
var theport = 8000;

mongoose.connect(uristring, function(err, res){
	if (err) {
		console.log('ERROR connecting to: ' + uristring + '. ' + err);
	}
	else{
		console.log('Succeeded connected to: ' + uristring);
	}
});

var messageSchema = new mongoose.Schema({
	venue: {name: String, id: String},
	username: String,
	message: String,
	date: {type: Date, default: Date.now}	
});

var Message = mongoose.model('Message', messageSchema);

Message.remove({}, function(err){
	if(err){
		console.log('error deleting old data.');
	}
});

var johndoe = new Message({
	venue: {name: 'The RAC', id: 'hi'},
	username: 'anon',
	message: 'This is a message'
});

johndoe.save(function (err) {if (err) console.log('Error on save!')});

var found = ['DB Connection not yet established. Try again later. Check the console output for error messages if this persists'];

http.createServer(function (req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	createWebpage(req, res);
}).listen(theport);

function createWebpage (req, res){
	Message.find({}).exec(function(err, result){
	if (!err){
		res.write(html1 + JSON.stringify(result, undefined, 2) + html2 + result.length + html3);

		var query = Message.find({'venue.id': 'hi'});
//		query.where('venue.id').equals('hi');
		query.select('message');
		query.exec(function(err, result){
			if (!err){
				res.end(html4 + result + html5 + result.length + html6);
			}
			else{
				res.end('Error in second query. ' + err)
			}
		});
	} 
	else{
		res.end('Error in first query. ' + err)
	};
});
}

console.log('http server will be listening on port %d', theport);
console.log('CTRL+C to ext');

var html1 = '<title> hello-mongoose: MongoLab MongoDB Mongoose Node.js Demo on Heroku </title> \
<head> \
<style> body {color: #394a5f; font-family: sans-serif} </style> \
</head> \
<body> \
<h1> hello-mongoose: MongoLab MongoDB Mongoose Node.js Demo on Heroku </h1> \
See the <a href="https://devcenter.heroku.com/articles/nodejs-mongoose">supporting article on the Dev Center</a> to learn more about data modeling with Mongoose. \
<br\> \
<br\> \
<br\> <h2> All Documents in MonogoDB database </h2> <pre><code> ';
var html2 = '</code></pre> <br\> <i>';
var html3 = ' documents. </i> <br\> <br\>';
var html4 = '<h2> Queried (name.last = "Doe", age >64) Documents in MonogoDB database </h2> <pre><code> ';
var html5 = '</code></pre> <br\> <i>';
var html6 = ' documents. </i> <br\> <br\> \
<br\> <br\> <center><i> Demo code available at <a href="http://github.com/mongolab/hello-mongoose">github.com</a> </i></center>';


