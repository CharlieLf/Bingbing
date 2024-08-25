import Product from '@models/product';
import { Link } from 'react-router-dom';

interface Props {
    product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
    return (
        <div className="flex h-[45vh] w-[15vw] flex-col items-center overflow-hidden rounded-2xl shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
            <div className="flex-1 w-full">
                <Link to={`/productDetail/${product.id}`}>
                    <img
                        className="h-full w-full object-cover cursor-pointer"
                        src={product?.image}
                        alt={product?.name}
                    />
                </Link>
            </div>
            <div className="flex flex-col justify-evenly p-[5%] w-full">
                <p className="font-bold">{product?.name}</p>
                <p className="text-sm">IDR {product?.formatPrice()}</p>
            </div>
        </div>
    );
};


export default ProductCard;
