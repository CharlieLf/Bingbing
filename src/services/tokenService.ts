import useServiceContext from "@hooks/useServiceContext";
import { useState } from "react";

export function getBalanceQuery() {
    const [balance, setBalance] = useState(0);
    const { useQueryCall: balanceQuery } = useServiceContext().tokenService;

    const { call: getBalance } = balanceQuery({
        functionName: "balance",
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

export function mintUpdate() {
    const { useUpdateCall: balanceUpdate } = useServiceContext().tokenService;
    const { call: mint } = balanceUpdate({
        functionName: "mint"
    })
    return { mint };
}