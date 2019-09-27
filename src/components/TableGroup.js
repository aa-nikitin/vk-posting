import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import pink from '@material-ui/core/colors/pink';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        overflowX: 'auto'
    },
    del: {
        margin: 10,
        backgroundColor: pink[500],
        color: '#fff'
    }
}));

const TableGroup = ({ groups, active, handleDel, groupsActiveItem }) => {
    const isSelected = name => active === name;
    const handleClickTable = id => {
        groupsActiveItem(id);
    };
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>ID (сообщества/страницы)</TableCell>
                        <TableCell align="right">Наименование</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {groups.map(row => (
                        <TableRow
                            hover
                            selected={isSelected(row.idCommunity)}
                            key={row.idCommunity}
                            onClick={() => handleClickTable(row.idCommunity)}
                        >
                            <TableCell component="th" scope="row">
                                {row.idCommunity}
                            </TableCell>
                            <TableCell align="right">{row.nameGroup}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Fab
                size="small"
                aria-label="del"
                className={classes.del}
                onClick={() => handleDel(active)}
            >
                <DeleteIcon />
            </Fab>
        </Paper>
    );
};

TableGroup.propTypes = {
    groups: PropTypes.array,
    active: PropTypes.string,
    handleDel: PropTypes.func,
    groupsActiveItem: PropTypes.func
};
TableGroup.exportDefault = {
    groups: [],
    active: '',
    handleDel: () => {},
    groupsActiveItem: () => {}
};

export default TableGroup;
