interface ProductProps {
    id: number;
    name: string;
    price: number;
    image: string;
}    

export default class Product {
    id: number;
    name: string;
    price: number;
    image: string;

    constructor({id, name, price, image}: ProductProps) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }

    formatPrice(): string {
        return `IDR ${this.price.toLocaleString()}`;
    }
}
