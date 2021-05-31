import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { UserConext } from '../../App';


const PrivetRoute = ({ children, ...rest }) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserConext);
    // const [email, name] = user;
    return (
        <Route
        {...rest}
        render={({ location }) =>
        loggedInUser.email || loggedInUser.name ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
};

export default PrivetRoute;