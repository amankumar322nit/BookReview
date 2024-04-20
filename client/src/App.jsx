import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "./layout.jsx";

function App() {

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
    </Route>
  )
)
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
    <RouterProvider router={router} />
    </div>
  )
}

export default App;
