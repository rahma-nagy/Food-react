// FacebookLoginButton.js

import React from 'react';
import { FacebookProvider, LoginButton } from 'react-facebook-sdk';

const FacebookLoginButton = ({ onLogin }) => {
  const handleResponse = (data) => {
    onLogin(data);
  };

  return (
    <FacebookProvider appId="Your-Facebook-App-ID">
      <LoginButton
        scope="email"
        onCompleted={handleResponse}
        onError={(error) => console.log('Facebook login error', error)}
      >
        <span>Login Facebook</span>
      </LoginButton>
    </FacebookProvider>
  );
};

export default FacebookLoginButton;
