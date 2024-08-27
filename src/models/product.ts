import TypeUtils from "@utils/TypeUtils";
import { ClothingType, Gender, Season } from "./category";

interface ProductProps {
    id: number;
    name: string;
    price: number;
    stock: number;
    image: string;
    owner: string;
    gender: Gender;
    season: Season;
    clothingType: ClothingType;
    clothing: string;
}

export interface ProductData {
    id: bigint;
    name: string;
    image: number[] | Uint8Array;
    stock: bigint;
    price: bigint;
    owner: string;
    gender: string;
    season: string;
    clothingType: string;
    clothing: string;
}

export default class Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    image: string;
    owner: string;
    gender: Gender;
    season: Season;
    clothingType: ClothingType;
    clothing: string;

    constructor({ id, name, price, stock, image, owner, gender, season, clothingType, clothing }: ProductProps) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.image = image;
        this.owner = owner;
        this.gender = gender;
        this.season = season;
        this.clothingType = clothingType;
        this.clothing = clothing;
    }

    formatPrice(): string {
        return this.price.toLocaleString();
    }

    static castToProduct(p: ProductData): Product {
        return new Product({
            id: Number(p.id),
            name: p.name,
            image: TypeUtils.byteArrayToImageURL(p.image),
            stock: Number(p.stock),
            price: Number(p.price),
            owner: p.owner,
            gender: p.gender as Gender,
            season: p.season as Season,
            clothingType: p.clothingType as ClothingType,
            clothing: p.clothing
        });
    }
}
