import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import { FlexRow } from './styledComponents';

const useStyles = makeStyles(() => ({
    add: {
        marginTop: 10
    },
    search: {
        marginTop: 30,
        width: 45
    }
}));

const GroupAdd = ({
    aliasGroup,
    idGroup,
    nameGroup,
    typeGroup,
    onChange,
    handleGroupsAdd,
    handleTypeGroup,
    handleFindId
}) => {
    const classes = useStyles();

    return (
        <Fragment>
            <FlexRow>
                <TextField
                    fullWidth
                    id="group-alias"
                    label={`${
                        aliasGroup.error ? aliasGroup.error : 'Псевдоним'
                    }`}
                    error={aliasGroup.error ? true : false}
                    margin="normal"
                    value={aliasGroup.name}
                    onChange={onChange({
                        name: 'aliasGroup',
                        check: false
                    })}
                    className={classes.textField}
                    name="group-alias"
                />
                <Fab
                    size="small"
                    color="primary"
                    aria-label="search"
                    className={classes.search}
                    onClick={() => handleFindId()}
                >
                    <SearchIcon />
                </Fab>
            </FlexRow>
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
                onChange={onChange({ name: 'idGroup', check: true })}
                className={classes.textField}
                name="group-id"
            />
            <TextField
                fullWidth
                id="group-name"
                label={`${nameGroup.error ? nameGroup.error : 'Наименование'}`}
                error={nameGroup.error ? true : false}
                margin="normal"
                value={nameGroup.name}
                onChange={onChange({ name: 'nameGroup', check: true })}
                className={classes.textField}
                name="group-name"
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
    aliasGroup: PropTypes.shape({
        name: PropTypes.string,
        error: PropTypes.string
    }),
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
    handleTypeGroup: PropTypes.func,
    handleFindId: PropTypes.func
};

GroupAdd.exportDefault = {
    aliasGroup: {
        name: '',
        error: ''
    },
    idGroup: {
        name: '',
        error: ''
    },
    nameGroup: {
        name: '',
        error: ''
    },
    typeGroup: 'group',
    onChange: () => {},
    handleGroupsAdd: () => {},
    handleTypeGroup: () => {},
    handleFindId: () => {}
};

export default GroupAdd;
