var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/test");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
	var newSchema = mongoose.Scheme({
		name : String
	});

	var Item = mongoose.model('Item', newSchema);
	var me = new Item({name: 'MyName'});
	console.log(me.name);
});
