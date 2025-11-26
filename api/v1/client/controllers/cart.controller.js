const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");

module.exports = {
    // Lấy giỏ hàng
    getCart: async (req, res) => {
        try {
            const user_id = req.user.id;

            let cart = await Cart.findOne({ user_id }).populate("items.product_id");

            if (!cart) cart = await Cart.create({ user_id, items: [] });

            res.json({ status: "success", cart });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Thêm sản phẩm vào giỏ
    addToCart: async (req, res) => {
        try {
            const user_id = req.user.id;
            const { product_id, quantity } = req.body;

            // Kiểm tra sản phẩm tồn tại
            const product = await Product.findById(product_id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            let cart = await Cart.findOne({ user_id });

            if (!cart) {
                cart = await Cart.create({
                    user_id,
                    items: [{ product_id, quantity }]
                });
            } else {
                const itemIndex = cart.items.findIndex(
                    (item) => item.product_id.toString() === product_id
                );

                if (itemIndex >= 0) {
                    cart.items[itemIndex].quantity += quantity;
                } else {
                    cart.items.push({ product_id, quantity });
                }

                await cart.save();
            }

            res.json({ status: "success", cart });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Cập nhật số lượng sản phẩm
    updateQuantity: async (req, res) => {
        try {
            const user_id = req.user.id;
            const { product_id, quantity } = req.body;

            let cart = await Cart.findOne({ user_id });

            if (!cart) return res.status(404).json({ message: "Cart not found" });

            const itemIndex = cart.items.findIndex(
                (item) => item.product_id.toString() === product_id
            );

            if (itemIndex < 0)
                return res.status(404).json({ message: "Item not found in cart" });

            cart.items[itemIndex].quantity = quantity;

            await cart.save();

            res.json({ status: "success", cart });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Xóa từng sản phẩm
    removeItem: async (req, res) => {
        try {
            const user_id = req.user.id;
            const { product_id } = req.params;

            let cart = await Cart.findOne({ user_id });

            if (!cart) return res.status(404).json({ message: "Cart not found" });

            cart.items = cart.items.filter(
                (item) => item.product_id.toString() !== product_id
            );

            await cart.save();

            res.json({ status: "success", cart });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Xóa toàn bộ giỏ
    clearCart: async (req, res) => {
        try {
            const user_id = req.user.id;

            const cart = await Cart.findOneAndUpdate(
                { user_id },
                { items: [] },
                { new: true }
            );

            res.json({ status: "success", cart });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
