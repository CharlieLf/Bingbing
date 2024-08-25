import useServiceContext from "@hooks/useServiceContext";
import { useState } from "react";

export function getBalanceQuery() {
    const [balance, setBalance] = useState(0);
    const { useQueryCall: query } = useServiceContext().tokenService;

    const { call: getBalance } = query({
        functionName: "balance",
        args: [],
        refetchOnMount: false,
        onSuccess: (result) => {
            if (!result || 'err' in result) {
                throw new Error("Failed to get balance");
            }
            setBalance(Number(result.ok));
        },
    })
    return { balance, getBalance };
}