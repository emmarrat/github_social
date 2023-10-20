import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { NAV_LINKS } from './utils/constants.ts';
import Home from './pages/Home/Home.tsx';
import AppToolbar from './components/UI/AppToolbar/AppToolbar.tsx';
import Profile from './pages/Profile/Profile.tsx';
import Login from './components/Login/Login.tsx';
import { useAppSelector } from './app/hooks.ts';
import { selectUser } from './dispatchers/users/usersSlice.ts';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.tsx';
import UserRepositories from './pages/UserRepositories/UserRepositories.tsx';
import UserOneRepository from './pages/UserOneRepository/UserOneRepository.tsx';
import SearchUsers from './pages/SearchUsers/SearchUsers.tsx';

function App() {
  const user = useAppSelector(selectUser);

  return (
    <>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>
      <main>
        <Container sx={{ pb: 10 }}>
          <Routes>
            <Route path={NAV_LINKS.home} element={<Home />} />
            <Route path={NAV_LINKS.login} element={<Login />} />
            <Route
              path={NAV_LINKS.profile}
              element={
                <ProtectedRoute
                  isAllowed={user !== null}
                  returnTo={NAV_LINKS.home}
                >
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path={`${NAV_LINKS.repos}/:category`}
              element={
                <ProtectedRoute
                  isAllowed={user !== null}
                  returnTo={NAV_LINKS.home}
                >
                  <UserRepositories />
                </ProtectedRoute>
              }
            />
            <Route
              path={`${NAV_LINKS.oneRepo}/:repoName`}
              element={
                <ProtectedRoute
                  isAllowed={user !== null}
                  returnTo={NAV_LINKS.home}
                >
                  <UserOneRepository />
                </ProtectedRoute>
              }
            />
            <Route path={NAV_LINKS.searchUsers} element={<SearchUsers />} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
