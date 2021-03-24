import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  },
  ratings: {
    fontSize: '12px'
  }
}));

const Reviews = () => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://picsum.photos/200" />
        </ListItemAvatar>
        <ListItemText
          primary="Relaxing sauna experience"
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                <span className={classes.ratings}>
                  <StarIcon fontSize="inherit" />
                  <StarIcon fontSize="inherit" />
                  <StarHalfIcon fontSize="inherit" /> <span>3.5</span>
                </span>
              </Typography>
              {
                ' — Went in for a visit after a dive in the cold lake and was really…'
              }
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="https://picsum.photos/200" />
        </ListItemAvatar>
        <ListItemText
          primary="Open late"
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                <span className={classes.ratings}>
                  <StarIcon fontSize="inherit" />
                  <StarIcon fontSize="inherit" />
                  <StarIcon fontSize="inherit" />
                  <StarIcon fontSize="inherit" /> <span>4</span>
                </span>
              </Typography>
              {' — This sauna is open on late hours which is great for…'}
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="https://picsum.photos/200" />
        </ListItemAvatar>
        <ListItemText
          primary="Authentic Finnish sauna"
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                <span className={classes.ratings}>
                  <StarIcon fontSize="inherit" />
                  <StarIcon fontSize="inherit" />
                  <StarIcon fontSize="inherit" />
                  <StarIcon fontSize="inherit" /> <span>4</span>
                </span>
              </Typography>
              {
                ' — We were searching for an authentic finnish experience, this…'
              }
            </>
          }
        />
      </ListItem>
    </List>
  );
};

export default Reviews;
