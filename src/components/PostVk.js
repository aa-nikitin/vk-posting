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

const useStyles = makeStyles({
    card: {},
    media: {
        height: 320
    }
});

const MediaCard = ({ text, attachments, photoPreview, handleAddPost }) => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardActionArea>
                {photoPreview && (
                    <CardMedia
                        className={classes.media}
                        image={photoPreview}
                        title="Contemplative Reptile"
                    />
                )}

                <CardContent>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {text}
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
    );
};

MediaCard.propTypes = {
    text: PropTypes.string,
    attachments: PropTypes.string,
    handleAddPost: PropTypes.func
};

MediaCard.defaultProps = { text: '', attachments: '', handleAddPost: () => {} };

export default MediaCard;
