import React from "react";
import { Container } from "@material-ui/core";
import NewCounter from "./NewCounter";
import { makeStyles } from '@material-ui/core/styles';

const AppBody = () => {
    const useStyles = makeStyles((theme) => ({
        root: {
            marginTop: theme.spacing(2),
        },
    }));

    const classes = useStyles();
    return (
        <Container maxWidth="sm" className={classes.root}>
            <NewCounter />
        </Container>
    )
}

export default AppBody;