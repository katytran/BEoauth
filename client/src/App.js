import "./App.css";
import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import GitHubLogin from "react-github-login";

import api from "./apiService";
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const FB_APP_ID = process.env.REACT_APP_FB_APP_ID;
const GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
const Login = ({ user }) => {
  return (
    <div>
      <h1>You are logged in</h1>
      <h1>Welcome {user.name}</h1>
    </div>
  );
};

function App() {
  const [user, setUser] = useState({
    name: "",
    password: "",
  });
  const oauthLogin = async (user, authProvider) => {
    const access_token = user.accessToken;
    const url = `/api/auth/login/${authProvider}`;
    const res = await api.post(url, { access_token, user });
    const newUser = res.data.user;
    console.log("new user", newUser);
    if (newUser) {
      newUser.authenticated = true;
      newUser.provider = authProvider;
      setUser(newUser);
    }
  };

  const oauthLoginGitHub = async (user, authProvider) => {
    const access_token = user.code;
    console.log(access_token);
    const url = `/api/auth/login/${authProvider}`;
    const res = await api.post(url, { access_token, user });
    const newUser = res.data.user;
    console.log("new user", newUser);
    if (newUser) {
      newUser.authenticated = true;
      newUser.provider = authProvider;
      setUser(newUser);
    }
  };
  return (
    <div className="App">
      <h1>Login Page</h1>
      {user.authenticated ? (
        <Login user={user} />
      ) : (
        <>
          <FacebookLogin
            appId={FB_APP_ID}
            icon="fa-facebook"
            fields="name,email,picture"
            callback={(u) => oauthLogin(u, "facebook")}
            onFailure={() => console.log("Facebook Login Failure")}
          />
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={(u) => oauthLogin(u, "google")}
            onFailure={() => console.log("Google Login Failure")}
          />
          <GitHubLogin
            clientId={GITHUB_CLIENT_ID}
            redirectUri=""
            onSuccess={(u) => oauthLoginGitHub(u, "github")}
            onFailure={(response) => console.log(response)}
          />
        </>
      )}
    </div>
  );
}

export default App;
