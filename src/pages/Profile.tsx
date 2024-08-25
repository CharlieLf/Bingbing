import { deleteProductUpdate, getProductsByOwnerQuery } from "@/services/productService";
import IconWallet from "@assets/icons/IconWallet";
import ButtonSmall from "@components/ButtonSmall";
import DeleteProductModal from "@components/DeleteProductModal";
import ProfileProductCard from "@components/ProfileProductCard";
import useAuthContext from "@hooks/useAuthContext";
import NavbarLayout from "@layouts/NavbarLayout"
import Product from "@models/product";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Profile: React.FC = () => {
    const { user, balance } = useAuthContext();
    const { principal } = useParams();

    const { products, getProductsByOwner } = getProductsByOwnerQuery(principal ?? '');
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
    const { deleteProduct } = deleteProductUpdate(selectedProduct?.id ?? 0);

    async function fetchProductsByOwner() {
        await getProductsByOwner();
    }

    async function handleDeleteProduct() {
        const result = await deleteProduct();
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

    return (
        <NavbarLayout>
            {selectedProduct && <DeleteProductModal onClose={() => setSelectedProduct(undefined)} product={selectedProduct} handleDeleteProduct={handleDeleteProduct} />}
            <div className="w-screen px-[2.5%] py-2">
                <div className="flex justify-between items-center gap-5">
                    <div className="flex gap-10">
                        { <img className="size-32 object-cover rounded-full border border-gray-400" src={""} alt="profile image" />}
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

export default Profile;