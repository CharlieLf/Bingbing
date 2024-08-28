import ButtonSmall from "@components/ButtonSmall";
import Card from "@components/Card";
import ShopCard from "@components/ShopCard";
import NavbarLayout from "@layouts/NavbarLayout";

const Favorite: React.FC = () => {
    return(
        <NavbarLayout>
            <p className="self-start px-20 text-3xl font-medium">Favorite</p>

            <div className="w-full py-5 px-20">
                <Card/>
            </div>
        </NavbarLayout>
    )
}

export default Favorite;