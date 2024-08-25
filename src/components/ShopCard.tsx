import InputNumber from "./InputNumber";
import image from "../assets/product/register.jpg";

interface Props {
    children: React.ReactNode;
    checkbox: string;
    totalPrice: string;
}

const ShopCard: React.FC<Props> = ({children, checkbox, totalPrice}) => {

    return(
        <div className="">
            <div className="flex bg-[#FFFDFD] border border-gray-200 px-5 py-2">
                {checkbox === "true" && 
                    <input type="checkbox" className="mr-3"/>
                }
                <div className="flex justify-between w-full">
                    <p className="font-medium">Owner</p>
                    { totalPrice.length >= 1 &&
                        <p className="font-bold">IDR. {totalPrice}</p>
                    }
                </div>
            </div>

            {/* Notes : Fetch Product per Shop */}
            <div className="flex bg-[#FFFDFD] border border-gray-200 px-5 py-2">
                {checkbox === "true" && 
                    <input type="checkbox" className="mr-3"/>
                }
                
                <div className="flex w-full py-3">
                    <img src={image} width={200} className="mr-10"/>

                    <div className="flex flex-col justify-between w-full">
                        <p>Pants A</p>

                        <div className="flex flex-row justify-between">
                            <p className="font-bold">IDR. 200,000</p>

                            {children}
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopCard;