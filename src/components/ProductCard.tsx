"use client"

import axios from "axios";
import Image from "next/image"
import { useState } from "react"

import { Product } from "@/lib/productInterface";

export default function ProductCard({name, image, quantity, id, getProd}: {name: string, image: string, quantity: string, id: string, getProd: (products: Product[]) => void}) {
    const [update, setUpdate] = useState(false);
    const [product, setProduct] = useState({name,quantity});

    const updateProd = async () => {
        setUpdate(!update)
        if(!update) return;
        await axios.put("/api/product", {id: id, name: product.name, quantity: parseInt(product.quantity)});
        const products = await axios.get("/api/product");
        getProd(products.data);
        setUpdate(!update);
    }

    const deleteProd = async () => {
        await axios.delete("/api/product", {data: {id}});
        const products = await axios.get("/api/product");
        getProd(products.data);   
    }

    return (
        <div className="w-[300px]">
            <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
            <Image
                className="rounded-t-xl w-full h-[300px]"
                src={image} 
                alt="Card Image"
                width={400}
                height={400}
            />
                <div className="p-4 md:p-5 flex flex-col gap-4">
                    <div className="flex justify-between">
                        {
                            update ?
                            <input 
                                type="text" 
                                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" 
                                placeholder="Product Name..."
                                value={product.name}
                                onChange={(e) => setProduct({...product, name: e.target.value})}
                            /> :
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                                {name}
                            </h3>
                        }
                        <button 
                            type="button" 
                            onClick={deleteProd}
                            className="py-3 px-4 inline-flex items-center text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                        >Delete</button>
                    </div>
                    <div className="flex justify-between gap-4">
                        <button 
                            type="button" 
                            onClick={updateProd}
                            className="py-3 px-4 inline-flex items-center text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                        >{update ? "Update" : "Edit"}</button>
                        {
                            update ?
                            <input 
                                type="text" 
                                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" 
                                placeholder="Product Quantity..."
                                value={product.quantity}
                                onChange={(e) => setProduct({...product, quantity: e.target.value})}
                            /> :
                            <button 
                                type="button" 
                                className="py-3 px-4 inline-flex items-center text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                            >{quantity}</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}