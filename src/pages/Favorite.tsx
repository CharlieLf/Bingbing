import { getFavoriteListQuery } from "@/services/favoriteService";
import ButtonSmall from "@components/ButtonSmall";
import useServiceContext from "@hooks/useServiceContext";
import NavbarLayout from "@layouts/NavbarLayout";
import { useEffect } from "react";

const Favorite: React.FC = () => {
    const { productCanisterId } = useServiceContext();
    const { getFavoriteList, getFavoriteListLoading } = getFavoriteListQuery();

    async function fetchFavoriteList() {
        const result = await getFavoriteList([productCanisterId]);
        if(!result || 'err' in result) {
            return;
        }
        console.log(result.ok);
    }

    useEffect(() => {
        fetchFavoriteList();
    }, [])

    return (
        <NavbarLayout>
            <p className="self-start px-20 text-3xl font-medium">Favorite</p>

            <div className="w-full py-5 px-20">
                {/* <Card/> */}
            </div>
        </NavbarLayout>
    )
}

export default Favorite;