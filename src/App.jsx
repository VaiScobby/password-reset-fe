import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify";
import Reset from "./pages/Reset";
import Login from "./pages/Login";
import Sign from "./pages/Sign";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Login />
        <ToastContainer id="toast" />
      </div>
    ),
  },
  {
    path: "/signin",
    element: (
      <div>
        <Sign />
        <ToastContainer id="toast" />
      </div>
    ),
  },
  {
    path: "/forgot",
    element: (
      <div>
        <Home />
        <ToastContainer id="toast" />
      </div>
    ),
  },
  {
    path: "/verify/:key",
    element: (
      <div>
        <Verify />
        <ToastContainer id="toast" />
      </div>
    ),
  },
  {
    path: "/reset/:key",
    element: (
      <div>
        <Reset />
        <ToastContainer id="toast" />
      </div>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
