import axios from "axios";

export default async function Products() {
    const products = await axios.get("/api/products");
    console.log(products);
    return products;
}