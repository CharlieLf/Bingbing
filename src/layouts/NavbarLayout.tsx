import Navbar from '@components/Navbar';

interface Props {
    children: React.ReactNode;
}

const NavbarLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className="flex w-screen flex-col">
            <Navbar />
            {children}
        </div>
    );
};

export default NavbarLayout;
