import { useProductQuery } from "@/actors/productActor";
import Product from "@models/product";
import { useState } from "react";

function createProduct(
    name: string,
    price: bigint,
    stock: bigint,
    description: string,
    image: Uint8Array | number[]
) {
    const { call } = useProductQuery({
        functionName: "createProduct",
        args: [name, price, stock, description, image]
    });
    return { call };
};

function updateProduct(
    id: bigint,
    name: string,
    price: bigint,
    stock: bigint,
    description: string,
    owner: string,
    image: Uint8Array | number[]
) {
    const { call } = useProductQuery({
        functionName: "updateProduct",
        args: [id, name, price, stock, description, owner, image]
    });
    return { call };
};

function deleteProduct(id: bigint) {
    const { call } = useProductQuery({
        functionName: "deleteProduct",
        args: [id]
    });
    return { call };
};

function getAllProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const { call } = useProductQuery({
        functionName: "getAllProducts",
        onSuccess: (productData) => setProducts(productData?.map(Product.castToProduct) ?? []),
    });
    return { products, call };
};

function getProductsByOwner(owner: string) {
    const [products, setProducts] = useState<Product[]>([]);
    const { call } = useProductQuery({
        functionName: "getProductsByOwner",
        args: [owner],
        onSuccess: (productData) => setProducts(productData?.map(Product.castToProduct) ?? []),
    });
    return { products, call };
};

function useProduct() {
    return { createProduct, updateProduct, deleteProduct, getAllProducts, getProductsByOwner };
};

export default useProduct;
