import React, { useEffect, useState } from 'react';
import NavbarLayout from '@layouts/NavbarLayout';
import CategoryBar from '@components/CategoryBar';
import ProductCard from '@components/ProductCard';
import Product from '@models/product';
import { CategoryType } from '@models/category';
import { useProductQuery } from '@/actors/product';
import { useBackendQuery } from '@/actors/backend';

const sortOptions = ['From Lowest Price', 'From Highest Price'];

const dummy = new Product({
    id: 1,
    name: 'Pants',
    price: 1000000,
    image: 'https://assets.vogue.com/photos/641b4f46036bf43d1c7c315a/3:4/w_748%2Cc_limit/slide_14.jpg',
});

const Home: React.FC = () => {
    const [category, setCategory] = useState<CategoryType>(CategoryType.All);
    const [sort, setSort] = useState<string>(sortOptions[0]);
    const [products, setProducts] = useState<Product[]>(
        Array.from({ length: 10 }).map(() => dummy),
    );

    const { data: rawProducts, call: getProducts } = useProductQuery({
        functionName: "getProducts",
        onSuccess: (data) => {
            console.log(data);
        }
    });

    const { call: getCount } = useBackendQuery({
        functionName: "getCount",
        onSuccess: (data) => {
            console.log(data);
        }
    })

    useEffect(() => {
        getProducts();
        getCount()
    }, [])

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
            <div className="flex flex-wrap justify-center gap-x-[3.5%] gap-y-8 px-[2.5%]">
                {products.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </NavbarLayout>
    );
};

export default Home;
