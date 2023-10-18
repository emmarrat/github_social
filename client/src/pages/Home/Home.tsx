import {useAppSelector} from "../../app/hooks.ts";
import {selectUser} from "../../dispatchers/users/usersSlice.ts";
import {NAV_LINKS} from "../../constants.ts";
import {Navigate} from "react-router-dom";

const Home = () => {
    const user = useAppSelector(selectUser);

    if (!user) {
        return <Navigate to={NAV_LINKS.login} />;
    }

    return (
        <div>
         Home
        </div>
    );
};

export default Home;