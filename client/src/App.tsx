import {Container, CssBaseline} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {NAV_LINKS} from "./constants.ts";
import Home from "./pages/Home/Home.tsx";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import Login from "./pages/Login/Login.tsx";
import {useAppSelector} from "./app/hooks.ts";
import {selectUser} from "./dispatchers/users/usersSlice.ts";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";

function App() {
    const user = useAppSelector(selectUser);

    return (
        <>
            <CssBaseline/>
            <header>
                <AppToolbar/>
            </header>
            <main>
                <Container>
                    <Routes>
                        <Route
                            path={NAV_LINKS.home}
                            element={<Home/>}
                        />
                        <Route
                            path={NAV_LINKS.login}
                            element={<Login/>}
                        />
                        <Route
                            path={NAV_LINKS.profile}
                            element={
                                <ProtectedRoute isAllowed={user !== null} returnTo={NAV_LINKS.home}>
                                    <Profile/>
                                </ProtectedRoute>
                            }
                        />

                    </Routes>
                </Container>
            </main>
        </>
    )
}

export default App
