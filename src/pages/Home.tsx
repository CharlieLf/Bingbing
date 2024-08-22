import React, { useEffect, useState } from 'react';
import NavbarLayout from '@layouts/NavbarLayout';
import CategoryBar from '@components/CategoryBar';
import ProductCard from '@components/ProductCard';
import { CategoryType } from '@models/category';
import useProduct from '@hooks/useProduct';
import { useTokenQuery } from '@actors/tokenActor';
import { useAuth } from '@ic-reactor/react';

const sortOptions = ['From Lowest Price', 'From Highest Price'];

const Home: React.FC = () => {
    const [category, setCategory] = useState<CategoryType>(CategoryType.All);
    const [sort, setSort] = useState<string>(sortOptions[0]);
    const { products, getProducts } = useProduct();

    const { data: count, call: getBalance } = useTokenQuery({
        functionName: 'balance',
      });

    useEffect(() => {
        getBalance();
        getProducts();
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
            <div className="grid grid-cols-5 gap-x-[3.5%] gap-y-8 px-[2.5%] w-full">
                {products.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </NavbarLayout>
    );
};

export default Home;
