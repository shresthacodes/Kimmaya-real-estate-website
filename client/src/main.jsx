import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { MantineProvider } from "@mantine/core";
import Chatbot from "./components/Chatbot/Chatbot";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-113517yyeno8vowx.us.auth0.com"
      clientId="yhr7XONhcdhwUy66jtZvUfiMVwIFdaDG"
      authorizationParams={{
        redirect_uri: "https://kimmaya-client.vercel.app",
      }}
      audience="https://kimmaya-real-estate-website.vercel.app"
      scope="openid profile email"
    >
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <App />
      </MantineProvider>
    </Auth0Provider>
  </React.StrictMode>
);
