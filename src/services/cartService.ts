import useServiceContext from "@hooks/useServiceContext";
import Cart from "@models/cart";
import { useState } from "react";

export function addOrUpdateCartUpdate() {
    const { useUpdateCall: cartUpdate } = useServiceContext().cartService;
    const { call: addOrUpdateCart } = cartUpdate({
        functionName: "addOrUpdateCart",
    })
    return { addOrUpdateCart };
}

export function getSelfCartQuery() {
    const { useQueryCall: cartQuery } = useServiceContext().cartService;

    const [carts, setCart] = useState<Cart[] | null | undefined>()
    const { call: getSelfCart } = cartQuery({
        functionName: "getSelfCart",
        refetchOnMount: false,
        onSuccess: (data) => {
            if (!data || 'err' in data) {
                setCart(null);
                return;
            }
            console.log(data);
            
            // data.ok.map(c => Cart.castToCart(c));
            
        }
    })
    return { carts, getSelfCart };
}