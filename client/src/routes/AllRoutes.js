import Login from "../screens/nonAuth/Login";
import Register from "../screens/nonAuth/Register";
import Dashboard from "../screens/auth/Dashboard";
import Home from "../screens/users/Home";
import About from "../screens/users/About";
import Contact from "../screens/users/Contact";
import ForgotPassword from "../screens/nonAuth/ForgotPassword";
import Profile from "../screens/auth/Profile";
import Users from "../screens/auth/Users";

export const authRoutes = [
  {
    path: "/dashboard",
    component: <Dashboard />,
  },
  {
    path: "/users",
    component: <Users />,
  },
  {
    path: "/profile",
    component: <Profile />,
  },
];

export const nonAuthRoutes = [
  {
    path: "/admin-login",
    component: <Login />,
  },
  {
    path: "/register",
    component: <Register />,
  },
  {
    path: "/forgot-password",
    component: <ForgotPassword />,
  },
];

export const userRoutes = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/about",
    component: <About />,
  },
  {
    path: "/contact",
    component: <Contact />,
  },
];
