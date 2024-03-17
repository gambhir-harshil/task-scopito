import Dashboard from "./Dashboard";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Pdf from "./Pdf";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/pdf",
      element: <Pdf />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
