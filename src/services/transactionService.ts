import useServiceContext from "@hooks/useServiceContext";

export function createTransactionUpdate() {
    const { useUpdateCall: transactionUpdate } = useServiceContext().transactionService;
    const { call: createTransaction, loading: createTransactionLoading } = transactionUpdate({
        functionName: 'createTransaction'
    });
    return { createTransaction, createTransactionLoading };
};

export function getBuyerTransactionQuery() {
    const { useQueryCall: transactionQuery } = useServiceContext().transactionService;
    const { call: getBuyerTransaction } = transactionQuery({
        functionName: 'getBuyerTransaction',
        refetchOnMount: false
    })
    return { getBuyerTransaction };
};
