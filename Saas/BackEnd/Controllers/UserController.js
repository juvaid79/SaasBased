const User = require("../model/usermodel")
const jwt = require('jsonwebtoken');


exports.UserSingUp = async (req, res) => {
    try {
        const { name, email, password, organizationId, subscriptionId } = req.body;
        const usercheck = await User.findOne({ email: email })
        if (!usercheck) {
            const usercreated = new User({ name, email, password, organizationId: organizationId, subscriptionId: subscriptionId })
            await usercreated.save()
            return res.status(200).json({ success: true, msg: 'User Has Been Register You Have To Logout Organization For User Login' })
        }
        else {
            return res.status(400).json({ success: false, msg: 'Already Register With This email Please Login' })
        }

    } catch (error) {
        return res.status(500).json({ success: false, error })


    }
}

exports.UserLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const Checkuser = await User.findOne({ email: email });
        if (Checkuser) {
            if (Checkuser.password === password) {
                if (Checkuser.isActive) {
                    const token = jwt.sign({ token: Checkuser }, 'SecretKey');
                    return res.status(200).json({ success: true, token: token, msg: 'User Login successfully' });
                }
                else {
                    return res.json({ success: false, msg: 'You can not login because you are deactivate' });
                }

            } else {
                return res.json({ success: false, msg: 'Invalid password. Try Again' });
            }
        } else {
            return res.json({ success: false, msg: 'Invalid email. Try Again' });
        }
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Login Failed Internal Error' });
    }
}


exports.ForgetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const forgetps = await User.findOne({ email });
        if (!forgetps) {
            return res.status(404).json({ message: 'User not found' });
        }
        const randomPassword = Math.random()
        console.log("is your new password", randomPassword);
        await User.updateOne({ email }, { password: randomPassword });
        return res.json({ message: 'Password reset successful', randomPassword: randomPassword });
    } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({ message: 'Server error' });
    }

};

exports.GetAllUser = async (req, res) => {
    try {
        const { page = 1, pageSize = 2 } = req.query;
        const count = await User.countDocuments();
        const skip = (page - 1) * pageSize;
        const getalluser = await User.find()
        // .populate('organizationId').populate('subscriptionId')
            .skip(skip)
            .limit(parseInt(pageSize));
        const name = getalluser[0].subscriptionId.name;
        const price = getalluser[0].subscriptionId.price;
        if (getalluser) {
            return res.status(200).json({
                success: true,
                msg: "Your all user here",
                getalluser: getalluser,
                totalPages: Math.ceil(count / pageSize),
                currentPage: parseInt(page),
                name: name,
                price: price
            });
        } else {
            return res.status(404).json({ success: false, msg: "No User Found" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error });
    }
};





exports.UpdateStatus = async (req, res) => {
    const _id = req.params._id;
    const { isActive } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(_id, { isActive });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        let message = isActive ? 'User has been activated' : 'User has been deactivated';

        res.status(200).json({ message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

