import React from 'react';
// import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        overflowX: 'auto'
    },
    table: {
        // minWidth: 650
    }
}));

const TableGroup = ({ groups }) => {
    const [selected, setSelected] = React.useState([]);
    const isSelected = name => selected === name;
    const handleClickTable = id => {
        setSelected(id);
    };
    console.log(selected);
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>ID (сообщества/страницы)</TableCell>
                        <TableCell align="right">Наименование</TableCell>
                        {/* <TableCell align="right">Fat&nbsp;(g)</TableCell> */}
                        {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
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
                            {/* <TableCell align="right">{row.fat}</TableCell> */}
                            {/* <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default TableGroup;
