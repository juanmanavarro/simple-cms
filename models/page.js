var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
    name: { type: String, required: true , unique: 1 },
});
//pageSchema.index({ name: 1 }, { unique: true });

mongoose.model('Page', pageSchema);
