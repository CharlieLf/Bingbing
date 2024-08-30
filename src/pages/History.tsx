import { getProductImageQuery } from "@/services/productService";
import { getBuyerHistoryQuery } from "@/services/transactionService";
import Card from "@components/Card";
import HistoryCard from "@components/HistoryCard";
import NavbarLayout from "@layouts/NavbarLayout";
import TypeUtils from "@utils/TypeUtils";
import { useEffect, useState } from "react";

const History: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("bought");
    const [sellerImageUrls, setSellerImageUrls] = useState<Map<number, string>>(new Map());
    const [buyerImageUrls, setBuyerImageUrls] = useState<Map<number, string>>(new Map());

    const { buyerHistory, getBuyerHistory, getBuyerHistoryLoading } = getBuyerHistoryQuery();
    const { getProductImage } = getProductImageQuery();

    async function handleGetBuyerTransaction() {
        await getBuyerHistory([]);
    }

    useEffect(() => {
        handleGetBuyerTransaction();
    }, []);

    useEffect(() => {
        if (buyerHistory.length === 0) return;
        buyerHistory.map(async (history) => {
            history.details.map(async (detail) => {
                detail.items.map(async (item) => {
                    const result = await getProductImage([BigInt(item.product.id)]);
                    if (!result || 'err' in result) {
                        return;
                    }
                    if (!result || result.length === 0) return;
                    setBuyerImageUrls(prev => {
                        const newMap = new Map(prev);
                        newMap.set(Number(item.product.id), TypeUtils.byteArrayToImageURL(result[0]));
                        return newMap;
                    })
                })
            }
            )
        })
    }, [buyerHistory])

    if (getBuyerHistoryLoading) {
        return (
            <NavbarLayout>
                <div className="flex justify-center text-2xl font-semibold text-gray-700 animate-pulse mt-10">
                    Loading...
                </div>
            </NavbarLayout>
        )
    }

    return (
        <NavbarLayout>
            <p className="self-start px-20 text-3xl font-medium">History</p>

            <div className="flex flex-col w-full py-5 px-20">
                <div className="flex w-full mb-10">
                    <button onClick={() => { setActiveTab("bought") }} className={`w-full p-5 ${activeTab === "bought" ? "bg-gray-100 font-bold border-b border-black" : ""}`}>Bought</button>
                    <button onClick={() => { setActiveTab("sold") }} className={`w-full p-5 ${activeTab === "sold" ? "bg-gray-100 font-bold border-b border-black" : ""}`}>Sold</button>
                </div>

                {activeTab === "bought" && buyerHistory.map((h, index) => {
                    const totalPrice = h.details.reduce((acc, detail) => {
                        return acc + detail.items.reduce((acc, item) => {
                            return acc + item.product.price * item.quantity;
                        }, 0);
                    }, 0)
                    return (
                        <div className="shadow-lg p-4 rounded-2xl border border-gray-200 mb-6" key={index}>
                            <div className="flex justify-between flex-1">
                                <p className="text-xl font-semibold mb-2">Transaction - {h.id}</p>
                                <p>{h.date.toLocaleDateString()}</p>
                            </div>
                            {h.details.map((d, index) => {
                                const subtotal = d.items.reduce((acc, item) => {
                                    return acc + item.product.price * item.quantity;
                                }, 0);
                                return (
                                    <div className="flex flex-col h-15vh gap-4 bg-[#FFFDFD] border border-gray-200  px-5 py-2"
                                        key={index}>
                                        <div className="w-full flex justify-between">
                                            <p>{d.seller}</p>
                                            <p className="font-semibold">IDR {subtotal.toLocaleString()}</p>
                                        </div>
                                        <HistoryCard transactionDetails={d.items} imageUrls={buyerImageUrls} key={index} />
                                    </div>
                                )
                            })}
                            <p className="pt-2 w-full text-right text-lg font-bold">IDR {totalPrice.toLocaleString()}</p>
                        </div>
                    )
                })
                }

                {/* { activeTab === "sold" && 
                    <Card/>
                } */}
            </div>
        </NavbarLayout>
    )
}

export default History;