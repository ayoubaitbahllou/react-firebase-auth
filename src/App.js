import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Fragment } from "react"
import Dashboard from "./components/Dashboard"
import Register from "./components/Register"
import Login from "./components/Login"
import Navbar from "./components/Navbar"
import { app } from './config/firebaseConfig';
import 'bootstrap';
import './App.css';
import { 
  Container
} from '@mui/material';
//
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut   
} from 'firebase/auth'


function App() {
  const authentication = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const loginandregisterRedirection = (token) => {
    window.location = '/dashboard';
    sessionStorage.setItem('Auth Token', token)
  }

  const register = (email, password) => {

    createUserWithEmailAndPassword(authentication, email, password)
    .then(res => {
      loginandregisterRedirection(res._tokenResponse.refreshToken);
    })
  }

  const login = (email, password) => {
    signInWithEmailAndPassword(authentication, email, password)
    .then(res => {
      loginandregisterRedirection(res._tokenResponse.refreshToken);
    })
  }
  
  const LoginWithGoogle = () => {
    signInWithPopup(authentication, googleProvider)
      .then((res) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(res);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = res.user;
          loginandregisterRedirection(token);
          // ...
      }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
      });
  }

  const LoginWithFacebook = () => {
    signInWithPopup(authentication, facebookProvider)
      .then((result) => {
          // The signed-in user info.
          const user = result.user;

          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          const credential = FacebookAuthProvider.credentialFromResult(result);
          const accessToken = credential.accessToken;
          loginandregisterRedirection(accessToken);
          // ...
      })
      .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = FacebookAuthProvider.credentialFromError(error);

          // ...
      });
  }


  const SignOut = () => {
    signOut(authentication)
    .then(() => {
      // Sign-out successful.
      sessionStorage.removeItem('Auth Token')
      window.location = "/"
    }).catch((error) => {
      // An error happened.
    });
  }
  

  return (
    <Fragment>
      <Navbar SignOut={SignOut} />
      <Container maxWidth="md">
        <Router>
          <Routes>
            <Route exact path='/' element={<Login LoginWithGoogle={LoginWithGoogle} LoginWithFacebook={LoginWithFacebook} login={login} />} />
            <Route path='/register' element={<Register register={register}/>} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </Router>
      </Container>
    </Fragment>
  );
}

export default App;
