import { Link } from "react-router-dom";

interface Props {
    icon: React.ReactNode
    to: string
}

const NavbarIcon: React.FC<Props> = ({ icon, to }) => {
    return (
        <div className="flex cursor-pointer size-5 items-center justify-center">
            <Link to={to}>
                {icon}
            </Link>
        </div>
    )
};

export default NavbarIcon;