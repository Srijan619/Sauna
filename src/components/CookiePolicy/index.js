/*
    Humidity bar
 */

import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography/Typography';
import Footer from '../Footer';

const useStyles = makeStyles(theme => ({
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '0.8rem'
  },
  border: {
    borderStyle: 'solid',
    borderColor: '#000',
    borderRadius: '0.4rem',
    borderWidth: '2px',
    height: '70%',
    width: '1rem',
    backgroundColor: '#004dd4'
  },
  innerArea: {
    backgroundColor: '#fff',
    borderRadius: '0.3rem 0.3rem 0rem 0rem'
  }
}));

const Component = props => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.body}>
        <Typography variant="h6" className={classes.title}>
          {' '}
          Cookie Policy for Saunaan{' '}
        </Typography>
        <br />
        <Typography variant="body1" className={classes.text}>
          {' '}
          This is the Cookie Policy for Saunaan, accessible from Saunnan.io{' '}
        </Typography>
        <br />
        <Typography variant="body1" className={classes.text}>
          {' '}
          <b>What Are Cookies </b>{' '}
        </Typography>
        <Typography variant="body1" className={classes.text}>
          As is common practice with almost all professional websites this site
          uses cookies, which are tiny files that are downloaded to your
          computer, to improve your experience. This page describes what
          information they gather, how we use it and why we sometimes need to
          store these cookies. We will also share how you can prevent these
          cookies from being stored however this may downgrade or 'break'
          certain elements of the sites functionality.
        </Typography>
        <br />
        <Typography variant="body1" className={classes.text}>
          {' '}
          For more general information on cookies see the Wikipedia article on
          HTTP Cookies.{' '}
        </Typography>
        <br />
        {/*----------*/}
        <Typography variant="body1" className={classes.text}>
          {' '}
          <b>How We Use Cookies </b>{' '}
        </Typography>
        <Typography variant="body1" className={classes.text}>
          {' '}
          We use cookies for a variety of reasons detailed below. Unfortunately
          in most cases there are no industry standard options for disabling
          cookies without completely disabling the functionality and features
          they add to this site. It is recommended that you leave on all cookies
          if you are not sure whether you need them or not in case they are used
          to provide a service that you use.
        </Typography>
        <br />
        <Typography variant="body1" className={classes.text}>
          {' '}
          <b>Disabling Cookies</b>{' '}
        </Typography>
        <Typography variant="body1" className={classes.text}>
          {' '}
          You can prevent the setting of cookies by adjusting the settings on
          your browser (see your browser Help for how to do this). Be aware that
          disabling cookies will affect the functionality of this and many other
          websites that you visit. Disabling cookies will usually result in also
          disabling certain functionality and features of the this site.
          Therefore it is recommended that you do not disable cookies.{' '}
        </Typography>
        <br />
        <Typography variant="body1" className={classes.text}>
          {' '}
          <b>The Cookies We Set </b>{' '}
        </Typography>
        <Typography variant="body1" className={classes.text}>
          <ul>
            <li>
              Account related cookies
              <br />
              If you create an account with us then we will use cookies for the
              management of the signup process and general administration. These
              cookies will usually be deleted when you log out however in some
              cases they may remain afterwards to remember your site preferences
              when logged out.
            </li>
            <li>
              Login related cookies
              <br />
              We use cookies when you are logged in so that we can remember this
              fact. This prevents you from having to log in every single time
              you visit a new page. These cookies are typically removed or
              cleared when you log out to ensure that you can only access
              restricted features and areas when logged in.
            </li>
            <li>
              Email newsletters related cookies
              <br />
              This site offers newsletter or email subscription services and
              cookies may be used to remember if you are already registered and
              whether to show certain notifications which might only be valid to
              subscribed/unsubscribed users.
            </li>
            <li>
              Orders processing related cookies
              <br />
              This site offers e-commerce or payment facilities and some cookies
              are essential to ensure that your order is remembered between
              pages so that we can process it properly.
            </li>
            <li>
              Site preferences cookies
              <br />
              In order to provide you with a great experience on this site we
              provide the functionality to set your preferences for how this
              site runs when you use it. In order to remember your preferences
              we need to set cookies so that this information can be called
              whenever you interact with a page is affected by your preferences.
            </li>
          </ul>
        </Typography>
        <br />
        <Typography variant="body1" className={classes.text}>
          {' '}
          <b>Third Party Cookies </b>{' '}
        </Typography>
        <Typography variant="body1" className={classes.text}>
          {' '}
          In some special cases we also use cookies provided by trusted third
          parties. The following section details which third party cookies you
          might encounter through this site.
          <ul>
            <li>
              This site uses Google Analytics which is one of the most
              widespread and trusted analytics solution on the web for helping
              us to understand how you use the site and ways that we can improve
              your experience. These cookies may track things such as how long
              you spend on the site and the pages that you visit so we can
              continue to produce engaging content. For more information on
              Google Analytics cookies, see the official Google Analytics page.
            </li>
            <li>
              We also use social media buttons and/or plugins on this site that
              allow you to connect with your social network in various ways. For
              these to work the following social media sites including; Facebook
              & Google will set cookies through our site which may be used to
              enhance your profile on their site or contribute to the data they
              hold for various purposes outlined in their respective privacy
              policies.
            </li>
          </ul>
        </Typography>
        <br />
        <Typography variant="body1" className={classes.text}>
          {' '}
          <b>More Information </b>{' '}
        </Typography>
        <Typography variant="body1" className={classes.text}>
          {' '}
          Hopefully that has clarified things for you and as was previously
          mentioned if there is something that you aren't sure whether you need
          or not it's usually safer to leave cookies enabled in case it does
          interact with one of the features you use on our site. This Cookies
          Policy was created with the help of the{' '}
          <a href="https://www.cookiepolicygenerator.com/">
            Cookies Policy Template Generator
          </a>{' '}
          and the <a href="https://www.webterms.org/">WebTerms Generator.</a>{' '}
        </Typography>
        <br />
        <Typography variant="body1" className={classes.text}>
          {' '}
          However if you are still looking for more information then you can
          contact us through one of our preferred contact methods:
          <ul>
            <li>Email: test@Saunaan.test</li>
          </ul>
        </Typography>
      </div>
      <Footer />
    </>
  );
};

export default React.memo(Component);
