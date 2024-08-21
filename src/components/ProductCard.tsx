import Product from '@models/product';

interface Props {
    product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
    return (
        <div className="flex h-[45vh] w-[15vw] flex-col items-center overflow-hidden rounded-2xl shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
            <img
                className="h-[80%] w-full object-cover"
                src={product?.image}
                alt={product?.name}
            />
            <div className="flex h-full w-full flex-col justify-evenly p-[5%]">
                <p className="font-bold">{product?.name}</p>
                <p className="text-sm">{product?.formatPrice()}</p>
            </div>
        </div>
    );
};

export default ProductCard;
