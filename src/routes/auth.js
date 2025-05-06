import SignUp from "../pages/auth/Signup/SignUp.jsx";
import SignIn from "../pages/auth/Login/SignIn.jsx";
import Logout from "../pages/auth/Logout/Logout.jsx";

const auth_routes = {
  "/login": SignIn,
  "/logout": Logout,
  "/signup": SignUp,
};

export default auth_routes;
