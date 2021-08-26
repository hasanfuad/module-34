import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  frameworkForLoginInitialize,
  handleGoogleSignIn,
  handleSignOutBtn,
  signInWithEmailAndPassword,
  //   updateUserName,
} from "./LoginManager";

function Login() {
  frameworkForLoginInitialize();
  //   updateUserName();

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    error: "",
    success: "",
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true)
    });
  };

  const signOutBtn = () => {
    handleSignOutBtn().then((res) => {
      handleResponse(res, false);
    });
  };

  const handleForm = (e) => {
    let isFieldValid = true;

    if (e.target.name === "email") {
      const isValidMail = /\S+@\S+\.\S+/.test(e.target.value);
      isFieldValid = isValidMail;
    }

    if (e.target.name === "password") {
      const isValidLength = e.target.value.length > 6;
      const isPassValid = /\d{1}/.test(e.target.value);
      isFieldValid = isValidLength && isPassValid;
    }

    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          handleResponse(res, true);
        }
      );
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((res) => {
        handleResponse(res, true);
      });
    }

    e.preventDefault();
  };

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {user.isSignedIn && (
        <div>
          <h2>Welcome Mr. {user.displayName.toUpperCase()}</h2>
          <p>Email: {user.email}</p>
        </div>
      )}
      {user.isSignedIn ? (
        <button onClick={signOutBtn}>Sign Out</button>
      ) : (
        <button onClick={googleSignIn}>Sign In with google</button>
      )}

      {user.success ? (
        <p style={{ color: "green" }}>{user.success}</p>
      ) : (
        <p style={{ color: "red" }}>{user.error}</p>
      )}

      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
        id=""
      />
      <label htmlFor="newUser">New User Sign Up</label>

      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            type="text"
            name="name"
            onBlur={handleForm}
            placeholder="Enter name"
          />
        )}
        <br />
        <input
          type="text"
          name="email"
          onBlur={handleForm}
          placeholder="Enter email"
          required
        />
        <br />
        <input
          type="password"
          name="password"
          onBlur={handleForm}
          placeholder="Enter password"
          required
        />
        <br />
        <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
      </form>
    </div>
  );
}

export default Login;
