const productModel = require("../model/product-model")
const cloudinary = require("../config/cloudinary")

const getProducts = async (req, res) => {
    try {
        const products = await productModel.find({})
        res.json(products);

    } catch (error) {
        res.status(400).json("there is an error in getting products", error.message)
    }
}
const getProductsById = async (req, res) => {
    try {

        const products = await productModel.findById(req.params.id)
        if (products) {

            res.json(products);
        }
        else {
            res.status(404).json({ message: "product not found" })
        }

    } catch (error) {
        res.status(400).json({ "there is an error in getting products": error.message })
    }
}
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        let imagesUrl = '';
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imagesUrl = result.secure_url;
        }
        const product = new productModel({
            name,
            description,
            price,
            category,
            stock,
            imagesUrl,
        })
        const savedProduct = await product.save();
        res.status(201).json(savedProduct)
    } catch (error) {
    console.log("Create product error:", error);
    res.status(500).json({
        message: error.message
    });
}

}
const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        const product = await productModel.findById(req.params.id);
        if (product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.category = category || product.category;
            product.stock = stock || product.stock;
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path);
                console.log(result);
                product.imagesUrl = result.secure_url;
            }
            const updatedProduct = await product.save();
            res.json(updatedProduct)
        }
        else {
            res.status(404).json({ message: 'product is not found' })
        }
    } catch (error) {
        res.status(400).json({ 'server error': error.message })
    }
}
const deleteProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id)
        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product Removed' })
        }

    } catch (error) {
        res.status(400).json({ 'message': error.message })
    }
}

const getProductsByCategory = async (req, res) => {
    try {

        const { category } = req.params;

        const categoryMap = {
            indianmarble: "Indian Marble",
            italianmarble: "Italian Marble",
            granite: "Granite",
            marbletiles: "Marble Tiles",
            onyxstone: "Onyx Stone",
            sandstone: "Sandstone"
        };

        const actualCategory = categoryMap[category];

        const products = await productModel.find({
            category: actualCategory
        });

        res.status(200).json(products);

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            message: "Failed to fetch products"
        });
    }
};

module.exports = {
    updateProduct, deleteProduct, getProducts, getProductsById, createProduct, getProductsByCategory
}
