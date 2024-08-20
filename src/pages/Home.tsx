import React from 'react';
import NavbarLayout from '@layouts/NavbarLayout';
import CategoryBar from '@components/CategoryBar';

const Home: React.FC = () => {
    const [category, setCategory] = React.useState<string>('');

    return (
        <NavbarLayout>
            <CategoryBar category={category} setCategory={setCategory} />
            <div className="">
                
            </div>
        </NavbarLayout>
    );
};

export default Home;