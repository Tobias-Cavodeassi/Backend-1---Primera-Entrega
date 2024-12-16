import fs from "fs/promises";
import path from "path";

class ProductManager {
    constructor() {
        this.path = path.join("src", "data", "productos.json");
    }

    async getProducts(limit) {
        const data = await fs.readFile(this.path, "utf-8");
        const products = JSON.parse(data);
        return limit ? products.slice(0, limit) : products;
    }

    async getProductById(pid) {
        const products = await this.getProducts();
        return products.find((p) => p.id === pid);
    }

    async addProduct(product) {
        const products = await this.getProducts();
        const newProduct = {
            id: products.length + 1,
            status: true,
            ...product,
        };
        products.push(newProduct);
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        return newProduct;
    }

    async updateProduct(pid, updatedFields) {
        const products = await this.getProducts();
        const index = products.findIndex((p) => p.id === pid);
        if (index === -1) throw new Error("Producto no encontrado");
        products[index] = { ...products[index], ...updatedFields, id: pid };
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        return products[index];
    }

    async deleteProduct(pid) {
        let products = await this.getProducts();
        products = products.filter((p) => p.id !== pid);
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    }
}

export default ProductManager;