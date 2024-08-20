import Product from "@models/product";

interface Props {
    product?: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
    return (
        <div className="flex flex-col items-center w-[15vw] h-[45vh] shadow-[0_4px_6px_rgba(0,0,0,0.1)] rounded-2xl">
            <img className="w-full h-[80%] object-cover"
                src={product?.image} alt={product?.name} />
            <div className="w-full p-[5%]">
                <p className="font-bold">{product?.name}</p>
                <p className="text-sm">IDR {product?.price}</p>
            </div>
        </div>
    );
}

export default ProductCard;