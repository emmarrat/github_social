import {GITHUB_CLIENT_ID, NAV_LINKS} from "../../constants.ts";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectUser} from "../../dispatchers/users/usersSlice.ts";
import {loginWithGithub} from "../../dispatchers/users/usersThunks.ts";
import {Button, Grid, Link} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        const codeParam = new URLSearchParams(window.location.search).get('code');
        if (codeParam && user === null) {
            dispatch(loginWithGithub(codeParam)).unwrap().then(() => {
                navigate(NAV_LINKS.profile);
                // window.history.replaceState({}, document.title, window.location.origin);
            });
        }
    }, []);

    return (
        <Grid container justifyContent="center" alignItems="center" sx={{height: '50vh'}}>
            <Button component={Link}
                    href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user%20user:email%20user:follow%20repo`}>
                Войти
            </Button>
        </Grid>
    );
};

export default Home;