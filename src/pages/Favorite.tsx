import { getFavoriteListQuery } from "@/services/favoriteService";
import { getProductImageQuery } from "@/services/productService";
import ButtonSmall from "@components/ButtonSmall";
import useServiceContext from "@hooks/useServiceContext";
import NavbarLayout from "@layouts/NavbarLayout";
import TypeUtils from "@utils/TypeUtils";
import { useEffect, useState } from "react";

const Favorite: React.FC = () => {
    const { productCanisterId } = useServiceContext();
    const [imageUrls, setImageUrls] = useState<Map<number, string>>(new Map());

    const { getFavoriteList, getFavoriteListLoading } = getFavoriteListQuery();
    const { getProductImage } = getProductImageQuery();

    async function fetchFavoriteList() {
        const result = await getFavoriteList([productCanisterId]);
        if (!result || 'err' in result) {
            return;
        }
        result.ok.map(async (product) => {
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
    }

    useEffect(() => {
        fetchFavoriteList();
    }, [])

    return (
        <NavbarLayout>
            <p className="self-start px-20 text-3xl font-medium">Favorite</p>

            <div className="w-full py-5 px-20">

            </div>
        </NavbarLayout>
    )
}

export default Favorite;