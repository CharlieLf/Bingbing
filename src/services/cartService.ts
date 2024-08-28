import useServiceContext from "@hooks/useServiceContext";
import Cart from "@models/cart";
import { useState } from "react";

export function addOrUpdateCartUpdate() {
    const { useUpdateCall: cartUpdate } = useServiceContext().cartService;
    const { call: addOrUpdateCart, loading: addOrUpdateCartLoading } = cartUpdate({
        functionName: "addOrUpdateCart",
    })
    return { addOrUpdateCart, addOrUpdateCartLoading };
}

export function getSelfCartQuery() {
    const { useQueryCall: cartQuery } = useServiceContext().cartService;

    const [carts, setCart] = useState<Cart[] | undefined | null>()
    const { call: getSelfCart, loading: getSelfCartLoading } = cartQuery({
        functionName: "getSelfCart",
        refetchOnMount: false,
        onSuccess: (data) => {
            if (!data || 'err' in data) {
                setCart(null);
                return;
            }
            const cart = data.ok.map(c => {
                return Cart.fromCartData(c);
            });
            setCart(cart);
        }
    })
    return { carts, getSelfCart, getSelfCartLoading };
}

export function removeCartItemUpdate() {
    const { useQueryCall: cartUpdate } = useServiceContext().cartService;
    const { call: removeCartItem, loading: removeCartItemLoading } = cartUpdate({
        functionName: "removeCartItem",
    });
    return { removeCartItem, removeCartItemLoading };
}