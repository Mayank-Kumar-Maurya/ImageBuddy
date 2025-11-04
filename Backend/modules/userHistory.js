const mongoose = require("mongoose");

const userHistorySchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    team: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const userHistory = mongoose.model("userHistory", userHistorySchema);

module.exports = userHistory;