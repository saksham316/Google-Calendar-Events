// -----------Imports------------
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Routes } from "./routes";
import { ToastContainer } from "react-toastify";

// ------------------------------
const router = createBrowserRouter([Routes()]);
// ------------------------------
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer theme="colored" hideProgressBar autoClose={1000} />
    </>
  );
}

export default App;
