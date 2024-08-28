import Product, { ProductData } from "./product";

interface CartDetails {
    product: Product;
    quantity: number;
}

interface CartProps {
    owner: string;
    products: CartDetails[];
}

interface CartDetailData {
    productData: ProductData;
    quantity: bigint;
}

interface CartData {
    owner: string;
    products: CartDetailData[]
}

export default class Cart {
    owner: string;
    cartDetails: CartDetails[];

    constructor({ owner, products }: CartProps) {
        this.owner = owner;
        this.cartDetails = products;
    };

    static castToCart(u: CartData): Cart {
        return new Cart({
            owner: u.owner,
            products: u.products.map(p => {
                return {
                    product: Product.fromProductData(p.productData),
                    quantity: Number(p.quantity)
                };
            })
        });
    };
}