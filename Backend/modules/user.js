const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email:{
        type: String
    },
    googleId: {
        type: String
    },
    history: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userHistory"
        }
    ]
})

const User = mongoose.model("User", userSchema);

module.exports = User;