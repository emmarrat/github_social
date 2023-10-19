import {useAppSelector} from "../../app/hooks.ts";
import {selectUser} from "../../dispatchers/users/usersSlice.ts";
import {Grid, Typography} from "@mui/material";
import ProfileCardFull from "../../components/ProfileCard/ProfileCardFull.tsx";

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
            {user && <ProfileCardFull user={user}/>}
        </Grid>
    );
};

export default Profile;