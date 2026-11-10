const express = require("express")
const adminAuthMiddle = require("../middlewares/admin.auth.middle")
const adminController = require("../controllers/admin.controller")
const adminRouter = express.Router()

//post methods
adminRouter.post("/login",adminController.login)
adminRouter.post("/dashboard",adminAuthMiddle.authAdmin ,adminController.dashboard)
adminRouter.post("/student/application",adminAuthMiddle.authAdmin, adminController.newApplication)
adminRouter.post("/employee",adminAuthMiddle.authAdmin, adminController.employee)

//get methods
adminRouter.get("/student",adminAuthMiddle.authAdmin, adminController.student)
adminRouter.get("/guardian",adminAuthMiddle.authAdmin, adminController.guardian)
adminRouter.get("/student/getId/:id",adminAuthMiddle.authAdmin, adminController.findStudent)
adminRouter.get("/employee/list",adminAuthMiddle.authAdmin, adminController.employeeList)
adminRouter.get("/employee/getId/:id",adminAuthMiddle.authAdmin, adminController.findEmplooye)

//patch methods
adminRouter.patch("/student/update/:id",adminAuthMiddle.authAdmin, adminController.updateStudent)
adminRouter.patch("/employee/update/:id",adminAuthMiddle.authAdmin, adminController.updateEmploye)
//delete api
adminRouter.delete("/student/delete/:id",adminAuthMiddle.authAdmin, adminController.removeStudent)
adminRouter.delete("/employee/delete/:id",adminAuthMiddle.authAdmin, adminController.removeEmploye)


adminRouter.get("/logout",adminAuthMiddle.authAdmin, adminController.adminLogout)

module.exports = adminRouter