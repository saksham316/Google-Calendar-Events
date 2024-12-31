import { useAppSelector } from "../redux/store";

export const useAuth = () => {
  const authData = useAppSelector((state) => state.auth);

  const userData = authData.userData ? authData.userData : {};
  const isAuthenticated = authData.isAuthenticated
    ? authData.isAuthenticated
    : false;

  return { userData, isAuthenticated };
};
