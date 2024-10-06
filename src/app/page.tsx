"use client"

import AddProduct from "@/components/AddProduct";
import ProductCard from "@/components/ProductCard";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { Product } from "@/lib/productInterface";

export default function Home() {

  const session = useSession();
  const [product, setProduct] = useState<Product[]>([]);

  const getProd = async () => {
    const products = await axios.get("/api/product");
    setProduct(products.data)
  }

  useEffect(() => {
    getProd()
  }, []);

  return session.data &&
    <div>
        <AddProduct getProd={getProd}/>
        {
          product.length > 0 &&
          <div className="my-4 flex flex-wrap gap-4">
            { product.map(prod => <ProductCard key={prod.id} id={prod.id} name={prod.name} image={prod.image} quantity={prod.quantity} getProd={getProd}/>)}
          </div>
        }
    </div>
}