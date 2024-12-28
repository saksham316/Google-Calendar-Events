import { GoogleOAuthProvider } from "@react-oauth/google";
import { Outlet } from "react-router-dom";

export const UnAuthLayout = () => {
  return (
    <>
      <GoogleOAuthProvider
        clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}
      >
        <Outlet />
      </GoogleOAuthProvider>
    </>
  );
};
