import { useState } from "react";
import ProductCard from "./ProductCard";
import image from "../assets/product/login.jpg";
import Product from "@models/product";
import { ClothingType, Gender, Season } from "@models/category";
import { product } from "@declarations/product";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const SearchModal:React.FC<Props> = ({ isOpen, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');

    if (!isOpen) return null;

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(searchQuery);
        onClose();
    };

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-1/3 relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-xl">x</button>
                <h2 className="text-xl mb-4">Search</h2>
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for products..."
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />
                </form>

                <div className="grid grid-cols-5 gap-x-[3.5%] gap-y-8 px-[2.5%] w-full">
                    <ProductCard imageUrl={image} product={p}/>
                </div>
            </div>
        </div>
    )
}

export default SearchModal;