import Cart from "@models/cart";
import image from "../assets/product/register.jpg";
import InputNumber from "./InputNumber";
import { useEffect, useState } from "react";

interface Props {
    checkbox?: boolean;
    cart: Cart;
    cartCount: Map<number, number>;
    updateCartCount: (productId: number, quantity: number) => void;
    selectedCart: Map<number, boolean>;
    updateSelectedCart: (productId: number, selected: boolean) => void;
}

const ShopCard: React.FC<Props> = ({ checkbox = false, cart, updateCartCount, cartCount, selectedCart, updateSelectedCart }) => {
    const totalPrice = cart.cartDetails.reduce((acc, curr) => {
        return acc + curr.quantity * 100;
    }, 0);

    const [isSelectedAll, setIsSelectedAll] = useState(
        cart.cartDetails.every(cd => selectedCart.get(cd.productId))
    );

    function handleToggleAllCart(e: React.ChangeEvent<HTMLInputElement>) {
        cart.cartDetails.forEach(cartDetail => {
            updateSelectedCart(cartDetail.productId, e.target.checked);
        });
        setIsSelectedAll(e.target.checked);
    }

    useEffect(() => {
        const allSelected = cart.cartDetails.every(
            (cd) => selectedCart.get(cd.productId) === true
        );
        setIsSelectedAll(allSelected);
    }, [selectedCart, cart.cartDetails]);

    return (
        <div className="">
            <div className="flex bg-[#FFFDFD] border border-gray-200 px-5 py-2">
                {checkbox &&
                    <input onChange={handleToggleAllCart} checked={isSelectedAll} type="checkbox" className="mr-3" />
                }
                <div className="flex justify-between w-full">
                    <p className="font-medium">{cart.owner}</p>
                    <p className="font-bold">IDR. {totalPrice}</p>
                </div>
            </div>

            {cart.cartDetails.map((cd, idx) => {
                const isCurrSelected = selectedCart.get(cd.productId) || false;

                function handleToggleCart(e: React.ChangeEvent<HTMLInputElement>) {
                    updateSelectedCart(cd.productId, e.target.checked)
                };

                function updateCartQuantity(value: number) {
                    if (value <= 0) return;
                    updateCartCount(cd.productId, value);
                }

                return (
                    <div className="flex bg-[#FFFDFD] border border-gray-200 px-5 py-2" key={idx}>
                        {checkbox &&
                            <input
                                checked={isCurrSelected}
                                onChange={handleToggleCart}
                                type="checkbox"
                                className="mr-3"
                            />
                        }

                        <div className="flex w-full py-3">
                            <img src={image} width={200} className="mr-10" />

                            <div className="flex flex-col justify-between w-full">
                                <p>{cd.productId}</p>

                                <div className="flex flex-row justify-between">
                                    <p className="font-bold">IDR. 200,000</p>
                                    <InputNumber
                                        quantity={cartCount.get(cd.productId) || 0}
                                        updateCartQuantity={updateCartQuantity}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ShopCard;
