"use client"

import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react"

export default function AddProduct({getProd}: {getProd: Function}) {

    const session = useSession();
    const [product, setProduct] = useState({
        name: "",
        image: "",
        quantity: ""
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if(product.name == "" || product.image == "") {
            setProduct({
                name: "",
                image: "",
                quantity: ""
            });
            return;
        }
        setLoading(!loading);
        await axios.post("/api/product", {
            name: product.name,
            image: product.image,
            quantity: parseInt(product.quantity),
        });
        setProduct({
            name: "",
            image: "",
            quantity: ""
        });
        const products = await axios.get("/api/product");
        getProd(products.data);
        setLoading(loading);
    }

    return (
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
            <div className="p-4 text-center md:py-7 md:px-5">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">Add Product</h3>
                <div className="flex flex-col sm:flex-row gap-2">
                    <input 
                        type="text" 
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" 
                        placeholder="Product Name..."
                        value={product.name}
                        onChange={(e) => setProduct({...product, name: e.target.value})}
                    />
                    <input 
                        type="text" 
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" 
                        placeholder="Product Image url..."
                        value={product.image}
                        onChange={(e) => setProduct({...product, image: e.target.value})}
                    />
                    <input 
                        type="text" 
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" 
                        placeholder="Product Quantity..."
                        value={product.quantity}
                        onChange={(e) => setProduct({...product, quantity: e.target.value})}
                    />
                    {
                        loading ?
                        <button type="button" className="flex justify-center items-center size-[46px] text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                            <span className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
                                <span className="sr-only">Loading...</span>
                            </span>
                        </button> :
                        <button 
                            type="button" 
                            disabled={loading}
                            className="py-3 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none w-full lg:w-auto"
                            onClick={handleSubmit}
                        >Submit</button>
                    }
                </div>
            </div>
        </div>
    )
}