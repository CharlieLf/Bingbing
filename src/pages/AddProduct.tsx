import Input from "@components/Input";
import image from "../assets/product/register.jpg";
import IconBackArrow from "@assets/icons/IconBackArrow";
import { useState } from "react";
import CategoryField from "@components/CategoryField";
import ButtonSmall from "@components/ButtonSmall";

const AddProduct: React.FC = () => {
    const [productName, setProductName] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [stock, setStock] = useState<string>('');

    return(
        <div className="my-10 mx-20">
            <div className="flex flex-row items-center mb-10">
                <div className="w-10 h-10 mr-5">
                    <IconBackArrow/>
                </div>
                <p className="text-2xl">Add Product</p>
            </div>

            <div className="flex">
                <div className="w-[25%] mr-10">
                    <div className="mb-5">
                        <img src={image}/>
                    </div>
                    <button className="w-full border-black border p-5">Add Image</button>
                </div>

                <div className="w-full space-y-4">
                    <Input label="Product Name" data={productName} inputOnChange={(e) => {setProductName(e.target.value)}}/>
                    <Input label="Price" data={price} inputOnChange={(e) => {setPrice(e.target.value)}}/>
                    <Input label="Stock" data={stock} inputOnChange={(e) => {setStock(e.target.value)}}/>
                    <div>
                        <label>Category</label>
                        <ButtonSmall text="Male"/>
                        {/* <CategoryField/> */}
                    </div>

                    <div>
                        <button>Add Product</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProduct;