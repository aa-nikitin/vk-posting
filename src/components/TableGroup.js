import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TextField from '@material-ui/core/TextField';
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

const TableGroup = ({
    groups,
    active,
    counts,
    page,
    handleDel,
    handleClickTableRow,
    handleCounts,
    handlePage
}) => {
    const isSelected = name => active === name;
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
                    {groups &&
                        groups.map(row => (
                            <TableRow
                                hover
                                selected={isSelected(row.idCommunity)}
                                key={row.idCommunity}
                                onClick={() =>
                                    handleClickTableRow(row.idCommunity)
                                }
                            >
                                <TableCell component="th" scope="row">
                                    {row.idCommunity}
                                </TableCell>
                                <TableCell align="right">
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={`https://vk.com/${
                                            row.typeGroup === 'page'
                                                ? 'id'
                                                : 'public'
                                        }${
                                            row.typeGroup === 'page'
                                                ? row.idCommunity
                                                : row.idCommunity.slice(1)
                                        }`}
                                    >
                                        {row.nameGroup}
                                    </a>
                                </TableCell>
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
            <TextField
                id="counts"
                label="Количество"
                value={counts}
                onChange={handleCounts}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true
                }}
                margin="normal"
            />
            <TextField
                id="pages"
                label="Страница"
                value={page}
                onChange={handlePage}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true
                }}
                margin="normal"
            />
        </Paper>
    );
};

TableGroup.propTypes = {
    groups: PropTypes.array,
    active: PropTypes.string,
    counts: PropTypes.number,
    page: PropTypes.number,
    handleDel: PropTypes.func,
    handleClickTableRow: PropTypes.func,
    handleCounts: PropTypes.func,
    handlePage: PropTypes.func
};
TableGroup.exportDefault = {
    groups: [],
    active: '',
    counts: 0,
    page: 0,
    handleDel: () => {},
    handleClickTableRow: () => {},
    handleCounts: () => {},
    handlePage: () => {}
};

export default TableGroup;
