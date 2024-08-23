import Navbar from "@components/Navbar";
import Product from "@models/product";
import { useState } from "react";
import { useParams } from "react-router-dom";
import IconHeart from "../assets/icons/IconHeart";

import image from '../assets/product/register.jpg';


const ProductDetail: React.FC = () => {
    let { productId } = useParams();

    const [product, setProduct] = useState<Product>(new Product({
        id: 0n,
        name: "",
        image: "",
        price: 0n
    }));

    return(
        <div>
            <Navbar/>

            <div className="flex w-full px-20 py-10">
                {/* <div className="w-[40%] h-full">
                    <img className="h-1/4 object-cover" src={image}/>
                </div>

                <div className="w-full flex flex-col justify-between mx-10">
                    <div className="flex w-full flex-col">
                        <div className="h-10 self-end">
                            <IconHeart/>
                        </div>
                        <div className="">
                            <p className="text-4xl font-bold">Textured Straight Pants</p>
                            <p className="text-2xl">Rp. 109.000</p>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <button className="w-full p-5w-full bg-black border-black border-2 p-3 text-white text-lg font-bold">ADD TO CART</button>
                        <button className="w-full p-5w-full bg-white border-black border-2 p-3  text-lg font-bold">TRY ON</button>
                    </div>

                    <p className="">*Colors may appear different due to variations in screen lighting.</p>
                </div> */}

                <div className="w-[40%] h-full">
                    <img src={product?.image}/>
                </div>

                <div className="flex flex-col justify-between w-full mx-10">
                    <div className="flex flex-col">
                        <div className="self-end w-10 mb-10">
                            <IconHeart/>
                        </div>
        
                        <div className="mb-32">
                            <p className="text-4xl font-bold">{product?.name}</p>
                            {/* <p className="text-2xl">Rp. {product?.price}</p> */}
                        </div>
                    </div>

                    <div className="space-y-5">
                        <button className="w-full bg-black border-black border-2 p-3 text-white text-lg font-bold">ADD TO CART</button>
                        <button className="w-full bg-white border-black border-2 p-3 text-lg font-bold">TRY ON</button>
                    </div>

                    <p className="italic text-sm">*Colors may appear different due to variations in screen lighting.</p>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;