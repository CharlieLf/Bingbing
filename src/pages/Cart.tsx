import InputNumber from "@components/InputNumber";
import ShopCard from "@components/ShopCard";
import NavbarLayout from "@layouts/NavbarLayout";

const Carts: React.FC = () => {
    return(
        <NavbarLayout>
            <p className="self-start px-20 text-3xl font-medium">Cart</p>

            <div className="flex w-full justify-between py-5 px-20">
                <div className="w-[60%] mr-10">
                    {/* Fetch Per Shop */}
                    <ShopCard>
                        <InputNumber/>
                    </ShopCard>
                </div>

                <div className="w-[50%] h-fit p-5 border-gray-200 border">
                    <p className="mb-5 font-bold text-2xl">Order Summary</p>

                    <div className="flex justify-between mb-3">
                        <p className="text-xl">Total</p>
                        <p className="text-xl font-bold">IDR. 999,000</p>
                    </div>

                    <hr className="border-black mb-5"/>

                    <button className="w-full p-3 bg-black text-white font-bold rounded">Check Out</button>
                </div>
            </div>
        </NavbarLayout>
    )
}

export default Carts;