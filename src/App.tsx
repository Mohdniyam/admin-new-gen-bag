import { BrowserRouter, useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { appRoutes } from "./routes";

function AppRoutes() {
  return useRoutes(appRoutes);
}

export function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <ToastContainer autoClose={1000} />
    </>
  );
}

export default App;
