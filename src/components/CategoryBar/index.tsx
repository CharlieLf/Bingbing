import '../../output.css'

const categories = [
    'All',
    'Tops',
    'Bottoms',
    'Outerwear',
    'Men',
    'Women',
    'Accessories'
]

interface Props {
    setSelectedCategory: (category: string) => void
}

interface CategoryChoiceProps {
    category: string,
    setSelectedCategory: (category: string) => void
}

const CategoryChoice: React.FC<CategoryChoiceProps> = ({ category, setSelectedCategory }) => {
    function onClick() {
        setSelectedCategory(category)
    }
    return (
        <div className="cursor-pointer"
            onClick={onClick}>
            {category.toUpperCase()}
        </div>
    )
}

const CategoryBar: React.FC<Props> = ({ setSelectedCategory }) => {
    return (
        <div className="w-screen flex p-[10px_15%] justify-evenly align-middle">
            {categories.map((category, idx) => {
                return <CategoryChoice category={category} key={idx} setSelectedCategory={setSelectedCategory} />
            })}
        </div>
    )
}

export default CategoryBar;