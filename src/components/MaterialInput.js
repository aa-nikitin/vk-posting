import React, { Fragment } from 'react';
// import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(3)
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 250
    },
    dense: {
        marginTop: 20
    }
}));

export default ({
    idGroup,
    nameGroup,
    typeGroup,
    onChange,
    handleGroupsAdd,
    handleTypeGroup
}) => {
    const classes = useStyles();

    return (
        <Fragment>
            <FormControl className={classes.formControl}>
                <RadioGroup
                    value={typeGroup}
                    onChange={({ target: { value } }) => handleTypeGroup(value)}
                >
                    <FormControlLabel
                        value="group"
                        control={<Radio color="primary" />}
                        label="Сообщество"
                    />
                    <FormControlLabel
                        value="page"
                        control={<Radio color="primary" />}
                        label="Страница"
                    />
                </RadioGroup>
            </FormControl>
            <TextField
                id="group-id"
                label={`${idGroup.error ? idGroup.error : 'ID'}`}
                error={idGroup.error ? true : false}
                margin="normal"
                value={idGroup.name}
                onChange={onChange('idGroup')}
                className={classes.textField}
            />
            <TextField
                id="group-name"
                label={`${nameGroup.error ? nameGroup.error : 'Наименование'}`}
                error={nameGroup.error ? true : false}
                margin="normal"
                value={nameGroup.name}
                onChange={onChange('nameGroup')}
                className={classes.textField}
            />
            <Fab
                size="small"
                color="primary"
                aria-label="add"
                className={classes.dense}
                onClick={handleGroupsAdd}
            >
                <AddIcon />
            </Fab>
        </Fragment>
    );
};
