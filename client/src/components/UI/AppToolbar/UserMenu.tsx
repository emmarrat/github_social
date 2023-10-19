import React, {useState} from 'react';
import {Avatar, Button, Menu, MenuItem} from '@mui/material';
import {User} from "../../../types";
import noAvatar from '../../../assets/images/noAvatar.jpg'
import {useAppDispatch} from "../../../app/hooks.ts";
import {unsetUser} from "../../../dispatchers/users/usersSlice.ts";
import {NAV_LINKS} from "../../../utils/constants.ts";
import {NavLink, useNavigate} from "react-router-dom";

interface Props {
    user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const navigate = useNavigate();
    let cardImage = noAvatar;

    if (user.avatar_url) {
        cardImage = user.avatar_url;
    }
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await dispatch(unsetUser());
        navigate(NAV_LINKS.home);
    };

    return (
        <>
            <Button onClick={handleClick} color="inherit">
                Hello, {user.name}
                <Avatar src={cardImage} alt={user.name} sx={{ml: 2}}/>
            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{mt: 1}}
            >
                <MenuItem component={NavLink} to={NAV_LINKS.profile}>My profile</MenuItem>
                <MenuItem component={NavLink} to={`${NAV_LINKS.repos}/Public`}>My repositories</MenuItem>
                <MenuItem component={NavLink} to={NAV_LINKS.searchUsers}>Search users</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;
