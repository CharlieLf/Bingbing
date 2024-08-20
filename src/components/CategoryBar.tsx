import CategoryChoice from "./CategoryChoice"

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
    category: string,
    setCategory: (category: string) => void
}

const CategoryBar: React.FC<Props> = ({ category, setCategory }) => {
    return (
        <div className="w-screen flex p-[10px_15%] justify-evenly align-middle">
            {categories.map((category, idx) => {
                return <CategoryChoice category={category} key={idx} setCategory={setCategory} />
            })}
        </div>
    )
}

export default CategoryBar;