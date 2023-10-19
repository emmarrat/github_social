import React from 'react';
import {Avatar, Button, Card, CardActions, CardHeader, Divider, Link, Typography} from "@mui/material";
import {BOX_SHADOW} from "../../utils/styles.ts";
import {UserShort} from "../../types";
import GitHubIcon from "@mui/icons-material/GitHub";

interface  Props {
    user: UserShort
}
const ProfileCard:React.FC<Props> = ({user}) => {
    return (
        <Card sx={{width: 400, boxShadow: BOX_SHADOW}}>
            <CardHeader
                color="primary"
                avatar={
                        <Avatar
                            alt={`${user.login} profile picture`}
                            src={user.avatar_url}
                            sx={{width: 46, height: 46}}
                        />
                }
                title={
                    <Typography gutterBottom variant="h5" component="div">
                        @{user.login}
                    </Typography>
                }
            />
            <Divider/>

            <CardActions sx={{display: 'flex', justifyContent: 'space-evenly'}}>
                <Button
                    component={Link}
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth
                >
                    <GitHubIcon sx={{mr: 1}}/>
                    Open Profile
                </Button>
            </CardActions>
        </Card>

    );
};

export default ProfileCard;