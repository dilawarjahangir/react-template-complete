import guest_routes from "./guest";
import admin_routes from "./admin";
import auth_routes from "./auth";
import app_routes from "./app";

const routes = [
  {
    prefix: "/admin",
    routes: admin_routes,
  },
  {
    prefix: "/",
    routes: auth_routes,
  },
  {
    prefix: "/",
    routes: guest_routes,
  },
  {
    prefix: "/", 
    routes: app_routes
  },

];

export default routes;
