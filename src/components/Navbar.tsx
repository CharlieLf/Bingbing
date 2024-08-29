import NavbarIcon from './NavbarIcon';
import IconSearch from '@assets/icons/IconSearch';
import IconCart from '@assets/icons/IconCart';
import IconHeart from '@assets/icons/IconHeart';
import IconPerson from '@assets/icons/IconPerson';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import UserPopUp from './UserPopup';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);

    const togglePopup = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsUserPopupOpen(prev => !prev);
    };

    return (
        <nav className="sticky top-0 flex w-screen items-center justify-between p-10 mb-5 bg-white h-[125px] shadow-md z-40">
            <p className="text-[36px] font-marcellus cursor-pointer">
                <Link to="/">BINGBING</Link>
            </p>
            <div className="flex w-[15%] flex-row items-center justify-between">
                <NavbarIcon icon={<IconSearch />} />
                <NavbarIcon onclick={() => navigate('/cart')} icon={<IconCart />} />
                <NavbarIcon onclick={() => navigate('/favorite')} icon={<IconHeart />} />
                <div className="relative size-6">
                    <NavbarIcon onclick={togglePopup} icon={<IconPerson />} />
                    {isUserPopupOpen && (
                        <UserPopUp isPopupOpen={isUserPopupOpen} closePopup={() => setIsUserPopupOpen(false)} />
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
