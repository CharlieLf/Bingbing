interface CartDetails {
    productId: number;
    quantity: number;
}

interface CartProps {
    owner: string;
    cartDetails: CartDetails[];
}

interface CartDetailData {
    productId: bigint;
    quantity: bigint;
}

interface CartData {
    owner: string;
    products: CartDetailData[]
}

export default class Cart {
    owner: string;
    cartDetails: CartDetails[];

    constructor({ owner, cartDetails }: CartProps) {
        this.owner = owner;
        this.cartDetails = cartDetails;
    };

    static castToCart(u: CartData): Cart {
        return new Cart({
            owner: u.owner,
            cartDetails: u.products.map((p) => {
                return {
                    productId: Number(p.productId),
                    quantity: Number(p.quantity)
                };
            })
        });
    };
}