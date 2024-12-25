import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase.init";
import axios from "axios";

export const Context = createContext(null);

const ContextProvider = ({ children }) => {
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });
  // user
  const [user, setuser] = useState(null);
  // loading
  const [loading, setLoading] = useState(true);
  // dark theme togol
  const [togol, setTogol] = useState(true);

  // login user
  const loginUser = (email, pass) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };

  // googleLogin
  const googleProvider = new GoogleAuthProvider();
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // register user

  const createUser = (email, pass) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  // update user
  const updateProfiles = (userDetails) => {
    return updateProfile(auth.currentUser, userDetails);
  };

  // manage user

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setuser(currentUser);
      if (currentUser?.email) {
        const user = { email: currentUser.email };
        axios
          .post(`http://localhost:5000/jwt`, user, { withCredentials: true })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .post(
            `http://localhost:5000/jwtLogout`,
            {},
            {
              withCredentials: true,
            }
          )
          .then((res) => console.log(res.data));
      }
      setLoading(false);
    });
    return () => {
      unsubscribe;
    };
  }, []);

  // logout
  const logout = () => {
    setLoading(false);
    return signOut(auth);
  };

  const authInfo = {
    // formData,
    user,
    loading,
    togol,
    setTogol,
    setLoading,
    setuser,
    // setFormData,
    loginUser,
    googleLogin,
    createUser,
    updateProfiles,
    logout,
  };

  return <Context.Provider value={authInfo}>{children} </Context.Provider>;
};

export default ContextProvider;
ContextProvider.propTypes = {
  children: PropTypes.element,
};
