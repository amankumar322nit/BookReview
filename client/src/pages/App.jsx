import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "../layout.jsx";
import Login from "./Login.jsx";
import Books from "./Books.jsx";
import { Product } from "../components/ProductDetails/Product.jsx";
import FavBooks from "./FavBooks.jsx";
import Signup from "./SignUp.jsx";

function App() {

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
    <Route path='/' element={<Layout />}>
    <Route path="/" element={<Books/>}></Route>
    <Route path='/:productId' element={<Product/>}></Route>
    <Route path='/fav' element={<FavBooks/>}></Route>
    </Route>
    <Route path='/signup' element={<Signup/>}>
    </Route>
    <Route path='/login' element={<Login/>}>
    </Route>
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
