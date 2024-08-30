import useServiceContext from "@hooks/useServiceContext";
import { BuyerHistory, SellerHistory } from "@models/history";
import { useState } from "react";

export function createTransactionUpdate() {
    const { useUpdateCall: transactionUpdate } = useServiceContext().transactionService;
    const { call: createTransaction, loading: createTransactionLoading } = transactionUpdate({
        functionName: 'createTransaction'
    });
    return { createTransaction, createTransactionLoading };
};

export function getBuyerHistoryQuery() {
    const [buyerHistory, setBuyerHistory] = useState<BuyerHistory[]>([]);
    const { useQueryCall: buyerHistoryQuery } = useServiceContext().transactionService;
    const { call: getBuyerHistory, loading: getBuyerHistoryLoading } = buyerHistoryQuery({
        functionName: 'getBuyerHistory',
        onSuccess: (result) => {
            if (!result || 'err' in result) {
                throw new Error("Failed to get buyer history");
            }
            setBuyerHistory(result.map(history => new BuyerHistory(history)));
        },
        refetchOnMount: false,
    });

    return { buyerHistory, getBuyerHistory, getBuyerHistoryLoading };
};

export function getSellerHistoryQuery() {
    const [sellerHistory, setSellerHistory] = useState<SellerHistory[]>([]);
    const { useQueryCall: sellerHistoryQuery } = useServiceContext().transactionService;
    const { call: getSellerHistory, loading: getSellerHistoryLoading } = sellerHistoryQuery({
        functionName: 'getSellerHistory',
        onSuccess: (result) => {
            if (!result || 'err' in result) {
                throw new Error("Failed to get seller history");
            }
            setSellerHistory(result.map(history => new SellerHistory(history)));
        },
        refetchOnMount: false,
    });

    return { sellerHistory, getSellerHistory, getSellerHistoryLoading };
};