import { CategoryType } from "@models/category";

interface CategoryChoiceProps {
  category: CategoryType;
  setCategory: (category: CategoryType) => void;
}

const CategoryChoice: React.FC<CategoryChoiceProps> = ({
  category,
  setCategory,
}) => {
  function onClick() {
    setCategory(category);
  }
  return (
    <div className="cursor-pointer" onClick={onClick}>
      {category.toUpperCase()}
    </div>
  );
};

export default CategoryChoice;
