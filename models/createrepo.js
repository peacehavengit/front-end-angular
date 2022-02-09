const mongoose = require('mongoose');

var createRepoSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.ObjectId,
        required: true,
        trim: true,
        ref: 'Users'
    },
    reponame: {
        type: String,
        required: true
    },
    privacytype: {
        type: String,
        required: true
    },
    adduser: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    }
});

const RepositoryModel = mongoose.model('Repository', createRepoSchema);
module.exports = RepositoryModel;