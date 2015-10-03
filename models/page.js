var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
    name: { type: String, required: true , unique: true},
    texts: [
        {
            body: { type: String, required: true },
            slug: { type: String, required: true, match: /^[a-z0-9-]+$/ }
        }
    ]
});

mongoose.model('Page', pageSchema);
