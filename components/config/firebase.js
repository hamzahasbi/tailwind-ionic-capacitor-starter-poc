
import * as app from '@firebase/app';
import React from 'react';
import {firebaseConfig} from './variables.env';

let Firebase;

if (!app.firebase.apps.length) {
    Firebase = app.firebase.initializeApp(firebaseConfig);
} else {
    Firebase = app.firebase.app;
}

const FirebaseContext = React.createContext(null);

const withFirebase = (Component) => (props) => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export {Firebase, FirebaseContext, withFirebase};