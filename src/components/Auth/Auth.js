import React, { useEffect, useState } from 'react';
import { withFirebase } from '../../Firebase';

export const AuthContext = React.createContext();

const AuthProvider = ({ children, firebase }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setCurrentUser);
  }, [firebase]);

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default withFirebase(AuthProvider);
