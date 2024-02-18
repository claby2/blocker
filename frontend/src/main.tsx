import ReactDOM from 'react-dom/client';
import Home from './Home.tsx';
import App from './App.tsx';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  { path: "/build", element: <App /> },
  { path: "/", element: <Home /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)
