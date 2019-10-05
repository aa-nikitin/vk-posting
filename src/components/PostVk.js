import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    cardGrid: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingBottom: theme.spacing(2)
    },
    card: {},
    cardText: {
        height: 100,
        padding: theme.spacing(1)
    },
    media: {
        height: 300,
        padding: theme.spacing(0)
    },
    photo: {
        height: 300
    }
}));

const MediaCard = ({
    text,
    shortText,
    attachments,
    photoPreview,
    handleAddPost
}) => {
    const classes = useStyles();
    return (
        <Grid item xs={12} md={3} className={classes.cardGrid}>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardContent className={classes.media}>
                        {photoPreview && (
                            <CardMedia
                                className={classes.photo}
                                image={photoPreview}
                                title="Contemplative Reptile"
                            />
                        )}
                    </CardContent>

                    <CardContent className={classes.cardText}>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            {shortText}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => handleAddPost({ text, attachments })}
                    >
                        Опубликовать
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

MediaCard.propTypes = {
    text: PropTypes.string,
    shortText: PropTypes.string,
    attachments: PropTypes.string,
    handleAddPost: PropTypes.func
};

MediaCard.defaultProps = {
    text: '',
    shortText: '',
    attachments: '',
    handleAddPost: () => {}
};

export default MediaCard;
