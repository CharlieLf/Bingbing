import { getFavoriteListQuery } from "@/services/favoriteService";
import { getProductImageQuery } from "@/services/productService";
import ButtonSmall from "@components/ButtonSmall";
import ProductInfoCard from "@components/ProductInfoCard";
import useServiceContext from "@hooks/useServiceContext";
import NavbarLayout from "@layouts/NavbarLayout";
import Product from "@models/product";
import TypeUtils from "@utils/TypeUtils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Favorite: React.FC = () => {
    const navigate = useNavigate();

    const { productCanisterId } = useServiceContext();
    const [favoriteList, setFavoriteList] = useState<Product[]>([]);
    const [imageUrls, setImageUrls] = useState<Map<number, string>>(new Map());

    const { getFavoriteList, getFavoriteListLoading } = getFavoriteListQuery();
    const { getProductImage } = getProductImageQuery();

    async function fetchFavoriteList() {
        const result = await getFavoriteList([productCanisterId]);
        if (!result || 'err' in result) {
            return;
        }

        const favoriteList: Product[] = [];

        result.ok.map(async (product) => {
            favoriteList.push(Product.fromProductData(product));
            const result = await getProductImage([product.id]);
            if (!result || 'err' in result) {
                return;
            }
            if (!result || result.length === 0) return;
            setImageUrls(prev => {
                const newMap = new Map(prev);
                newMap.set(Number(product.id), TypeUtils.byteArrayToImageURL(result[0]));
                return newMap;
            })
        });

        setFavoriteList(favoriteList);
    }

    useEffect(() => {
        fetchFavoriteList();
    }, [])

    if (getFavoriteListLoading) {
        return <NavbarLayout>
            <div className="flex justify-center text-2xl font-semibold text-gray-700 animate-pulse mt-10">
                Loading...
            </div>
        </NavbarLayout>
    }

    if (favoriteList.length === 0) {
        return <NavbarLayout>
            <div className="flex justify-center text-2xl font-semibold text-gray-700 mt-10">
                No favorite product
            </div>
        </NavbarLayout>
    }

    return (
        <NavbarLayout>
            <p className="self-start px-20 text-3xl font-medium">Favorite</p>

            <div className="w-full py-5 px-20">
                {favoriteList.map((product, index) => {
                    return (
                        <ProductInfoCard className="h-full shadow-md p-4 rounded-xl"
                            key={index}
                            imageUrl={imageUrls.get(Number(product.id))
                            }>
                            <div className="flex flex-col flex-1 justify-between">
                                <p className="text-xl font-medium">{product.name}</p>
                                <div className="flex justify-between">
                                    <p className="text-lg">IDR: {product.formatPrice()}</p>
                                    <ButtonSmall onclick={() => navigate(`/productDetail/${product.id}`)} text="View Detail" />
                                </div>
                            </div>
                        </ProductInfoCard>
                    )
                })}
            </div>
        </NavbarLayout>
    )
}

export default Favorite;