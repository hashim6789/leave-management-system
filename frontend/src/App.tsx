import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "sonner";
import AppRoutes from "./routers/AppRoutes";

export default function App() {
  return (
    <Provider store={store}>
      <Toaster />
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  );
}
