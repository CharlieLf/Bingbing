import React, { useState } from 'react';
import CategoryBar from '../components/CategoryBar';

const withCategorybar = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return (props: P) => {
    const [selectedCategory, setSelectedCategory] = useState('All')

    return (
      <div>
        <CategoryBar setSelectedCategory={setSelectedCategory} />
        <WrappedComponent {...props} selectedCategory={selectedCategory} />
      </div>
    );
  };
};

export default withCategorybar;