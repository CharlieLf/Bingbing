import { useProductQuery } from "@/actors/productActor";
import Product from "@models/product";
import { useState } from "react"

const useProduct = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const { call: getProducts } = useProductQuery({
        functionName: "getProducts",
        onSuccess: (products) => {
            const productInstances = products?.map(p => {
                const blob = new Blob([new Uint8Array(p.image)], { type: 'image/jpeg' });
                return new Product({
                    id: p.id,
                    image: URL.createObjectURL(blob),
                    name: p.name,
                    price: Number(p.price)
                });
            });
            setProducts(productInstances ?? [])
        }
    });
    return { products, getProducts };
}

export default useProduct;