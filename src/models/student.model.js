
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        studentName: {
            type: String,
            required: [true, "Student name is required"],
            trim: true,
            minlength: [2, "Name must be at least 2 characters"],
            maxlength: [100, "Name cannot exceed 100 characters"]
        },

        dateOfBirth: {
            type: Date,
            required: [true, "Date of birth is required"],
            validate: {
                validator: function (value) {
                    return value < new Date();
                },
                message: "Date of birth must be in the past"
            }
        },

        gender: {
            type: String,
            required: true,
            enum: ["Male", "Female", "Other"]
        },

        guardian: {
            guardianName: {
                type: String,
                required: [true, "Guardian name is required"],
                trim: true
            },

            contactNumber: {
                type: String,
                required: [true, "Guardian contact number is required"],
                trim: true,
                match: [
                    /^\+?[0-9]{7,15}$/,
                    "Enter a valid contact number"
                ]
            }
        },

        mediumOfStudy: {
            type: String,
            required: true,
            enum: ["English", "Nepali"]
        },

        profilePicture: {
            url: {
                type: String,
                default: null
            },
            publicId: {
                type: String,
                default: null
            }
        },

        address: {
            province: {
                type: String,
                trim: true
            },
            district: {
                type: String,
                trim: true,
                required: true
            },
            municipality: {
                type: String,
                trim: true,
                required: true
            },
            wardNumber: {
                type: Number,
                min: 1,
                max: 50
            },
            street: {
                type: String,
                trim: true
            }
        },

        admissionDate: {
            type: Date,
            required: true,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

const StudentModel = mongoose.model("Student", studentSchema);

module.exports = StudentModel;
