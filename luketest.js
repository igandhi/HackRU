var mongoose = require('mongoose');
var http = require('http');


mongoose.connect('mongodb://localhost:test');


var Schema = mongoose.Schema;

var messageSchema = new Schema({  //schema
	venueid: String,
	venuename: String,
	message: String,
	user: String,
});

var Message = mongoose.model('Message', messageSchema); //model 

var HackRU = new Message({
	venueid: 'venueid',
	venuename: 'venuename',
	message: 'this is a message',
	user: 'anon'
});

HackRU.save(function(err, HackRU){
	if(err) return console.error(err);
	console.dir(HackRU);
});

var server = http.createServer(function(req, res){
	res.writeHead(200);
	res.end(HackRU);
});


server.listen(8000);
console.log("Running node server at port: 8000");
