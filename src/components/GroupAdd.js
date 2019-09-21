import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(() => ({
    add: {
        marginTop: 10
    }
}));

const GroupAdd = ({
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
                fullWidth
                id="group-id"
                label={`${idGroup.error ? idGroup.error : 'ID'}`}
                error={idGroup.error ? true : false}
                margin="normal"
                value={idGroup.name}
                onChange={onChange('idGroup')}
                className={classes.textField}
            />
            <TextField
                fullWidth
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
                className={classes.add}
                onClick={handleGroupsAdd}
            >
                <AddIcon />
            </Fab>
        </Fragment>
    );
};

GroupAdd.propTypes = {
    idGroup: PropTypes.shape({
        name: PropTypes.string,
        error: PropTypes.string
    }),
    nameGroup: PropTypes.shape({
        name: PropTypes.string,
        error: PropTypes.string
    }),
    typeGroup: PropTypes.string,
    onChange: PropTypes.func,
    handleGroupsAdd: PropTypes.func,
    handleTypeGroup: PropTypes.func
};

GroupAdd.exportDefault = {
    idGroup: {
        name: '',
        error: ''
    },
    nameGroup: {
        name: '',
        error: ''
    },
    typeGroup: '',
    onChange: () => {},
    handleGroupsAdd: () => {},
    handleTypeGroup: () => {}
};

export default GroupAdd;
