import ButtonSmall from "@components/ButtonSmall";
import ShopCard from "@components/ShopCard";
import NavbarLayout from "@layouts/NavbarLayout";

const Favorite: React.FC = () => {
    return(
        <NavbarLayout>
            <p className="self-start px-20 text-3xl font-medium">Favorite</p>

            <div className="w-full py-5 px-20">
                {/* Notes: Fetch Favorite Product */}
                <ShopCard checkbox="false" totalPrice="">
                    <ButtonSmall text="View Detail"/>
                </ShopCard>

            </div>
        </NavbarLayout>
    )
}

export default Favorite;