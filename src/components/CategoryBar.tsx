import CategoryChoice from './CategoryChoice';

interface Props {
  category: string;
  setCategory: (category: string) => void;
}

const categories = ['All', 'Shirts', 'Pants', 'Shoes', 'Accessories'];

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
