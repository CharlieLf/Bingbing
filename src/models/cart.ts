import Product, { ProductData } from "./product";

interface CartDetails {
    product: Product | null;
    quantity: number;
}

interface CartProps {
    owner: string;
    products: CartDetails[];
}

interface CartDetailData {
    product: [ProductData] | [];
    quantity: bigint;
}

interface CartData {
    owner: string;
    products: CartDetailData[];
}

export default class Cart {
    owner: string;
    cartDetails: CartDetails[];

    constructor({ owner, products }: CartProps) {
        this.owner = owner;
        this.cartDetails = products;
    };

    static fromCartData(u: CartData): Cart {
        return new Cart({
            owner: u.owner,
            products: u.products.map(p => {
                if (p.product) {
                    return {
                        product: p.product.length === 0 ? null : Product.fromProductData(p.product[0]),
                        quantity: Number(p.quantity)
                    } as CartDetails;
                }
                return {
                    product: null,
                    quantity: Number(p.quantity)
                } as CartDetails;
            })
        });
    };
}