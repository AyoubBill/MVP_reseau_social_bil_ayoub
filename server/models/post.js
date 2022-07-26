const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
    likers: { type: [String], required: true }
});

module.exports = mongoose.model('Post', postSchema);