import {Container, CssBaseline} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {ROUTER_LINK} from "./constants.ts";

function App() {

    return (
        <>
            <CssBaseline/>
            <header>
                Header
            </header>
            <main>
                <Container>

                    <Routes>
                        <Route
                            path={ROUTER_LINK.home}
                            element={
                                <div>HOME</div>
                            }
                        />
                        <Route
                            path={ROUTER_LINK.login}
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
