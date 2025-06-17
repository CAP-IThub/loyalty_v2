import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/Store";
import { loadUser } from "./slices/authSlice";
import { setLogoutCallback } from "./utils/axiosInstance";
import { logoutUser } from "./slices/authSlice";
import { SageProvider } from "./context/SageContext";

store.dispatch(loadUser(null));

setLogoutCallback(() => {
  store.dispatch(logoutUser());

  const userType = localStorage.getItem("user_type");

  if (userType === "admin") {
    window.location.href = "/admin-login";
  } else {
    window.location.href = "/";
  }
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SageProvider>
          <App />
        </SageProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
