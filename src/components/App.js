import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GoogleFontLoader from 'react-google-font-loader';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import AuthProvider from './Auth/Auth';
import PrivateRoute from './Auth/PrivateRoute';
import Home from './Home';
import Login from './Login';
import SignUp from './Auth/SignUp';
import SignOut from './Auth/SignOut';
import User from './User';
import SaunaMap from './SaunaMap';
import Sensors from './Sensors';
import CreateSauna from './Sauna/CreateSauna';
import Footer from './Footer';
import SaunaPage from './Sauna/SaunaPage';
import UserSaunaList from './Sauna/GetUserSauna';
import CookiePolicy from './CookiePolicy'
import UserEdit from './UserEdit'
import Temp from './Temp'
import StripeExample from './Stripe/StripeExample';
import Pay from './Pay';


const saunaTheme = createMuiTheme({
  palette: { primary: { main: '#6a8e7f' } }
});

function App() {
  return (
    <AuthProvider>
      <GoogleFontLoader
        fonts={[
          {
            font: 'Roboto',
            weights: [400]
          },
          {
            font: 'Roboto Mono',
            weights: [400, 700]
          },
          {
            font: 'Lobster',
            weights: [400]
          }
        ]}
        subsets={['cyrillic-ext', 'greek']}
      />
      <Router>
        <MuiThemeProvider theme={saunaTheme}>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />

          <Route exact path="/map" component={SaunaMap} />
          <Route exact path="/signout" component={SignOut} />
          <Route exact path="/user" component={User} />
          <Route exact path="/sensors" component={Sensors} />
          <Route exact path="/cookies" component={CookiePolicy} />
          <Route exact path="/user/edit" component={UserEdit} />
          <Route exact path="/ownsauna" component={UserSaunaList} />
          <PrivateRoute exact path="/createsauna" component={CreateSauna} />
          <Route exact path="/sauna/:id" component={SaunaPage} />
          <Route exact path="/pay" component={StripeExample} />
          <Route exact path="/payment-success" component={Pay} />
          <Footer />
          <Route exact path="/temp" component={Temp} />
        </MuiThemeProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
