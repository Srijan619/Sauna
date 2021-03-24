import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { Grid, Typography, CardMedia } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { withFirebase } from '../../Firebase';
import { AuthContext } from '../Auth/Auth';
import ImageStepper from './ImageStepper';

const styles = theme => ({
    root: {
        maxWidth: 345,
        '& > *': {
          margin: theme.spacing(1)
        }
      },
      text: {
        marginLeft: '0.2em'
      },
      container: {
        width: '100%',
        marginBottom: theme.spacing(1),
        paddingBottom:theme.spacing(10),
      },
      media: {},
      card: {
        margin: '20px auto'
      },
      fab: {
        position: 'absolute',
        bottom: theme.spacing(-6),
        right: theme.spacing(2),
      },
      container2:{
        position:'relative',
        marginBottom:theme.spacing(-2)
      },
      link:{
        textDecoration:'none',
        color:'black',
        fontFamily: 'Roboto',
      }
    });

class SaunaList extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      saunas: []
    };
  }

  componentDidMount() {
    const { currentUser } = this.context;
    const currentUserId = currentUser.uid;
    const { db } = this.props.firebase;
    db.collection('saunas')
      .get()
      .then(snapshot => {
        const items = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          if (data.creatorId === currentUserId) {
            items[doc.id] = doc.data();
          }
        });
        this.setState({ saunas: items });
      });
  }

  renderImages = item => {
    const images = [];
    if (item.imageUrls) {
      item.imageUrls.map(url =>
        images.push({ label: item.name, imgPath: url })
      );
      return <ImageStepper steps={images} isCard />;
    }
  };

    render() {
        const { saunas } = this.state;
        const { classes } = this.props;

        return (
            <div className={classes.root}>
            <h1 style={{ fontFamily: 'Lobster', marginBottom: 20 }}>List of your saunas</h1>
            <div className={classes.container}>
                <Grid item container>
                    {Object.entries(saunas).map(([key, item]) => (
                        <Grid item md={6} lg={3} key={item.name} className={classes.card}>
                            <Card className={classes.root}>
                                <CardMedia className={classes.container2}>{this.renderImages(item)}</CardMedia>

                                <CardActionArea>
                                    <CardContent component={Link} className={classes.link} to={`/sauna/${key}`}>
                                        <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>{item.name}</Typography>
                                        <Typography variant="caption">{item.description}</Typography>

                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(withFirebase(SaunaList));
