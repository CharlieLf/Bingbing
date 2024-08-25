interface CartProps {
    owner: string;
    productId: number;
}

interface CartData {
    owner: string;
    productId: BigInt;
}

export default class Cart {
    owner: string;
    productId: number;

    constructor({ owner, productId}: CartProps) {
        this.owner = owner;
        this.productId = productId;
    };

    static castToCart(u: CartData): Cart {
        return new Cart({
            owner: u.owner,
            productId: Number(u.productId),
        });
    };
}