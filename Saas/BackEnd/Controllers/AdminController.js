const Admin = require('../model/adminmodel')
const jwt = require('jsonwebtoken');

exports.AdminSingUp = async (req, res) => {
    try {

        const adminSignup = new Admin({
            email: "juvaidahmad3@gmail.com",
            password: 12345
        })
        await adminSignup.save()
        return res.status(201).json({ success: true, msg: 'User Has Been Register' })
    }
    catch (error) {
        console.error("ERROR WHILE ADMIN SINGUP", error)

    }
}

exports.AdminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const checkuser = await Admin.findOne({ email: email })
        if (checkuser) {
            if (checkuser.password === password) {
                const token = jwt.sign({ token: checkuser }, 'secretkey')
                return res.status(201).json({ success: true, token: token, msg: "Welcome Admin" })
            }
            else {
                return res.status(401).json({ success: false, msg: "Invalid Password" })
            }
        } else {
            return res.status(401).json({ success: false, msg: " Invalid  Email" })
        }

    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal server error " })

    }
}