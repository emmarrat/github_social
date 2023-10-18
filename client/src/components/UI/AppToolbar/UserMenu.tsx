import React, {useState} from 'react';
import {Avatar, Button, Menu, MenuItem} from '@mui/material';
import {User} from "../../../types";
import noAvatar from '../../../assets/images/noAvatar.jpg'
import {useAppDispatch} from "../../../app/hooks.ts";
import {unsetUser} from "../../../dispatchers/users/usersSlice.ts";
import {NAV_LINKS} from "../../../constants.ts";
import {NavLink} from "react-router-dom";

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
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

    const handleLogout = () => {
        dispatch(unsetUser());
    };

  return (
      <>
          <Button onClick={handleClick} color="inherit">
              Hello, {user.name}
              <Avatar src={cardImage} alt={user.name} sx={{ ml: 2 }} />
          </Button>
          <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{ mt: 1 }}
          >
              <MenuItem component={NavLink} to={NAV_LINKS.profile}>My profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
      </>
  );
};

export default UserMenu;
