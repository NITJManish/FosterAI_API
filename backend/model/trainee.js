import mongoose from 'mongoose';

const traineeSchema = new mongoose.Schema({
    photo: String,
    fullName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    emailAddress: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    educationLevel: { type: String, required: true },
    coursesInterested: { type: [String], required: true },
    applyDate: { type: Date, default: Date.now },
    password: { type: String  }
});


export default mongoose.model("Trainee", traineeSchema);
