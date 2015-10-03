var mongoose = require('mongoose');
var text = mongoose.model('Text').schema;

var pageSchema = mongoose.Schema({
    name: { type: String, required: true , unique: 1 },
    texts: [ text ]
});
//pageSchema.index({ name: 1 }, { unique: true });

mongoose.model('Page', pageSchema);
