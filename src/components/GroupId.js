import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import CallMissedOutgoingIcon from '@material-ui/icons/CallMissedOutgoing';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import { FlexRow } from './styledComponents';

const useStyles = makeStyles(() => ({
    textField: {
        marginTop: 0
    },
    add: {
        marginTop: 10,
        width: 45
    }
}));

const GroupId = ({
    idGroup,
    onChange,
    handleCheckId,
    typeGroup,
    handleTypeGroup,
    idGroupSet,
    isLoading,
    idGroupError,
    typeGroupSet
}) => {
    const classes = useStyles();
    return (
        <Fragment>
            <FlexRow>
                <TextField
                    fullWidth
                    id="group-alias"
                    label={`${idGroupError ? idGroupError : 'ID'}`}
                    error={idGroupError ? true : false}
                    margin="normal"
                    value={idGroup}
                    className={classes.textField}
                    onChange={onChange}
                />
                <Fab
                    size="small"
                    color="primary"
                    aria-label="add"
                    className={classes.add}
                    onClick={() => handleCheckId(idGroup)}
                >
                    <CallMissedOutgoingIcon />
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
            {idGroupSet && (
                <div>
                    Публикации Добавляются{' '}
                    {typeGroupSet === 'group' ? 'в сообщество' : 'на страницу'}{' '}
                    с id -<b>{!isLoading && idGroupSet}</b>
                </div>
            )}
        </Fragment>
    );
};

GroupId.propTypes = {
    idGroup: PropTypes.string,
    onChange: PropTypes.func,
    handleCheckId: PropTypes.func,
    typeGroup: PropTypes.string,
    handleTypeGroup: PropTypes.func,
    idGroupSet: PropTypes.string,
    isLoading: PropTypes.bool,
    idGroupError: PropTypes.string,
    typeGroupSet: PropTypes.string
};
GroupId.defaultProps = {
    idGroup: '',
    onChange: () => {},
    handleCheckId: () => {},
    typeGroup: 'group',
    handleTypeGroup: () => {},
    isLoading: false,
    idGroupError: '',
    typeGroupSet: '',
    idGroupSet: ''
};

export default GroupId;
