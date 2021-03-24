import React, { useCallback, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Button from '@material-ui/core/Button';
import { withFirebase } from '../../Firebase';

const SignOut = ({ history, firebase }) => {
  const [errors, setErrors] = useState();

  const handleSignOut = useCallback(async () => {
    try {
      await firebase.auth().signOut();
      history.push('/');
    } catch (error) {
      setErrors(error);
    }
  }, [history, firebase]);

  return (
    <>
      <Button onClick={() => handleSignOut()} variant="outlined" type="button">
        Sign out
      </Button>
      {errors && <p>{errors.message}</p>}
    </>
  );
};

export default compose(withFirebase, withRouter)(SignOut);
