import {useAppSelector} from "../../app/hooks.ts";
import {selectUser} from "../../dispatchers/users/usersSlice.ts";
import {Grid} from "@mui/material";
import ProfileCard from "../../components/ProfileCard/ProfileCard.tsx";

const Profile = () => {
    const user = useAppSelector(selectUser);
    return (
        <Grid
            container
            justifyContent='center'
        >
            {user && <ProfileCard user={user}/>}
        </Grid>
    );
};

export default Profile;