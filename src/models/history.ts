import Product, { ProductData } from "./product";
import { TransactionDetail } from "./transaction";

interface ItemDetailData {
    product: ProductData[];
    quantity: BigInt;
}

interface SellerHistoryData {
    items: ItemDetailData[];
    date: BigInt;
    buyer: string;
}

interface SellerData {
    seller: string;
    items: ItemDetailData[];
}

interface BuyerHistoryData {
    id: BigInt;
    details: SellerData[];
    date: BigInt;
    buyer: string;
}

export class SellerHistory {
    items: TransactionDetail[];
    date: Date;
    buyer: string;

    constructor({ items, date, buyer }: SellerHistoryData) {
        this.items = items.map((item) => {
            return {
                product: Product.fromProductData(item.product[0]),
                quantity: Number(item.quantity)
            };
        });
        this.date = new Date(Number(date));
        this.buyer = buyer;
    }
}

interface SellerDetails {
    seller: string;
    items: TransactionDetail[];
}

export class BuyerHistory {
    id: number;
    details: SellerDetails[];
    date: Date;
    buyer: string;

    constructor({ id, details, date, buyer }: BuyerHistoryData) {
        this.id = Number(id);
        this.details = details.map((detail) => {
            return {
                seller: detail.seller,
                items: detail.items.map((item) => {
                    return {
                        product: Product.fromProductData(item.product[0]),
                        quantity: Number(item.quantity)
                    };
                })
            };
        });
        this.date = new Date(Number(date) / 1_000_000);
        this.buyer = buyer;
    }
}