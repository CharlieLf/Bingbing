import IconSearch from "@assets/icons/IconSearch";
import NavbarIcon from "./NavbarIcon";
import IconCart from "@assets/icons/IconCart";
import IconHeart from "@assets/icons/IconHeart";
import IconPerson from "@assets/icons/IconPerson";

const Navbar: React.FC = () => {
    return (
        <nav className="flex w-screen p-10 justify-between align-middle">
            <p className="text-[36px] font-marcellus">BINGBING</p>
            <div className="flex flex-row justify-between align-middle h-fit w-[15%]">
                <NavbarIcon to="search" icon={<IconSearch />}/>
                <NavbarIcon to="cart" icon={<IconCart />}/>
                <NavbarIcon to="favorite" icon={<IconHeart />}/>
                <NavbarIcon to="profile" icon={<IconPerson />}/>
            </div>
        </nav>
    )
};

export default Navbar;