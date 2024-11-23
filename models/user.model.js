const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    posts: {
        type: Array,
        default: []
    }
}, { timestamps: true });

mongoose.model('user', userSchema)