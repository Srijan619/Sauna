import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles(theme => ({
  cardRoot: {
    maxWidth: 400,
    flexGrow: 1
  },
  root: {
    flexGrow: 1
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4)
  },
  stepper: {
    position: 'absolute',
    top: '40%',
    width: ' 100%',
    maxWidth: '95%',
    background: 'transparent',
    color: 'white'
  },
  slidesController: {
    color: 'white !important'
  },
  cardImg: {
    height: 255,
    maxWidth: 400,
    objectFit: 'cover',
    overflow: 'hidden',
    display: 'block',
    width: '100%'
  },
  img: {
    maxHeight: 550,
    objectFit: 'cover',
    overflow: 'hidden',
    display: 'block',
    width: '100%'
  }
}));

export default function ImageStepper({ steps, isCard }) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <div className={isCard ? classes.cardRoot : classes.root}>
      <img
        className={isCard ? classes.cardImg : classes.img}
        src={
          steps &&
          steps[activeStep] &&
          steps[activeStep].imgPath &&
          steps[activeStep].imgPath
        }
        alt={steps && steps[activeStep] && steps[activeStep].label}
      />
      {maxSteps > 1 && (
        <MobileStepper
          className={classes.stepper}
          variant="dots"
          steps={maxSteps}
          position="static"
          variant="text"
          activeStep={activeStep}
          nextButton={
            <Button
              className={classes.slidesController}
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
              className={classes.slidesController}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
            </Button>
          }
        />
      )}
    </div>
  );
}
