import CategoryChoice from './CategoryChoice';
import categories, { CategoryType } from '@models/category';

interface Props {
  category: CategoryType;
  setCategory: (category: CategoryType) => void;
}

const CategoryBar: React.FC<Props> = ({ category, setCategory }) => {
  return (
    <div className="sticky top-12 flex w-[50%] justify-evenly py-[10px] items-center">
      {categories.map((category, idx) => {
        return (
          <CategoryChoice
            category={category}
            key={idx}
            setCategory={setCategory}
          />
        );
      })}
    </div>
  );
};

export default CategoryBar;
