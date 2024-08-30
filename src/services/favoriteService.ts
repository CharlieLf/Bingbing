import useServiceContext from "@hooks/useServiceContext";

export function addToFavoriteUpdate() {
    const { useUpdateCall: favoriteUpdate } = useServiceContext().favoriteService;
    const { call: addToFavorite, loading: addFavoriteLoading } = favoriteUpdate({
        functionName: "addFavorite",
    })

    return { addToFavorite, addFavoriteLoading }
}

export function getFavoriteListQuery() {
    const { useQueryCall: favoriteQuery } = useServiceContext().favoriteService;
    const { call: getFavoriteList, loading: getFavoriteListLoading } = favoriteQuery({
        functionName: "getFavoriteList",
        refetchOnMount: false,
    })
    return { getFavoriteList, getFavoriteListLoading }
}