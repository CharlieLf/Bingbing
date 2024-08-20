import React, { useState } from 'react';
import NavbarLayout from '@layouts/NavbarLayout';
import CategoryBar from '@components/CategoryBar';
import ProductCard from '@components/ProductCard';
import Product from '@models/product';

const sortOptions = [
    'From Lowest Price',
    'From Highest Price'
];

const dummy = new Product({
    id: 1,
    name: "Pants",
    price: 1000000,
    image: "https://assets.vogue.com/photos/641b4f46036bf43d1c7c315a/3:4/w_748%2Cc_limit/slide_14.jpg"
})

const Home: React.FC = () => {
    const [category, setCategory] = useState<string>('');
    const [sort, setSort] = useState<string>(sortOptions[0]);
    const [products, setProducts] = useState<Product[]>(Array.from({ length: 10 }).map(() => dummy));

    return (
        <NavbarLayout>
            <CategoryBar category={category} setCategory={setCategory} />
            <div className="flex items-center justify-end gap-4 px-[2.5%] mt-3 mb-8">
                <p>Sort: </p>
                <select className="border-black border text-xs p-2"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}>
                    {sortOptions.map((option, index) => (
                        <option className="text-xs"
                            key={index} value={option}>{option}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex justify-center px-[2.5%] flex-wrap gap-x-[3.5%] gap-y-8">
                {products.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </NavbarLayout>
    );
};

export default Home;
