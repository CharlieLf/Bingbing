import { getBuyerTransactionQuery } from "@/services/transactionService";
import Card from "@components/Card";
import NavbarLayout from "@layouts/NavbarLayout";
import { useEffect, useState } from "react";

const History:React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("bought");
    const { getBuyerTransaction } = getBuyerTransactionQuery();

    async function handleGetTransaction() {
        const result = await getBuyerTransaction([]);
        if (!result || 'err' in result) {
            throw new Error("Failed to get transaction");
        }
        console.log(result);
    }

    useEffect(() => {
        handleGetTransaction();
    }, []);

    return(
        <NavbarLayout>
            <p className="self-start px-20 text-3xl font-medium">History</p>

            <div className="flex flex-col w-full py-5 px-20">
                <div className="flex w-full mb-10">
                    <button onClick={() => {setActiveTab("bought")}} className={`w-full p-5 ${activeTab === "bought" ? "bg-gray-100 font-bold border-b border-black" : ""}`}>Bought</button>
                    <button onClick={() => {setActiveTab("sold")}} className={`w-full p-5 ${activeTab === "sold" ? "bg-gray-100 font-bold border-b border-black" : ""}`}>Sold</button>
                </div>

                { activeTab === "bought" && 
                    <Card/>
                }

                { activeTab === "sold" && 
                    <Card/>
                }
            </div>
        </NavbarLayout>
    )
}

export default History;