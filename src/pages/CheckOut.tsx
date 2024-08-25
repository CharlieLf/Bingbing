import IconWallet from "@assets/icons/IconWallet";
import ShopCard from "@components/ShopCard";
import NavbarLayout from "@layouts/NavbarLayout";

const Checkout:React.FC = () => {
    return(
        <NavbarLayout>
            <p className="self-start px-20 text-3xl font-medium">Order</p>

            <div className="flex w-full py-5 px-20 justify-between">
                <div className="w-full mr-10">
                    <div className="bg-[#FFFDFD] space-y-2 mb-5 px-5 py-2 border-gray-200 border">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">SHIPPING DETAIL</p>
                        </div>

                        <div>
                            <p className="font-bold text-sm">Jop</p>
                            <p className="text-sm">089862480118</p>
                        </div>
                        
                        <div>
                            <p className="text-sm">Jl.ABC Binu Unives</p>
                        </div>
                    </div>

                    <ShopCard checkbox="false">
                        <div></div> {/* Tombol kanan kosong */}
                    </ShopCard>
                </div>

                <div className="bg-[#FFFDFD] w-[50%] h-fit p-5 border-gray-200 border">
                    <p className="mb-5 font-bold text-2xl">Payment Summary</p>

                    <div className="flex justify-between mb-3">
                        <p className="text-lg">Subtotal</p>
                        <p className="text-lg">999,000</p>
                    </div>

                    <div className="flex justify-between mb-2">
                        <p className="text-lg">Shipping Fee</p>
                        <p className="text-lg">10,000</p>
                    </div>

                    <hr className="border-black mb-2"/>

                    <div className="flex justify-between mb-7">
                        <p className="text-lg">Total</p>
                        <p className="text-xl font-bold">10,000</p>
                    </div>

                    <div className="flex bg-white justify-between items-center border border-gray-200 rounded-md p-2 mb-2">
                        <div className="flex items-center">
                            <div className="w-10 h-10">
                                <IconWallet/>
                            </div>
                            <p>BingPay</p>
                        </div>

                        <p className="font-bold">500,000</p>
                    </div>
                    
                    {/* Notes : Kasih validasi wallet ga ckup */}
                    <p className="mb-2 italic text-xs text-red-500">*BingPay balance is not enough</p>

                    <button className="w-full p-3 bg-black text-white font-bold rounded">Check Out</button>
                </div>
            </div>

        </NavbarLayout>
    )
}

export default Checkout;