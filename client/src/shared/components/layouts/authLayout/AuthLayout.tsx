import "./authLayout.css";
import { Outlet } from "react-router-dom";
import { Header } from "../../header/Header";

export const AuthLayout = () => {
  return (
    <>
      <Header />
      <div className="auth-layout-main">
        <Outlet />
      </div>
    </>
  );
};
