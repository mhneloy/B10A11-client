import { useContext } from "react";
import { Context } from "./ContextProvider";

const useCustomContex = () => {
  const context = useContext(Context);
  return context;
};

export default useCustomContex;
