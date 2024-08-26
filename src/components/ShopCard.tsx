import Cart from "@models/cart";
import image from "../assets/product/register.jpg";
import InputNumber from "./InputNumber";

interface Props {
    children?: React.ReactNode;
    checkbox?: boolean;
    cart: Cart;
    cartCount: Map<number, number>;
    updateCartCount: (productId: number, quantity: number) => void;
}

const ShopCard: React.FC<Props> = ({ children, checkbox = false, cart, updateCartCount, cartCount }) => {

    const totalPrice = cart.cartDetails.reduce((acc, curr) => {
        return acc + curr.quantity * 100;
    }, 0);

    return (
        <div className="">
            <div className="flex bg-[#FFFDFD] border border-gray-200 px-5 py-2">
                {checkbox &&
                    <input type="checkbox" className="mr-3" />
                }
                <div className="flex justify-between w-full">
                    <p className="font-medium">{cart.owner}</p>
                    <p className="font-bold">IDR. {totalPrice}</p>
                </div>
            </div>

            {cart.cartDetails.map((cartDetail, idx) => {
                function updateValue(value: number) {
                    updateCartCount(cartDetail.productId, value);
                }
                return <div className="flex bg-[#FFFDFD] border border-gray-200 px-5 py-2" key={idx}>
                    {checkbox &&
                        <input type="checkbox" className="mr-3" />
                    }

                    <div className="flex w-full py-3">
                        <img src={image} width={200} className="mr-10" />

                        <div className="flex flex-col justify-between w-full">
                            <p>{cartDetail.productId}</p>

                            <div className="flex flex-row justify-between">
                                <p className="font-bold">IDR. 200,000</p>
                                <InputNumber value={cartCount.get(cartDetail.productId)!} updateValue={updateValue} />
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </div>
    )
}

export default ShopCard;