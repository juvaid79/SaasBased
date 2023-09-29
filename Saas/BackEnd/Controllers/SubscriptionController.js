const Subscription = require("../model/subscriptionmodel")

exports.AddSubScription = async (req, res) => {
    const { name, price } = req.body;
    try {
        const newSubscription = new Subscription({
            name: name,
            price: price
        });
        await newSubscription.save();
        return res.status(201).json({ success: true, msg: "Subscription Added Successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal Server Error" ,error});
    }
}




exports.GetSubscription = async (req, res) => {
    try {
        const GetSubscription = await Subscription.find();
        if (!GetSubscription) {
            return res.status(404).json({ success: false, msg: "Subsciption  Not Found" })
        }
        else {
            return res.status(200).json({ success: true, msg: "Subscription Found", GetSubscription: GetSubscription })
        }

    } catch (error) {
        return res.status(500).json({ success: false, error })
    }

}


exports.DeleteSubscription = async (req, res) => {
    const { id } = req.params;
    try {
        const DeleteSub = await Subscription.findByIdAndRemove(id)
        return res.status(200).json({ success: true, msg: "DeleteSuccesfully", DeleteSub: DeleteSub })
    } catch (error) {
        return res.status(500).json({ success: false, error })

    }

}

exports.UpdateSubscription = async (req, res) => {
    const { _id } = req.params;
    const { price, name } = req.body;
    try {
        const UpdateSub = await Subscription.findByIdAndUpdate({ _id: _id }, { price: price, name: name })
        if (!UpdateSub) {
            return res.status(500).json({ success: false, msg: "User Not Found" })
        }
        else {
            return res.status(200).json({ success: true, msg: "Update Successfully ", UpdateSub: UpdateSub })
        }

    } catch (error) {
        return res.status(500).json({ success: false, error })

    }
}



