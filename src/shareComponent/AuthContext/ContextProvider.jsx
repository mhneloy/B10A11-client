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
  const [user, setuser] = useState(null);
  // loading
  const [loading, setLoading] = useState(true);
  // dark theme togol
  const [togol, setTogol] = useState(
    localStorage.getItem("marathonTheme") === "true"
  );

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
        console.log(user, "hello user");
        axios
          .post(`https://server-site-ashen.vercel.app/jwt`, user, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .post(
            `https://server-site-ashen.vercel.app/jwtLogout`,
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
      unsubscribe();
    };
  }, []);

  // logout
  const logout = () => {
    setLoading(false);
    return signOut(auth);
  };

  const authInfo = {
    user,
    loading,
    togol,
    setTogol,
    setLoading,
    setuser,
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
