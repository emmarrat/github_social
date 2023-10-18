import {GITHUB_CLIENT_ID} from "../../constants.ts";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectUser} from "../../dispatchers/users/usersSlice.ts";
import {loginWithGithub} from "../../dispatchers/users/usersThunks.ts";

const Home = () => {

    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);

console.log(window.location.pathname)
    useEffect(() => {
        const codeParam = new URLSearchParams(window.location.search).get('code');
        if (codeParam && user === null) {
            dispatch(loginWithGithub(codeParam)).unwrap().then(() => {
                window.history.replaceState({}, document.title,window.location.origin);
            });
        }
    }, []);

    return (
        <div>
            <a href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user%20user:email%20user:follow%20repo`}>
                Войти
            </a>
        </div>
    );
};

export default Home;