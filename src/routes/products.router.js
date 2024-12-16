import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
    const { limit } = req.query;
    const products = await productManager.getProducts(parseInt(limit));
    res.json(products);
});

router.get("/:pid", async (req, res) => {
    const product = await productManager.getProductById(parseInt(req.params.pid));
    product ? res.json(product) : res.status(400).send("Producto no encontrado");
});

router.post("/", async (req, res) => {
    const newProduct = await productManager.addProduct(req.body);
    res.status(200).json(newProduct);
});

router.put("/:pid", async (req, res) => {
    try {
        const updatedProduct = await productManager.updateProduct(parseInt(req.params.pid), req.body);
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete("/:pid", async (req, res) => {
    await productManager.deleteProduct(parseInt(req.params.pid));
    res.send("Producto eliminado");
});

export default router;