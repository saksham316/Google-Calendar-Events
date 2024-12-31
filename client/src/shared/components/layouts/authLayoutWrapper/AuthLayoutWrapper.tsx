import { useAuth } from "../../../../hooks/authHook";
import { AuthLayout } from "../authLayout/AuthLayout";
import { UnAuthLayout } from "../unAuthLayout/UnAuthLayout";

const AuthLayoutWrapper = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AuthLayout /> : <UnAuthLayout />;
};

export { AuthLayoutWrapper };
