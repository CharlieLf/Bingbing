import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import IconHeart from "@assets/icons/IconHeart";
import NavbarLayout from "@layouts/NavbarLayout";
import { getProductQuery } from "@/services/productService";
import { addOrUpdateCartUpdate } from "@/services/cartService";


const ProductDetail: React.FC = () => {
    const navigate = useNavigate();
    let { id } = useParams();
    const { product, getProduct } = getProductQuery();
    const { addOrUpdateCart } = addOrUpdateCartUpdate()

    async function fetchProductData() {
        if (!id) return;
        await getProduct([BigInt(Number.parseInt(id)), []]);
    }

    async function handleAddOrUpdateCart() {
        if (!product) return;
        const result = await addOrUpdateCart([product.owner, BigInt(product.id), BigInt(1)]);
        if (!result) {
            console.log("Failed to add to cart");
            return;
        }
        if ('err' in result) {
            console.log(result.err);
            return;
        }
        navigate(-1);
    }

    useEffect(() => {
        fetchProductData();
    }, []);

    return (
        <NavbarLayout>
            {product ? (
                <div className="flex w-full px-20 py-10">
                    <div className="w-[40%] h-full">
                        <img src={product?.image} />
                    </div>

                    <div className="flex flex-col justify-between w-full mx-10">
                        <div className="flex flex-col">
                            <div className="self-end w-10 mb-10">
                                <IconHeart />
                            </div>

                            <div className="mb-32">
                                <p className="text-4xl font-bold">{product?.name}</p>
                                <p className="text-2xl">Rp. {product.formatPrice()}</p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <button onClick={handleAddOrUpdateCart}
                                className="w-full bg-black border-black border-2 p-3 text-white text-lg font-bold">ADD TO CART</button>
                            <button onClick={() => navigate(`/tryon/${id}`)}
                                className="w-full bg-white border-black border-2 p-3 text-lg font-bold">TRY ON</button>
                        </div>

                        <p className="italic text-sm">*Colors may appear different due to variations in screen lighting.</p>
                    </div>
                </div>
            ) :
                product === undefined ? (
                    <p>Loading...</p>
                ) :
                    (
                        <p>Product not found</p>
                    )}

        </NavbarLayout>
    )
}

export default ProductDetail;