var mongoose = require('mongoose');

var textSchema = mongoose.Schema({
    body: { type: String, required: true }
});

mongoose.model('Text', textSchema);
