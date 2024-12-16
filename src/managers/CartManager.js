import fs from "fs/promises";
import path from "path";

class CartManager {
    constructor() {
        this.path = path.join("src", "data", "carrito.json");
    }

    async createCart() {
        const carts = await this.getCarts();
        const newCart = { id: carts.length + 1, products: [] };
        carts.push(newCart);
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
        return newCart;
    }

    async getCartById(cid) {
        const carts = await this.getCarts();
        return carts.find((c) => c.id === cid);
    }

    async addProductToCart(cid, pid) {
        const carts = await this.getCarts();
        const cart = carts.find((c) => c.id === cid);

        if (!cart) throw new Error("Carrito no encontrado");

        const existingProduct = cart.products.find((p) => p.product === pid);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
        return cart;
    }

    async getCarts() {
        const data = await fs.readFile(this.path, "utf-8");
        return JSON.parse(data);
    }
}

export default CartManager;