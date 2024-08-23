// import { useProductQuery, useProductUpdate } from "@/actors/productActor";
// import { useAuth } from "@ic-reactor/react";
// import Product from "@models/product";
// import TypeUtils from "@utils/TypeUtils";
// import { useState } from "react"

// const useProduct = () => {
//     const { identity } = useAuth()
//     const [products, setProducts] = useState<Product[]>([]);
//     const { call: getAllProducts } = useProductQuery({
//         functionName: "getAllProducts",
//         onSuccess: (products) => {
//             const temp = products?.map((p) => {
//                 return new Product({
//                     id: p.id,
//                     name: p.name,
//                     image: TypeUtils.byteArrayToImageURL(p.image),
//                     price: p.price,
//                 });
//             })
//             setProducts(temp ?? []);
//         }
//     });
//     function getProductsByOwner() {
//         const [products, setProducts] = useState<Product[]>([]);
//         const { call: getProductsByOwner } = useProductQuery({
//             functionName: "getProductsByOwner",
//             onSuccess: (products) => {
//                 const temp = products?.map((p) => {
//                     return new Product({
//                         id: p.id,
//                         name: p.name,
//                         image: TypeUtils.byteArrayToImageURL(p.image),
//                         price: p.price,
//                     });
//                 })
//                 setProducts(temp ?? []);
//             }
//         })
//         return { products, getProductsByOwner };
//     }
//     return { products, getAllProducts, getProductsByOwner };
// }

// export default useProduct;