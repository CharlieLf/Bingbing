import React, { useEffect, useState } from 'react';
import NavbarLayout from '@layouts/NavbarLayout';
import CategoryBar from '@components/CategoryBar';
import { getAllProductsQuery } from '@/services/productService';
import ProductCard from '@components/ProductCard';

const sortOptions = ['From Lowest Price', 'From Highest Price'];

const Home: React.FC = () => {
    const [sort, setSort] = useState<string>(sortOptions[0]);
    const [category, setCategory] = useState<string>('All');
    const { products, getAllProducts, getAllProductsLoading } = getAllProductsQuery();
    
    useEffect(() => {
        getAllProducts();
    }, [category]);
    
    if(getAllProductsLoading){
        return <div className="flex justify-center text-2xl font-semibold text-gray-700 animate-pulse mt-10">Loading...</div>
    }

    return (
        <NavbarLayout>
            <CategoryBar category={category} setCategory={setCategory}/>
            <div className="sticky top-32 w-screen mb-8 mt-3 flex items-center justify-end gap-4 px-[2.5%] py-2 bg-white">
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
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </NavbarLayout>
    );
};

export default Home;
