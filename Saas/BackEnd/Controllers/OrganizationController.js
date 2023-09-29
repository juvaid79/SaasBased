const Organization = require('../model/organizationmodel')
const jwt = require("jsonwebtoken")

exports.SingupOrganization = async (req, res) => {
    try {
        const { name, email, password, subscriptionId } = req.body;
        const organizationCheck = await Organization.findOne({ email: email })
        if (!organizationCheck) {
            const Organizationcreated = new Organization({ name, email, password, subscriptionId: subscriptionId, })
            await Organizationcreated.save()
            return res.status(200).json({ success: true, msg: 'Organization Has Been Register' })
        }
        else {
            return res.status(400).json({ success: false, msg: 'Already Register With This email Please Login' })
        }

    } catch (error) {
        return res.status(500).json({ success: false, error })

    }
}
exports.LoginOrganization = async (req, res) => {
    const { email, password } = req.body;

    try {
        const checkorganization = await Organization.findOne({ email: email })
        if (checkorganization) {
            if (checkorganization.password === password) {
                const token = jwt.sign({ token: checkorganization }, 'secretkey')
                return res.status(200).json({ success: true, token: token, msg: "Welcome Organization user" })

            }

            else {
                return res.status(400).json({ success: false, msg: "Wrong Password" })
            }
        } else {
            return res.status(400).json({ success: false, msg: " wrong email" })
        }

    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal server error " })

    }
}
exports.GetOrganization = async(req,res)=>{
    const {id}=req.params
    try {
        const GetOrgs = await Organization.findById(id);
        if (!GetOrgs) {
            return res.status(404).json({ success: false, msg: "User Not Found" })
        }
        else {
            return res.status(200).json({ success: true, msg: "Organization Found", GetOrgs: GetOrgs })
        }

    }
     catch (error) {
        return res.status(500).json({ success: false, error })
    }
}

exports.GetAllOrganization = async(req,res)=>{
    try {
        const GetOrgs = await Organization.find()
        if (!GetOrgs) {
            return res.status(404).json({ success: false, msg: "User Not Found" })
        }
        else {
            return res.status(200).json({ success: true, msg: "Organization Found", GetOrgs: GetOrgs })
        }
    } catch (error) {
        return res.status(500).json({ success: false, error })
    }
}

exports.Deleteorganization = async (req, res) => {
    const { id } = req.params;
    try {
        const dltorg = await Organization.findByIdAndRemove(id)
        return res.status(200).json({ success: true, msg: "DeleteSuccesfully", dltorg: dltorg })
    } catch (error) {
        return res.status(500).json({ success: false, error })

    }

}
exports.UpdateOrganization = async (req, res) => {
    const { _id, subscriptionId } = req.body;
    try {
        const UpdateOrga = await Organization.findByIdAndUpdate({ _id: _id }, { subscriptionId: subscriptionId })
        if (UpdateOrga) {
            return res.status(200).json({ success: true, msg: "Your Subscription has been Changed :) " })
        }
        else {
            return res.status(500).json({ success: false, msg: "Your Can't Change Your Subscirption :) " })
        }

    } catch (error) {
        return res.status(500).json({ success: false, error })

    }


}

