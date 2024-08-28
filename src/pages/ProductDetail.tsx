import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import IconHeart from "@assets/icons/IconHeart";
import NavbarLayout from "@layouts/NavbarLayout";
import { getProductImageQuery, getProductQuery } from "@/services/productService";
import { addOrUpdateCartUpdate } from "@/services/cartService";
import ImagePlaceholder from "@components/ImagePlaceholder";
import TypeUtils from "@utils/TypeUtils";


const ProductDetail: React.FC = () => {
    const navigate = useNavigate();
    let { id } = useParams();
    const { product, getProduct } = getProductQuery();
    const [productImageUrl, setProductImageUrl] = useState<string | undefined | null>(null);
    const { getProductImage } = getProductImageQuery();
    const { addOrUpdateCart } = addOrUpdateCartUpdate()

    async function fetchProductData() {
        if (!id) return;
        const product = await getProduct([BigInt(Number.parseInt(id)), []]);
        if (!product || 'err' in product) {
            return;
        }
        const image = await getProductImage([BigInt(Number.parseInt(id))]);
        if (!image || image.length === 0) {
            return;
        }
        setProductImageUrl(TypeUtils.byteArrayToImageURL(image[0]));
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
                    <div className="w-[40%]">
                        <ImagePlaceholder imageUrl={productImageUrl} />
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
                <p className="flex justify-center text-2xl font-semibold text-gray-700 animate-pulse mt-10">Loading...</p>
            ) :
            (
                <p>Product not found</p>
            )}
        </NavbarLayout>
    )
}

export default ProductDetail;