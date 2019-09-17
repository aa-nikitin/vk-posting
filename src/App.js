import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './App.css';

import ListGroup from './containers/ListGroup/';

const useStyles = makeStyles(theme => ({
    root: { flexGrow: 1 },
    grid: {
        padding: theme.spacing(1)
    },
    paper: {
        padding: theme.spacing(2),
        // textAlign: 'center',
        color: theme.palette.text.secondary
    }
}));

function App() {
    // return <ListGroup />;
    const classes = useStyles();
    return (
        <Grid container className={classes.root} spacing={0}>
            <Grid className={classes.grid} item xs={12} md={4}>
                <Paper className={classes.paper}>
                    <ListGroup />
                </Paper>
            </Grid>
            <Grid className={classes.grid} item xs={12} md={4}>
                <Paper className={classes.paper}>xs=6</Paper>
            </Grid>
            <Grid className={classes.grid} item xs={12} md={4}>
                <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
        </Grid>
    );
}

export default App;
