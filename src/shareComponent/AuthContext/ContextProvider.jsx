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
    return signInWithEmailAndPassword(auth, email, pass);
  };

  // googleLogin
  const googleProvider = new GoogleAuthProvider();
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // register user

  const createUser = (email, pass) => {
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
