/**
 * What to do:
 * ===
 * 1. Install the google login using 3rd party library or react most famous library
 * 2. Configure google login
 * 3. and try google login works or not
 * 
 */

import React from 'react'
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import {auth} from 'firebaseui'

const firebaseConfig = {
  apiKey: "AIzaSyDUCJVqwCyz2EVMPOHTzb2mOEbrSPFRgh4",
  authDomain: "students-project-258de.firebaseapp.com",
  projectId: "students-project-258de",
  storageBucket: "students-project-258de.appspot.com",
  messagingSenderId: "665500347102",
  appId: "1:665500347102:web:8121cdd201c3abbb40704f",
  measurementId: "G-3C7EN7NEW9"
};

// Initialize Firebase and Analytics
firebase.initializeApp(firebaseConfig);

var ui = new auth.AuthUI(firebase.auth());

ui.start('#firebaseui-auth-container', {
  signInOptions: [
    // List of OAuth providers supported.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  // Other config options...
});

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {

      console.log('authResult: ', authResult)
      console.log('redirectUrl: ', redirectUrl)

      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return false;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'redirect',
  signInSuccessUrl: '/',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start('#firebaseui-auth-container', uiConfig);

export const Login = () => {



  return (
    <div>
      <h1>Welcome to My Awesome App</h1>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>
    </div>
  )
}