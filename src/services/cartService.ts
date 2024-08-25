import useServiceContext from "@hooks/useServiceContext";
import Cart from "@models/cart";
import { useState } from "react";

export function addOrUpdateCartUpdate() {
    const { useUpdateCall: cartUpdate } = useServiceContext().cartService;
    const {call: addOrUpdateCart} = cartUpdate({
        functionName: "addOrUpdateCart",
    })
    return { addOrUpdateCart };
}

export function getSelfCartQuery() {
    const { useQueryCall: cartQuery } = useServiceContext().cartService;

    const [cart, setCart] = useState<Cart[] | null | undefined>()
    const { call: getSelfCart } = cartQuery({
        functionName: "getSelfCart",
        refetchOnMount: false,
        onSuccess: (data) => {
            if(!data || 'err' in data) {
                setCart(null);
                return;
            }
            setCart(data.ok.map((d: any) => Cart.castToCart(d)));
        }
    })
    return { getSelfCart };
}