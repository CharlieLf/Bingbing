import withCategorybar from "../../hoc/withCategoryBar";
import withNavbar from "../../hoc/withNavbar";

interface Props {
    selectedCategory: string
}

const Home: React.FC<Props> = ({ selectedCategory }) => {
    return (
        <div className="">

        </div>
    )
};

const wrap = (Component: React.ComponentType<any>) => {
    return withNavbar(withCategorybar(Component));
}

export default wrap(Home);