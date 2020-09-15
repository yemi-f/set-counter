import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Grid, Paper } from "@material-ui/core";
import { AddCircle, RemoveCircle } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import { useStopwatch } from 'react-timer-hook';
import { get, set } from "idb-keyval";

const NewCounter = () => {
    const [counter, setCounter] = useState(0);
    const [startCounting, setStartCounting] = useState(false);

    const updateCounter = symbol => {
        if (symbol === "+") {
            setCounter(counter + 1);
            set("counter", counter + 1);
            setStartCounting(true);
        } else if (symbol === "-" && counter > 0) {
            setCounter(counter - 1);
            set("counter", counter - 1);
            setStartCounting(true);
        } else {
            setStartCounting(false);
            setCounter(0);
            set("counter", 0);
        }
        console.log("hook ", counter)
            ;

    }

    useEffect(() => {
        get("counter").then(val => {
            setCounter(val || 0);
        })
    }, [setCounter])

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(0),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        buttonGroupStyle: {
            position: 'absolute',
            bottom: theme.spacing(0),
            left: theme.spacing(0),
        },
        buttonStyle: {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
            fontSize: theme.spacing(5),
        }
    }));


    const MyStopwatch = () => {
        const {
            seconds,
            minutes,
            start,
            pause,
            reset,
        } = useStopwatch({ autoStart: startCounting });

        const stop = () => {
            reset();
            setStartCounting(false);
            setCounter(0);
            set("counter", 0);
        }


        return (
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '100px' }}>
                    <span>{minutes.toString().padStart(2, "0")}</span>:<span>{seconds.toString().padStart(2, "0")}</span>
                </div>
                <Button size="large" onClick={() => start()}>Start</Button>
                <Button size="large" onClick={() => stop()}>Reset</Button>
                <Button size="large" onClick={() => pause()}>Pause</Button>
            </div>
        );
    }

    const classes = useStyles();
    return (
        <>
            <Grid item xs={12} >
                <Paper className={classes.paper}>
                    <MyStopwatch />
                </Paper>
            </Grid>
            <Grid container>
                <ButtonGroup variant="contained" fullWidth={true} color="primary" aria-label="contained primary button group" className={classes.buttonGroupStyle}>
                    <Button className={classes.buttonStyle} onClick={() => updateCounter("-")}>
                        <RemoveCircle fontSize="large" />
                    </Button>
                    <Button className={classes.buttonStyle}>
                        {counter}
                    </Button>
                    <Button className={classes.buttonStyle} onClick={() => updateCounter("+")}>
                        <AddCircle fontSize="large" />
                    </Button>
                </ButtonGroup>
            </Grid>

        </>
    )
}

export default NewCounter;