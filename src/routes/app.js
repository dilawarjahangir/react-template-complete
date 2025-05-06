import AuthMiddleware from "../middleware/AuthMiddleware";
import TextForm from "../pages/app/TextForm/TextForm";
import Dashboard from "../pages/app/Dashboard/Dashboard";
import History from "../pages/app/History/History";

const app_routes = {
  "/": AuthMiddleware(Dashboard),        // default after login
  "/text-input": AuthMiddleware(TextForm),
  "/history": AuthMiddleware(History),
};

export default app_routes;
