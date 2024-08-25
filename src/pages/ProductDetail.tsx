import Product from "@models/product";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IconHeart from "../assets/icons/IconHeart";
import NavbarLayout from "@layouts/NavbarLayout";
import { getProductQuery } from "@/services/productService";


const ProductDetail: React.FC = () => {
    let { id } = useParams();
    const { product, getProduct } = getProductQuery(Number.parseInt(id ?? '0'));

    async function fetchProductData() {
        await getProduct();
    }

    useEffect(() => {
        fetchProductData();
    }, []);

    return (
        <NavbarLayout>
            {product ? (
                <div className="flex w-full px-20 py-10">
                    <div className="w-[40%] h-full">
                        <img src={product?.image} />
                    </div>

                    <div className="flex flex-col justify-between w-full mx-10">
                        <div className="flex flex-col">
                            <div className="self-end w-10 mb-10">
                                <IconHeart />
                            </div>

                            <div className="mb-32">
                                <p className="text-4xl font-bold">{product?.name}</p>
                                <p className="text-2xl">Rp. {product.formatPrice()}</p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <button className="w-full bg-black border-black border-2 p-3 text-white text-lg font-bold">ADD TO CART</button>
                            <button className="w-full bg-white border-black border-2 p-3 text-lg font-bold">TRY ON</button>
                        </div>

                        <p className="italic text-sm">*Colors may appear different due to variations in screen lighting.</p>
                    </div>
                </div>
            ) :
                product === undefined ? (

                    <p>Loading...</p>
                ) :
                    (
                        <p>Product not found</p>
                    )}

        </NavbarLayout>
    )
}

export default ProductDetail;