"use client"

import AddProduct from "@/components/AddProduct";
import ProductCard from "@/components/ProductCard";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {

    const session = useSession();
    const router = useRouter();

  const [product, setProduct] = useState([]);

  const getProd = async () => {
    const products = await axios.get("/api/product");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
          <div className="my-4 flex justify-between flex-wrap">
            { product.map(prod => <ProductCard key={prod.id} id={prod.id} name={prod.name} image={prod.image} quantity={prod.quantity} getProd={getProd}/>)}
          </div>
        }
    </div>
}