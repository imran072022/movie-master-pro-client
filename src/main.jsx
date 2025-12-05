import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import router from "./Routes/Routes";
import AuthProvider from "./Providers/AuthProvider";
import WatchlistProvider from "./Providers/WatchlistProvider";
import { Toaster } from "react-hot-toast";
import ThemeProvider from "./Providers/ThemeProvider";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <WatchlistProvider>
          <Toaster />
          <RouterProvider router={router}></RouterProvider>
        </WatchlistProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
