const Product = require('../model/productmodel')

exports.AddProduct = async (req, res) => {
    const { productName, brand, category, price, quantity, UserId, organizationId } = req.body;
    try {
        const addproduct = new Product({
            productName,
            brand,
            category,
            price,
            quantity,
            UserId: UserId,
            organizationId: organizationId
        })
        if (addproduct) {
            await addproduct.save();
            return res.status(200).json({ success: true, msg: "Product Add Successfully" })
        }
        else {
            return res.status(400).json({ success: false, msg: "Fill all Requirement field" })
        }
    } catch (error) {
        return res.status(500).json({ success: false, error })

    }

}
exports.GetProducts = async (req, res) => {
    try {
        const getpro = await Product.find()
        return res.status(200).json({ success: true, msg: "Youre Product ", getpro: getpro })

    } catch (error) {
        return res.status(500).json({ success: false, error })

    }

}

exports.GetProductById = async (req, res) => {
    try {
        const UserId = req.query.UserId;
        const GetProById = await Product.find({UserId:UserId})
        if (GetProById) {
            return res.status(200).json({ success: true, msg: "Your Product !!", GetProById: GetProById })
        }
        else {
            return res.status(404).json({ success: true, msg: "Something went with api" })

        }
    } catch (error) {
        return res.status(500).json({ success: true, msg: error })

    }
}

exports.Productdlt = async (req, res) => {
    const { id } = req.params;
    try {
        const dltpro = await Product.findByIdAndRemove(id);
        if (dltpro) {
            return res.status(200).json({ success: true, msg: "Delete Product Succesfully", dltpro: dltpro })
        }
        else {
            return res.status(404).json({ success: false, msg: "Product already Deleted" })
        }

    } catch (error) {
        return res.status(500).json({ success: false, error })

    }

}
exports.UpdateProducts = async (req, res) => {
    const { _id, price } = req.body;
    try {
        const updateproduct = await Product.findByIdAndUpdate({ _id: _id }, { price: price })
        if (updateproduct) {
            return res.status(200).json({ success: true, msg: " Your Productc Has been Updated", updateproduct: updateproduct })
        }
        else {
            return res.status(404).json({ success: false, msg: "Prodouct not Found " })
        }

    } catch (error) {
        return res.status(500).json({ success: false, error })

    }

}

