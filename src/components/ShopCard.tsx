import InputNumber from "./InputNumber";
import image from "../assets/product/register.jpg";

interface Props {
    children: React.ReactNode;
}

const ShopCard: React.FC<Props> = ({children}) => {

    return(
        <div className="">
            <div className="flex border border-gray-200 px-5 py-2">
                <input type="checkbox" className="mr-3"/>
                <p className="font-medium">Owner</p>
            </div>

            {/* Fetch Product per Shop */}
            <div className="flex border border-gray-200 px-5 py-2">
                <input type="checkbox" className="mr-3"/>
                
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