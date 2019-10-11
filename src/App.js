import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './App.css';

import GroupAddContain from './containers/GroupAddContain';
import ListGroupsContain from './containers/ListGroupsContain';
import PostsVkContain from './containers/PostsVkContain';
import GroupIdContain from './containers/GroupIdContain';

const useStyles = makeStyles(theme => ({
    root: { flexGrow: 1 },
    gridPosts: { paddingTop: theme.spacing(1) },
    grid: {
        padding: theme.spacing(1)
    },
    gridBottom: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(1)
    },
    paper: {
        padding: theme.spacing(2),
        // textAlign: 'center',
        color: theme.palette.text.secondary
    }
}));

function App() {
    // return <GroupAddContain />;
    const classes = useStyles();
    return (
        <Grid container className={classes.root} spacing={0}>
            <Grid className={classes.grid} item xs={12} md={2}>
                <Paper className={classes.gridBottom}>
                    <GroupIdContain />
                </Paper>
                <Paper className={classes.paper}>
                    <GroupAddContain />
                </Paper>
            </Grid>
            <Grid className={classes.grid} item xs={12} md={3}>
                <ListGroupsContain />
            </Grid>
            <Grid className={classes.gridPosts} item xs={12} md={7}>
                <PostsVkContain />
            </Grid>
        </Grid>
    );
}

export default App;
