const teacherModel = require("../backend/src/models/teacher.model")
const bcrypt = require("bcryptjs")
async function createAdmin(name,password)
{
    const hash = await bcrypt.hash(password,10)
    const admin = await teacherModel.create({
        name:name,
        email:"admin@gmail.com",
        password:hash
    })
}

createAdmin("karan","admin@123")