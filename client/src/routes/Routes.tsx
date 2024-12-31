// -----------Imports------------
import {
  AuthLayoutWrapper,
  NotFound,
  ProtectedRoutesLayout,
} from "../shared/components";

// ------------------------------
// ------------------------------

export const Routes = () => {
  return {
    path: "/",
    element: <AuthLayoutWrapper />,
    children: [
      {
        index: true,
        path: "/",
        element: <ProtectedRoutesLayout />,
      },
      {
        element: <NotFound />,
        path: "*",
      },
    ],
  };
};
