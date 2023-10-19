import * as React from 'react';
import {Avatar, Button, Card, CardActions, CardContent, CardHeader, Divider, Link, Typography} from "@mui/material";
import {User} from "../../types";
import {Link as RouterLink} from 'react-router-dom';
import Person2Icon from '@mui/icons-material/Person2';
import {NAV_LINKS} from "../../utils/constants.ts";
import {useAppSelector} from "../../app/hooks.ts";
import {selectUser} from "../../dispatchers/users/usersSlice.ts";
import {BOX_SHADOW} from "../../utils/styles.ts";

interface Props {
    user: User
}


const ProfileCardFull: React.FC<Props> = ({user}) => {
    const loggedUser = useAppSelector(selectUser);
    return (
        <Card sx={{width: 400, boxShadow: BOX_SHADOW}}>
            <CardHeader
                color="primary"
                avatar={
                    user.avatar_url ?
                        <Avatar alt={`${user.name} profile picture`} src={user.avatar_url}
                                sx={{width: 76, height: 76}}/> :
                        <Avatar><Person2Icon/></Avatar>
                }
                title={
                    <Typography fontWeight="700" color="primary">{user.name}</Typography>
                }
                subheader={`@${user.login}`}
            />
            <Divider/>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    <b>Email:</b> {user.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <b>Location:</b> {user.location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <b>Company:</b> {user.company ? user.company : 'Self employed'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <b>Bio:</b> {user.bio}
                </Typography>
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: 'space-evenly'}}>
                <Button
                    component={Link}
                    href={user.profile_link}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Open Github
                </Button>

                {loggedUser && loggedUser._id === user._id &&
                    <Button
                        component={RouterLink}
                        to={`${NAV_LINKS.editProfile}/${user._id}`}
                    >
                        Edit Profile
                    </Button>}
            </CardActions>
        </Card>
    );
}
export default ProfileCardFull;
