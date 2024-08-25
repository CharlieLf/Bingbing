import useAuthContext from "@hooks/useAuthContext";
import NavbarLayout from "@layouts/NavbarLayout";

const UpdateProfile: React.FC = () => {
    const { user } = useAuthContext();
    return (
        <NavbarLayout>
            <div className="w-full h-full px-16 py-8 bg-red-500">

            </div>
        </NavbarLayout>
    )
}

export default UpdateProfile;