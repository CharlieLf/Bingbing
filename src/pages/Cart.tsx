import { getSelfCartQuery } from "@/services/cartService";
import ShopCard from "@components/ShopCard";
import NavbarLayout from "@layouts/NavbarLayout";
import { useEffect, useState } from "react";

const Carts: React.FC = () => {
    const { carts, getSelfCart } = getSelfCartQuery();
    const [cartCount, setCartCount] = useState<Map<number, number>>(new Map());

    async function fetchCartData() {
        await getSelfCart();
    }

    function updateCartCount(productId: number, quantity: number) {
        setCartCount(new Map(cartCount.set(productId, quantity)));
    }

    useEffect(() => {
        console.log(carts);

        carts?.forEach(cart => {
            cart.cartDetails.forEach(cartDetail => {
                cartCount.set(cartDetail.productId, cartDetail.quantity);
            })
        })
    }, [carts])

    useEffect(() => {
        console.log(cartCount);

    }, [cartCount])

    useEffect(() => {
        fetchCartData();
    }, [])

    return (
        <NavbarLayout>
            <p className="self-start px-20 text-3xl font-medium">Cart</p>

            <div className="flex w-full justify-between py-5 px-20">
                <div className="flex flex-col w-[60%] mr-10 gap-8">
                    {carts?.map((cart, idx) => {
                        return <ShopCard checkbox={true}
                            cart={cart} key={idx}
                            cartCount={cartCount}
                            updateCartCount={updateCartCount} />
                    })}
                </div>

                <div className="bg-[#FFFDFD] w-[50%] h-fit p-5 border-gray-200 border">
                    <p className="mb-5 font-bold text-2xl">Order Summary</p>

                    <div className="flex justify-between mb-3">
                        <p className="text-xl">Total</p>
                        <p className="text-xl font-bold">999,000</p>
                    </div>

                    <hr className="border-black mb-5" />

                    <button className="w-full p-3 bg-black text-white font-bold rounded">Check Out</button>
                </div>
            </div>
        </NavbarLayout>
    )
}

export default Carts;