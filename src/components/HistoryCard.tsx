import { TransactionDetail } from "@models/transaction";

interface Props {
    transactionDetails: TransactionDetail[];
    imageUrls: Map<number, string>;
}

const HistoryCard: React.FC<Props> = ({ transactionDetails, imageUrls }) => {
    return (
        <>
            {transactionDetails.map((detail, idx) => {
                const product = detail.product;
                return <div key={idx}>
                    <div className="flex w-full py-3 gap-8">
                        <div className="size-48">
                            <img src={imageUrls.get(product.id)}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col justify-between w-full">
                            <p>{product.name}</p>
                            <div className="flex w-full justify-between">
                                <p className="font-bold">IDR. {product.price.toLocaleString()}</p>
                                <p>qty: {detail.quantity}</p>
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </>
    )
}

export default HistoryCard;