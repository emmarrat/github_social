import {useAppSelector} from "../../app/hooks.ts";
import {selectUser} from "../../dispatchers/users/usersSlice.ts";
import {Link as RouterLink} from 'react-router-dom';
import LayoutContainer from "../../components/Layout/LayoutContainer.tsx";
import {Button, Grid, Typography} from "@mui/material";
import {NAV_LINKS} from "../../constants.ts";

const Home = () => {
    const user = useAppSelector(selectUser);

    return (
        <LayoutContainer height='60vh'>
            <Typography variant="h4">
                Hello it's web app which works with
                <Typography variant="h4" fontWeight={700} component="span" color="secondary">
                    {' '}  GitHub API
                </Typography>
            </Typography>
            <Typography variant="h5">
                {user ? 'You can start from your profile page' : 'Firstly visit login page'}
            </Typography>
            <Grid item mt={5}>
                <Button
                    variant="outlined"
                    component={RouterLink}
                    to={user ? NAV_LINKS.profile : NAV_LINKS.login}
                    size="large"
                >
                    {user ? 'profile' : 'Login'}
                </Button>
            </Grid>
        </LayoutContainer>
    );
};

export default Home;