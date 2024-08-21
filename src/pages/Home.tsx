import React, { useEffect, useState } from 'react';
import NavbarLayout from '@layouts/NavbarLayout';
import CategoryBar from '@components/CategoryBar';
import ProductCard from '@components/ProductCard';
import Product from '@models/product';
import { CategoryType } from '@models/category';
import { useProductQuery } from '@/actors/product';
import { useBackendQuery, useBackendUpdate } from '@/actors/backend';

const sortOptions = ['From Lowest Price', 'From Highest Price'];

const Home: React.FC = () => {
    const [category, setCategory] = useState<CategoryType>(CategoryType.All);
    const [sort, setSort] = useState<string>(sortOptions[0]);
    const [products, setProducts] = useState<Product[]>([]);

    const { call: getProducts } = useProductQuery({
        functionName: "getProducts",
        onSuccess: (products) => {
            const productInstances = products?.map(p => {
                return new Product({
                    id: p.id,
                    image: p.image,
                    name: p.name,
                    price: Number(p.price)
                });
            });
            setProducts(productInstances ?? [])
        }
    });

    const { data: count, call: getCount } = useBackendQuery({
        functionName: "getCount",
    })

    const { call: add } = useBackendUpdate({
        functionName: "add",
        args: [BigInt(10)],
        onSuccess: getCount
    })

    useEffect(() => {
        getProducts();
        getCount()
    }, [])

    useEffect(() => {
        if (count) {
            console.log(count);
        }
    }, [count])

    return (
        <NavbarLayout>
            <CategoryBar category={category} setCategory={setCategory} />
            <div className="sticky top-24 w-screen mb-8 mt-3 flex items-center justify-end gap-4 px-[2.5%] py-2 bg-white">
                <p>Sort: </p>
                <select
                    className="border border-black p-2 text-xs cursor-pointer"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    {sortOptions.map((option, index) => (
                        <option className="text-xs" key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-5 gap-x-[3.5%] gap-y-8 px-[2.5%] w-full">
                {/* {products.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))} */}
                {products && Array.from({ length: 7 }).map((_, index) => {
                    return <ProductCard key={index} product={products[index % products.length]} />
                })
                }
            </div>
        </NavbarLayout>
    );
};

export default Home;
