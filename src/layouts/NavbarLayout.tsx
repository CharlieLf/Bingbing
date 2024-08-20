import Navbar from "@components/Navbar";

interface Props {
    children: React.ReactNode
}

const NavbarLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className="flex flex-col w-screen">
            <Navbar />
            {children}
        </div>
    );
};

export default NavbarLayout;