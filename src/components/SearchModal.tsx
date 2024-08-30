import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import image from "../assets/product/login.jpg";
import Product from "@models/product";
import { getAllProductsQuery, getProductImageQuery } from "@/services/productService";
import TypeUtils from "@utils/TypeUtils";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const SearchModal:React.FC<Props> = ({ isOpen, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [productImageUrls, setProductImageUrls] = useState<Map<number, string>>(new Map());
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const { getProductImage } = getProductImageQuery();
    const { products, getAllProduct, getAllProductsLoading } = getAllProductsQuery();

    if (!isOpen) return null;

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(searchQuery);
        onClose();
    };

    async function fetchProducts() {
        const products = await getAllProduct();
        products?.forEach(async p => {
            const image = await getProductImage([p.id]);
            if (!image || image.length === 0) {
                return;
            };
            setProductImageUrls(prev => {
                const newMap = new Map(prev);
                newMap.set(Number(p.id), TypeUtils.byteArrayToImageURL(image[0]));
                return newMap;
            })
        })
    }

    useEffect(()=>{
        fetchProducts();
    }, [])

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
                    {products.map((p, idx) => (
                        <ProductCard imageUrl={image} product={p} key={idx}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SearchModal;