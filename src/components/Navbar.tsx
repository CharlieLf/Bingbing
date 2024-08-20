import IconSearch from '@assets/icons/IconSearch';
import NavbarIcon from './NavbarIcon';
import IconCart from '@assets/icons/IconCart';
import IconHeart from '@assets/icons/IconHeart';
import IconPerson from '@assets/icons/IconPerson';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 flex w-screen items-center justify-between p-10 bg-white">
      <p className="text-[36px] font-marcellus">BINGBING</p>
      <div className="flex w-[15%] flex-row items-center justify-between">
        <NavbarIcon to="search" icon={<IconSearch />} />
        <NavbarIcon to="cart" icon={<IconCart />} />
        <NavbarIcon to="favorite" icon={<IconHeart />} />
        <NavbarIcon to="profile" icon={<IconPerson />} />
      </div>
    </nav>
  );
};

export default Navbar;
