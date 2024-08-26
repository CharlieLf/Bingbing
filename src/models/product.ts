import TypeUtils from "@utils/TypeUtils";

interface ProductProps {
    id: number;
    name: string;
    price: number;
    stock: number;
    image: string;
    owner: string;
}

interface ProductData {
    id: bigint;
    name: string;
    image: number[] | Uint8Array;
    stock: bigint;
    price: bigint;
    owner: string;
}

export default class Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    image: string;
    owner: string;

    constructor({ id, name, price, stock, image, owner }: ProductProps) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.image = image;
        this.owner = owner;
    }

    formatPrice(): string {
        return `IDR ${this.price.toLocaleString()}`;
    }

    static castToProduct(p: ProductData): Product {
        return new Product({
            id: Number(p.id),
            name: p.name,
            image: TypeUtils.byteArrayToImageURL(p.image),
            stock: Number(p.stock),
            price: Number(p.price),
            owner: p.owner,
        });
    }
}
