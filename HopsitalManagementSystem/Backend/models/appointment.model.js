import mongoose, {Schema} from "mongoose";
import validator from "validator";

const appointmentSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First Name Must Contain At Least 3 Characters!"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last Name Must Contain At Least 3 Characters!"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Phone Number Must Contain At Least 10 Characters!"],
        maxLength: [14, "Phone Number Must Contain At Least 14 Characters!"]
    },
    dob: {
        type: String,
        required: [true, "DOB Must Be Required!"],
    },      
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"],
    },
    appointment_date: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    doctor: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        }
    },
    hashVisted: {
        type: Boolean,
        default: false
    },
    doctorId: {
        type: Schema.ObjectId,
        required: true
    },
    patientId: {
        type: Schema.ObjectId,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending"
    }
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);