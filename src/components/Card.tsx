import image from "../assets/product/register.jpg";

const Card: React.FC = () => {
    return(
        <div className="">
            <div className="flex bg-[#FFFDFD] border border-gray-200 px-5 py-2">
                <div className="flex justify-between w-full">
                    <p className="font-medium">Owner</p>
                    <p className="font-bold">IDR. 599,000</p>
                </div>
            </div>
            
            <div className="flex bg-[#FFFDFD] border border-gray-200 px-5 py-2">
                <div className="flex w-full py-3">
                    <img src={image} width={200} className="mr-10" />

                    <div className="flex flex-col justify-between w-full">
                        <p>Nama Product</p>

                        <p className="font-bold">IDR. 200,000</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;