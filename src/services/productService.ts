import useServiceContext from "@hooks/useServiceContext";
import Product from "@models/product";
import { useState } from "react";

export function createProductUpdate(name: string, price: bigint, stock: bigint, description: string, image: Uint8Array | number[]) {
    const { useQueryCall: productUpdate } = useServiceContext().productService;

    const { call: createProduct } = productUpdate({
        functionName: "createProduct",
        args: [name, price, stock, description, image]
    });
    return { createProduct };
};

export function getAllProductsQuery() {
    const { productService } = useServiceContext();
    const { useQueryCall } = productService;

    const [products, setProducts] = useState<Product[]>([]);
    const { call: getAllProducts } = useQueryCall({
        functionName: "getAllProducts",
        onSuccess: (productData) => setProducts(productData?.map(Product.castToProduct) ?? []),
        refetchOnMount: false
    });
    return { products, getAllProducts };
}