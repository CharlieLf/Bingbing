import { getSelfCartQuery } from "@/services/cartService";
import ShopCard from "@components/ShopCard";
import useServiceContext from "@hooks/useServiceContext";
import NavbarLayout from "@layouts/NavbarLayout";
import { useEffect, useState } from "react";

interface CartCount {
    [key: number]: number;
}

interface SelectedCartItem {
    [key: number]: boolean;
}

const Carts: React.FC = () => {
    const { productCanisterId } = useServiceContext();
    const { carts, getSelfCart } = getSelfCartQuery();
    const [cartCount, setCartCount] = useState<CartCount>({});
    const [selectedCartItem, setSelectedCartItem] = useState<SelectedCartItem>({});

    async function fetchCartData() {
        await getSelfCart([productCanisterId]);
    }

    function updateCartCount(productId: number, quantity: number) {
        setCartCount(prev => {
            const newCartCount = { ...prev, [productId]: quantity };
            return newCartCount;
        });
    }

    function updateSelectedCartItem(productId: number, selected: boolean) {
        setSelectedCartItem(prev => {
            const newSelectedCartItem = { ...prev, [productId]: selected };
            return newSelectedCartItem
        });
    }

    useEffect(() => {
        const cartCount: CartCount = {};
        // carts?.forEach(cart => {
        //     cart.cartDetails.forEach(cd => {
        //         cartCount[cd.productId] = cd.quantity;
        //     })
        // })
        setCartCount(cartCount);

        const selectedCart: SelectedCartItem = {};
        // carts?.forEach(cart => {
        //     cart.cartDetails.forEach(cd => {
        //         selectedCart[cd.productId] = false;
        //     })
        // })
        setSelectedCartItem(selectedCart);
    }, [carts])

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
                            updateCartCount={updateCartCount}
                            selectedCart={selectedCartItem}
                            updateSelectedCartItem={updateSelectedCartItem}
                        />
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