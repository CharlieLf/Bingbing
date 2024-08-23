const CategoryField: React.FC = () => {
    return(
        <div>
            <div className="space-y-3">
                <div className="space-x-10">
                    <button className="px-10 border-black border">Men</button>
                    <button>Women</button>
                </div>

                <div className="space-x-10">
                    <button>Summer</button>
                    <button>Fall</button>
                    <button>Spring</button>
                    <button>Winter</button>
                </div>

                <div className="space-x-10">
                    <button>Top</button>
                    <button>Bottom</button>
                    <button>Outerwear</button>
                </div>

                <div className="space-x-10">
                    <button>Pants</button>
                    <button>Short</button>
                    <button>Skirt</button>
                </div>
            </div>
        </div>
    )
}

export default CategoryField;