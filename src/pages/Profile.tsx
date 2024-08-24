import IconWallet from "@assets/icons/IconWallet";
import ButtonSmall from "@components/ButtonSmall";
import useAuthContext from "@hooks/useAuthContext";
import NavbarLayout from "@layouts/NavbarLayout"
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
    const { user, balance } = useAuthContext();
    const navigate = useNavigate();

    return (
        <NavbarLayout>
            <div className="w-screen px-[2.5%] py-2">
                <div className="flex justify-between items-center gap-5">
                    <div className="flex gap-10">
                        <img className="size-32 object-cover rounded-full border border-gray-400" src="" alt="profile image" />
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
                        <ButtonSmall text="Edit Profile" onclick={() => { navigate('editProfile') }} />
                        <ButtonSmall text="Add Product" onclick={() => { navigate('addProduct') }} />
                    </div>
                </div>
                <div className="w-full mt-5">
                    <p className="w-full text-[24px] border-b border-gray-400">PRODUCTS</p>
                </div>
            </div>
        </NavbarLayout>
    )
}

export default Profile;