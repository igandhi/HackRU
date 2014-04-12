var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
	body: String,
	userid: String,
	venue: String,
	date: {type: Date, default: Date.now },
});
