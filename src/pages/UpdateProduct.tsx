import IconArrowBack from "@assets/icons/IconArrowBack"
import NavbarIcon from "@components/NavbarIcon"
import image from "../assets/product/register.jpg";
import Input from "@components/Input";
import { useState } from "react";
import CategoryField from "@components/CategoryField";

const UpdateProduct: React.FC = () => {
    const [productName, setProductName] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [stock, setStock] = useState<string>('');

    return(
        <div className="my-10 mx-20">
            <div className="flex flex-row items-center mb-10">
                <div className="mr-5">
                    <NavbarIcon to="/profile/:principal" icon={<IconArrowBack/>}/>
                </div>
                <p className="text-2xl">Edit Product Detail</p>
            </div>

            <div className="flex">
                <div className="w-[40%] mr-10">
                    <div className="mb-5">
                        <img src={image}/>
                    </div>
                    <button className="w-full border-black border p-5">Edit Image</button>
                </div>

                <div className="w-full">
                    <div className="space-y-4">
                        <Input label="Product Name" data={productName} inputOnChange={(e) => {setProductName(e.target.value)}}/>
                        <Input label="Price" data={price} inputOnChange={(e) => {setPrice(e.target.value)}}/>
                        <Input label="Stock" data={stock} inputOnChange={(e) => {setStock(e.target.value)}}/>
                        <div>
                            <label>Category</label>

                            <CategoryField/>
                        </div>
                    </div>

                    <button className="w-full mt-5 p-4 bg-black border-black border text-white">Update Product</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct;