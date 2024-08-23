import mongoose from 'mongoose';

const traineeSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    emailAddress: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    address: {
        type:String, required:true
    },
    highestQualification: { type: String, required: true },
    collegeName: { type: String, required: true },
    coursesInterested: { type: [String], required: true },
    applyDate: { type: Date, default: Date.now },
    password: { type: String  }
});


export default mongoose.model("Trainee", traineeSchema);
