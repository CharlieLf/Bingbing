import { TransactionInput } from "@models/transaction";

interface Props {
    transaction: TransactionInput;
    imageUrls: Map<number, string>;
}

const Card: React.FC<Props> = ({ transaction, imageUrls }) => {
    const subTotal = transaction.items.reduce((acc, curr) => {
        return acc + curr.product.price * Number(curr.quantity);
    }, 0);

    return (
        <div className="">
            <div className="flex bg-[#FFFDFD] border border-gray-200 px-5 py-2">
                <div className="flex justify-between w-full">
                    <p className="font-medium">{transaction.ownerName}</p>
                    <p className="font-bold">IDR. {subTotal.toLocaleString()}</p>
                </div>
            </div>

            {transaction.items.map((item, index) => {
                const product = item.product;
                return <div className="flex bg-[#FFFDFD] border border-gray-200 px-5 py-2">
                    <div className="flex w-full py-3">
                        <img src={imageUrls.get(product.id)}
                            width={200}
                            className="mr-10"
                        />

                        <div className="flex flex-col justify-between w-full">
                            <p>{product.name}</p>

                            <p className="font-bold">IDR. {product.price.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            })}


        </div>
    )
}

export default Card;