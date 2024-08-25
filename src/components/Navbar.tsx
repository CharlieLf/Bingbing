import NavbarIcon from './NavbarIcon';
import IconSearch from '@assets/icons/IconSearch';
import IconCart from '@assets/icons/IconCart';
import IconHeart from '@assets/icons/IconHeart';
import IconPerson from '@assets/icons/IconPerson';
import { Link } from 'react-router-dom';
import { useAuth } from '@ic-reactor/react';

const Navbar: React.FC = () => {
  const { identity } = useAuth()
  return (
    <nav className="sticky top-0 flex w-screen items-center justify-between p-10 bg-white h-[125px]">
      <p className="text-[36px] font-marcellus cursor-pointer">
        <Link to="/">
          BINGBING
        </Link>
      </p>
      <div className="flex w-[15%] flex-row items-center justify-between">
        <NavbarIcon to="/search" icon={<IconSearch />} />
        <NavbarIcon to="/cart" icon={<IconCart />} />
        <NavbarIcon to="/favorite" icon={<IconHeart />} />
        <NavbarIcon to={`/profile/${identity?.getPrincipal()}`} icon={<IconPerson />} />
      </div>
    </nav>
  );
};

export default Navbar;
