import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserConext } from '../../App'
import { useHistory, useLocation } from 'react-router';


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserConext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = { name: displayName, email }
                setLoggedInUser(signedInUser);
                storeAuthToken();
                history.replace(from);

            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }


    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    const handleFacebookSignIn = () => {
        firebase
            .auth()
            .signInWithPopup(facebookProvider)
            .then((result) => {
                var credential = result.credential;
                const { displayName } = result.user;
                const signedInUser = { name: displayName }
                setLoggedInUser(signedInUser);
                
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }

    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
            .then(function (idToken) {
                sessionStorage.setItem('token',idToken);
                history.replace(from);
            }).catch(function (error) {
                // Handle error
            });
    }
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Google Sign In</button>
            <button onClick={handleFacebookSignIn}>Facebook Sign In</button>
        </div>
    );
};

export default Login;