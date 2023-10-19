import {Button, Link} from "@mui/material";
import {GITHUB_CLIENT_ID, NAV_LINKS} from "../../utils/constants.ts";
import GitHubIcon from '@mui/icons-material/GitHub';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectUser} from "../../dispatchers/users/usersSlice.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {loginWithGithub} from "../../dispatchers/users/usersThunks.ts";

const Login = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        const codeParam = new URLSearchParams(window.location.search).get('code');
        if (codeParam && user === null) {
            dispatch(loginWithGithub(codeParam)).unwrap().then(() => {
                navigate(NAV_LINKS.profile);
            });
        }
    }, []);
    return (

            <Button
                variant="contained"
                component={Link}
                    href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user%20user:email%20user:follow%20repo`}>
                <GitHubIcon sx={{mr: 1}}/> Login with Github
            </Button>
    );
};

export default Login;