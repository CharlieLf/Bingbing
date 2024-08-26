import useServiceContext from "@hooks/useServiceContext";

export function createTransactionUpdate() {
    const { useUpdateCall: transactionUpdate } = useServiceContext().transactionService;
    const { call: createTransaction } = transactionUpdate({
        functionName: 'createTransaction'
    });
    return { createTransaction };
};

export function getBuyerTransactionQuery() {
    const { useQueryCall: transactionQuery } = useServiceContext().transactionService;
    const { call: getTransaction } = transactionQuery({
        functionName: 'getBuyerTransaction'
    })
    return { getTransaction };
};