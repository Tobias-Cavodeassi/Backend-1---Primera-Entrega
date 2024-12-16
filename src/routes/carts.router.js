import { Router } from "express";
import CartManager from "../managers/CartManager.js";

const router = Router();
const cartManager = new CartManager();

router.post("/", async (req, res) => {
    const newCart = await cartManager.createCart();
    res.status(200).json(newCart);
});

router.get("/:cid", async (req, res) => {
    const cart = await cartManager.getCartById(parseInt(req.params.cid));
    cart ? res.json(cart.products) : res.status(400).send("Carrito no encontrado");
});

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const updatedCart = await cartManager.addProductToCart(
            parseInt(req.params.cid),
            parseInt(req.params.pid)
        );
        res.json(updatedCart);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

export default router;