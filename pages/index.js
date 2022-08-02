import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../firebase/clientApp';
import 'firebase/compat/auth';

const uiConfig = {
    signInFlow : 'popup',
    signInSuccessUrl : '/chatroom',
    signInOptions : [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ]
}

const auth = firebase.auth()


function signIn() {
    // const signInwithGoogle = () => {
    //     const provider = firebase.auth.GoogleAuthProvider;
    //     auth.signInWithPopup(provider);
    // }
  return (
    <div>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}></StyledFirebaseAuth>
    </div>
  )
}

export default signIn