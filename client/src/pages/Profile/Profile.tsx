import {useAppSelector} from "../../app/hooks.ts";
import {selectUser} from "../../dispatchers/users/usersSlice.ts";
import {Grid, Typography} from "@mui/material";
import ProfileCard from "../../components/ProfileCard/ProfileCard.tsx";

const Profile = () => {
    const user = useAppSelector(selectUser);
    return (
        <Grid
            container
            justifyContent='center'
            flexDirection="column"
            alignItems="center"
            gap={5}
        >
            <Typography variant="h5">My Profile</Typography>
            {user && <ProfileCard user={user}/>}
        </Grid>
    );
};

export default Profile;