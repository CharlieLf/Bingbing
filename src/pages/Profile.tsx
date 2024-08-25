import { deleteProductUpdate, getProductsByOwnerQuery } from "@/services/productService";
import IconPerson from "@assets/icons/IconPerson";
import IconWallet from "@assets/icons/IconWallet";
import ButtonSmall from "@components/ButtonSmall";
import DeleteProductModal from "@components/DeleteProductModal";
import ProfileProductCard from "@components/ProfileProductCard";
import useAuthContext from "@hooks/useAuthContext";
import { useAuth } from "@ic-reactor/react";
import NavbarLayout from "@layouts/NavbarLayout"
import Product from "@models/product";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Profile: React.FC = () => {
    const { principal } = useParams();
    const { identity } = useAuth();
    const { user, balance, logout } = useAuthContext();

    const { products, getProductsByOwner } = getProductsByOwnerQuery();
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
    const { deleteProduct } = deleteProductUpdate();

    async function fetchProductsByOwner() {
        await getProductsByOwner([principal ?? '']);
    }

    async function handleDeleteProduct() {
        const result = await deleteProduct([BigInt(selectedProduct?.id ?? 0)]);
        if (!result) {
            console.log("Failed to delete product");
            return
        }
        if ('err' in result) {
            console.log(result.err);
            return
        }
        if (result) {
            await fetchProductsByOwner();
            setSelectedProduct(undefined);
        } else {
            console.error("Failed to delete product");
        }
    }

    useEffect(() => {
        if (principal) {
            fetchProductsByOwner();
        }
    }, [])

    if (principal === identity?.getPrincipal().toText()) {
        return (
            <NavbarLayout>
                {selectedProduct && <DeleteProductModal onClose={() => setSelectedProduct(undefined)} product={selectedProduct} handleDeleteProduct={handleDeleteProduct} />}
                <div className="w-screen px-[2.5%] py-2">
                    <div className="flex justify-between items-center gap-5">
                        <div className="flex gap-10">
                            <div className="size-32 rounded-full border border-gray-400 overflow-hidden flex items-end justify-center">
                                {user?.image ? <img className="w-full h-full object-cover" src={user?.image} /> : <IconPerson width="80%" height="80%" />}
                            </div>
                            <div>
                                <p className="text-[32px] font-semibold">{user?.name}</p>
                                <div className="flex gap-5 items-center">
                                    <div className="h-8"><IconWallet /></div>
                                    <p>BingPay: {balance}</p>
                                    <ButtonSmall variant="secondary" text="Top up" />
                                </div>
                            </div>
                        </div>
                        <div className="flex h-full gap-10">
                            <Link to="/editProfile">
                                <ButtonSmall text="Edit Profile" />
                            </Link>
                            <Link to="/addProduct">
                                <ButtonSmall text="Add Product" />
                            </Link>
                            <ButtonSmall onclick={logout} text="Logout" variant="secondary" />
                        </div>
                    </div>
                    <div className="w-full mt-5 flex flex-col">
                        <p className="w-full text-[24px] border-b border-gray-400 pb-2">PRODUCTS</p>
                        <div className="w-full flex flex-col flex-1">
                            {products.length > 0 ? (
                                products.map((product, index) => (
                                    <ProfileProductCard key={index} product={product} handleDelete={setSelectedProduct} />
                                ))
                            ) : (
                                <p className="text-white">No products available.</p>
                            )}
                        </div>
                    </div>

                </div>
            </NavbarLayout>
        )
    }

    return (
        <>
        </>
    )
}

export default Profile;