import useServiceContext from "@hooks/useServiceContext";
import Product from "@models/product";
import { useState } from "react";

export function getAllProductsQuery() {
    const { useQueryCall: productQuery } = useServiceContext().productService;

    const [products, setProducts] = useState<Product[]>([]);
    const { call: getAllProducts, loading: getAllProductsLoading } = productQuery({
        functionName: "getAllProducts",
        onSuccess: (productData) => {
            setProducts(productData?.map(Product.fromProductData) ?? []);
        },
        refetchOnMount: false
    });
    return { products, getAllProducts, getAllProductsLoading };
}

export function getProductQuery() {
    const { useQueryCall: productQuery } = useServiceContext().productService;
    const [product, setProduct] = useState<Product | undefined | null>(null);
    const { call: getProduct } = productQuery({
        functionName: "getProduct",
        onSuccess: (productData) => {
            if (productData && productData.length === 1) {
                setProduct(Product.fromProductData(productData[0]));
            }
        },
        refetchOnMount: false
    });

    return { product, getProduct };
}

export function getProductsByOwnerQuery() {
    const { useQueryCall: productQuery } = useServiceContext().productService;
    const [products, setProducts] = useState<Product[]>([]);
    const { call: getProductsByOwner } = productQuery({
        functionName: "getProductsByOwner",
        onSuccess: (productData) => {
            setProducts(productData?.map(Product.fromProductData) ?? [])
        },
        refetchOnMount: false
    });

    return { products, getProductsByOwner };
}

export function createProductUpdate() {
    const { useUpdateCall: productUpdate } = useServiceContext().productService;
    const { call: createProduct } = productUpdate({
        functionName: "createProduct",
    })

    return { createProduct };
}

export function editProductUpdate() {
    const { useUpdateCall: productUpdate } = useServiceContext().productService;
    const { call: editProduct } = productUpdate({
        functionName: "updateProduct",
    })

    return { editProduct };
}

export function deleteProductUpdate() {
    const { useUpdateCall: productUpdate } = useServiceContext().productService;
    const { call: deleteProduct } = productUpdate({
        functionName: "deleteProduct",
    })

    return { deleteProduct };
}

export function getProductImageQuery() {
    const { useQueryCall: productQuery } = useServiceContext().productService;
    const { call: getProductImage } = productQuery({
        functionName: 'getProductImage'
    })
    return { getProductImage }
}