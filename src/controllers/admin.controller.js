
const adminModel = require("../models/teacher.model");
const StudentModel = require("../models/student.model");
const teacherModel = require("../models/teacher.model")

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function login(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Invalid username or password"
            });
        }

        const admin = await adminModel.findOne({
            name: username
        }).select("+password name _id isAdmin");

        if (!admin || !admin.isAdmin) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        const isValid = await bcrypt.compare(
            password,
            admin.password
        );

        if (!isValid) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        const token = jwt.sign(
            { id: admin._id },
            process.env.JWT_SECRATE,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "Login successful",
            admin: {
                id: admin._id,
                name: admin.name
            }
        });

    } catch (error) {
        console.log("Login error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function dashboard(req, res) {
    try {
        const maleStudents = await StudentModel.countDocuments({
            gender: "Male"
        });

        const femaleStudents = await StudentModel.countDocuments({
            gender: "Female"
        });

        const totalStudents = await StudentModel.countDocuments();

        return res.status(200).json({
            message: "Fetched successfully",
            totalStudents,
            totalMale: maleStudents,
            totalFemale: femaleStudents
        });

    } catch (error) {
        console.log("Dashboard error:", error);

        return res.status(500).json({
            message: "Failed to fetch dashboard data"
        });
    }
}

async function newApplication(req,res)
{
    const {
        studentName,
        dateOfBirth,
        gender,
        guardian,
        mediumOfStudy,
        profilePicture,
        address,
        admissionDate
    } = req.body;

    const student = await StudentModel.create({studentName,
        dateOfBirth,
        gender,
        guardian,
        mediumOfStudy,
        profilePicture,
        address,
        admissionDate})
    
        res.status(201).json({
            message:"student application is sucessful",
            student:{
                studentName,
                dateOfBirth,
                gender,
                guardian,
                mediumOfStudy,
                profilePicture,
                address,
                admissionDate
            }
        })
}

async function student(req,res)
{
    const students = await StudentModel.find()

    res.status(200).json({
            message:"student data feched successfull",
            students:students
        })
}

async function guardian(req,res)
{
    const guardian = await StudentModel.find()
    .select("studentName guardian.guardianName guardian.contactNumber");

    res.status(200).json({
            message:"student data feched successfull",
            guardian:guardian
        })
}

async function employee(req,res)
{
    const {
            name,
            email,
            password,
            post,
            isAdmin
        } = req.body;
    
    const employee = await teacherModel.create({
            name,
            email,
            password,
            post,
            isAdmin
    })

    res.status(201).json({
        message:"emplooye added successfully",
        employee:employee
    })
}

async function employeeList(req,res){
    const emplooyes = await teacherModel.find()

    res.status(200).json({
        message:"employee list get successfully",
        employes:emplooyes
    })
}

async function updateStudent(req,res)
{
    try {
        const { id } = req.params;

        const updatedStudent = await StudentModel.findByIdAndUpdate(
            id,
            { $set: req.body },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedStudent) {
            return res.status(404).json({
                message: "Student not found."
            });
        }

        return res.status(200).json({
            message: "Student updated successfully.",
            student: updatedStudent
        });

    } catch (error) {
        return res.status(400).json({
            message: "Failed to update student.",
            error: error.message
        });
    }
}

async function removeEmployee(req,res) {
    const id = req.params.id;

    
    const isThere = await teacherModel.findOneAndDelete(id);

    if(!isThere)
    {

        res.status(401).json({
            message:"employee doesn't exits"
        })
    }

    res.status(204).json({
        message:"employee removed."
    })
    
}

async function findStudent(req,res) {
    const id = req.params.id;

    
    const isThere = await StudentModel.findOne(id);

    if(!isThere)
    {

        res.status(401).json({
            message:"student doesn't exits"
        })
    }
    
    res.status(204).json({
        message:"student found",
        student:isThere
    })
    
}

async function findEmplooye(req,res) {
    const id = req.params.id;

    
    const isThere = await teacherModel.findOne(id);

    if(!isThere)
    {

        res.status(401).json({
            message:"emplooye doesn't exits"
        })
    }
    
    res.status(204).json({
        message:"emplooye found",
        student:isThere
    })
    
}
    

async function updateEmploye(req,res)
{
    try {
        const { id } = req.params;

        const updatedEmployee = await teacherModel.findByIdAndUpdate(
            id,
            { $set: req.body },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedEmployee) {
            return res.status(404).json({
                message: "employee not found."
            });
        }

        return res.status(200).json({
            message: "employee updated successfully.",
            student: updatedEmployee
        });

    } catch (error) {
        return res.status(400).json({
            message: "Failed to update student.",
            error: error.message
        });
    }
}

async function removeEmploye(req,res) {
    const id = req.params.id;

    
    const isThere = await teacherModel.findOneAndDelete(id);

    if(!isThere)
    {

        res.status(401).json({
            message:"employee doesn't exits"
        })
    }

    res.status(204).json({
        message:"employee removed."
    })
    
}

async function removeStudent(req,res) {
    const id = req.params.id;

    
    const isThere = await StudentModel.findOneAndDelete(id);

    if(!isThere)
    {

        res.status(401).json({
            message:"student doesn't exits"
        })
    }

    res.status(204).json({
        message:"student removed."
    })
    
}

async function adminLogout(req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });

    return res.status(200).json({
        message: "Admin logged out successfully."
    });
}

module.exports = { login, adminLogout, findStudent, removeStudent ,dashboard, updateStudent , newApplication,
    updateEmploye, updateStudent, removeEmploye,
    student,guardian, employee,employeeList, findEmplooye };
