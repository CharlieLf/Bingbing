import { useTokenQuery } from "@actors/tokenActor";

function getBalance() {
    const { call: getBalance } = useTokenQuery({
        functionName: 'balance'
    })
    return { getBalance }
}

function useToken() {
    return { getBalance }
};

export default useToken;