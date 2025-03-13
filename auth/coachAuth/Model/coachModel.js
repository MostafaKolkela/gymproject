import mongoose from "mongoose";

const coachSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true,
        unique: true
    },

    cv: {
        type: String,
        required: true
    },

    fees :{
        type: Number,
        required: true
    },

    isVerifyed : {
        type: Boolean,
        default: false
    }

});

const Coach = mongoose.model('Coach', coachSchema);
export default Coach;