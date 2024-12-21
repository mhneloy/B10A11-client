import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { route } from "./routes/route";
import ContextProvider from "./shareComponent/AuthContext/ContextProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={route} />
    </ContextProvider>
  </StrictMode>
);
