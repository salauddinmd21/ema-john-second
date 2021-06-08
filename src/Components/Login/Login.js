 
import firebase from "firebase/app";
import "firebase/auth";
import { useContext, useState } from "react";
import firebaseConfig from "./firebase.config";
import {UserContext} from '../../App'
import { useHistory, useLocation } from "react-router";
// import { useContext, useState } from "react";
// import UserContext from '../../App'
 
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
    password: "",
  });
 const [loggedInUser, setLoggedInUser] =  useContext(UserContext);
  const history = useHistory()
  const location = useLocation()
  const { from } = location.state || { from: { pathname: "/" } };

  var googleProvider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  const handelSingIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        const { displayName, email, photoURL } = res.user;
        const logInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(logInUser);
        console.log(displayName, email, photoURL);
      })
      .catch((err) => console.log(err));
  };
  const handleFbSignIN = () => {
    firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
  
      // The signed-in user info.
      var user = result.user;
      console.log('after fb login', user)
  
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var accessToken = credential.accessToken;
  
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
  
      // ...
    });
  }

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        const isSignOut = {
          isSignedIn: false,
          name: "",
          email: "",
          photo: "",
          error: "",
          success: false,
        };
        setUser(isSignOut);
      })
      .catch((err) => console.log(err));
  };
  const handleBlur = (e) => {
    // console.log(e.target.name, e.target.value)
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      // console.log(isFieldValid)
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const isPasswordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && isPasswordHasNumber;
      //  console.log(isFieldValid)
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };
  const handleSubmit = (e) => {
    console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      console.log("clicked submit");
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo)
          history.replace(from);
          updateUserName(user.name);

          console.log(res);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          
          // var errorMessage = error.message;
          // console.log(errorCode, errorMessage)
        });
    }
    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo)
          history.replace(from);
          console.log("sign is user info", res.user);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();
  };
  const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then(function () {
        console.log("update username successfully");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="App">
      {user.isSignedIn ? (
        <button onClick={handleSignOut}>Sign out</button>
      ) : (
        <button onClick={handelSingIn}>Sign in</button>
      )}
      <br />
      <button onClick={handleFbSignIN}> Sign in with facebook</button>
      {user.isSignedIn && (
        <div>
          <p>welcome, {user.name} </p>
          <p>email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
      <div>
        <h1>Our own Authentication</h1>
        <input
          type="checkbox"
          onChange={() => setNewUser(!newUser)}
          name="newUser"
          id=""
        />
        <label htmlFor="newUser"> New User Sign In</label>
        <form onSubmit={handleSubmit}>
          {newUser && ( <input
              onBlur={handleBlur}
              name="name"
              placeholder="your name"
              type="text"
            />
          )}
          <br />
          <input
            type="text"
            onBlur={handleBlur}
            placeholder="enter your email"
            name="email"
            required
          />
          <br />
          <input
            type="password"
            onBlur={handleBlur}
            placeholder="password"
            name="password"
            required
          />
          <br />
          <input type="submit" value={newUser ? " Sing Up" : "Sign in"} />
        </form>
        <p style={{ color: "red" }}>{user.error}</p>
        {user.success && (
          <p style={{ color: "green" }}>
            User {newUser ? "created" : "logged in"} successfully
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
