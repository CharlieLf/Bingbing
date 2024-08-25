import useServiceContext from "@hooks/useServiceContext";
import Product from "@models/product";
import { useState } from "react";

export function getAllProductsQuery() {
    const { useQueryCall: productQuery } = useServiceContext().productService;

    const [products, setProducts] = useState<Product[]>([]);
    const { call: getAllProducts } = productQuery({
        functionName: "getAllProducts",
        onSuccess: (productData) => setProducts(productData?.map(Product.castToProduct) ?? []),
        refetchOnMount: false
    });
    return { products, getAllProducts };
}

export function getProductQuery(productId: number) {
    const { useQueryCall: productQuery } = useServiceContext().productService;
    const [product, setProduct] = useState<Product | undefined | null>(null);
    const { call: getProduct } = productQuery({
        functionName: "getProduct",
        args: [BigInt(productId)],
        onSuccess: (productData) => {
            if (productData && productData.length === 1) {
                setProduct(Product.castToProduct(productData[0]));
            }
        },
        refetchOnMount: false
    });

    return { product, getProduct };
}

export function getProductsByOwnerQuery(owner: string) {
    const { useQueryCall: productQuery } = useServiceContext().productService;
    const [products, setProducts] = useState<Product[]>([]);
    const { call: getProductsByOwner } = productQuery({
        functionName: "getProductsByOwner",
        args: [owner],
        onSuccess: (productData) => setProducts(productData?.map(Product.castToProduct) ?? []),
        refetchOnMount: false
    });

    return { products, getProductsByOwner };
}

export function createProductUpdate(name: string, price: number, stock: number, image: Uint8Array, gender: string, season: string, clothingType: string, clothing: string = "") {
    const { useUpdateCall: productUpdate } = useServiceContext().productService;
    const { call: createProduct } = productUpdate({
        functionName: "createProduct",
        args: [name, BigInt(price), BigInt(stock), image, gender, season, clothingType, clothing!],
    })

    return { createProduct };
}

export function editProductUpdate(id: number, name: string, price: number, stock: number, image: Uint8Array, gender: string, season: string, clothingType: string, clothing: string = "") {
    const { useUpdateCall: productUpdate } = useServiceContext().productService;
    const { call: editProduct } = productUpdate({
        functionName: "updateProduct",
        args: [BigInt(id), name, BigInt(price), BigInt(stock), image, gender, season, clothingType, clothing!],
    })

    return { editProduct };
}

export function deleteProductUpdate(id: number) {
    const { useUpdateCall: productUpdate } = useServiceContext().productService;
    const { call: deleteProduct } = productUpdate({
        functionName: "deleteProduct",
        args: [BigInt(id)],
    })

    return { deleteProduct };
}