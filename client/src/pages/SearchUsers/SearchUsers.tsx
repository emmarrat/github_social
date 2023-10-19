import LayoutContainer from "../../components/Layout/LayoutContainer.tsx";
import {CircularProgress, Grid, Typography} from "@mui/material";
import Search from "../../components/Search/Search.tsx";
import {useAppSelector} from "../../app/hooks.ts";
import {selectAuthLoading, selectGlobalUsers} from "../../dispatchers/users/usersSlice.ts";
import ProfileCard from "../../components/ProfileCard/ProfileCard.tsx";

const SearchUsers = () => {
    const users = useAppSelector(selectGlobalUsers);
    const loading = useAppSelector(selectAuthLoading);
    return (
        <LayoutContainer gap={5}>
            <Grid item>
                <Typography
                    variant="h5"
                    mb={4}
                    fontWeight="bold"
                    textAlign="center"
                >
                    You can try to find other github users
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Search/>
            </Grid>
            {loading ?
                <CircularProgress/> :
                users.map(user => (
                    <ProfileCard user={user} key={user.id}/>
                ))}
        </LayoutContainer>
    );
};

export default SearchUsers;