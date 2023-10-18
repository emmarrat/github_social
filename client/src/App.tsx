import {Container, CssBaseline} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {NAV_LINKS} from "./constants.ts";
import Home from "./page/Home/Home.tsx";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";

function App() {

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
                            element={
                                <Home/>
                        }
                        />
                        <Route
                            path={NAV_LINKS.login}
                            element={
                                <div>Login</div>
                            }
                        />

                    </Routes>
                </Container>
            </main>
        </>
    )
}

export default App
