import {Button, Card, CardActions, CardContent, CardHeader, Divider, Link, Typography} from "@mui/material";
import {Repository} from "../../types";
import React from "react";


interface Props {
    repository: Repository
}

const RepositoryCard: React.FC<Props> = ({repository}) => {
    return (
        <Card sx={{ boxShadow: '8px 5px 7px 8px #D9D9D9'}}>

            <CardHeader
                title={repository.name}
                subheader={`owner @${repository.owner_login}`}
            />
            <Divider/>
            <CardContent>
                <Typography variant="body2" color="primary.main">
                    <b>Description:</b> {repository.description ? repository.description : 'Were not provided'}
                </Typography>
                <Typography variant="body2" color="primary.main">
                    <b>Main language:</b> {repository.language}
                </Typography>
                {repository.topics.length > 0 && <Typography variant="body2" color="primary.main">
                    <b>Topics:</b> {repository.topics.map((topic, i) => (
                    <Typography component="span" key={i}>
                        {' '} {topic}
                    </Typography>
                ))}
                </Typography>}
                <Typography variant="body2" color="primary.main">
                    <b>Created:</b> {repository.created_at}
                </Typography>
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: 'space-evenly'}}>
                <Button
                    component={Link}
                    href={repository.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth
                    variant="outlined"
                >
                    Open Github
                </Button>
            </CardActions>
        </Card>

    );
};

export default RepositoryCard;