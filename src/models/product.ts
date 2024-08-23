
interface ProductProps {
    id: bigint;
    name: string;
    price: bigint;
    image: string;
}

export default class Product {
    id: bigint;
    name: string;
    price: bigint;
    image: string;

    constructor({ id, name, price, image }: ProductProps) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }

    formatPrice(): string {
        return `IDR ${this.price.toLocaleString()}`;
    }
}
