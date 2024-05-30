import './App.css';
import Users from './components/users/Users';
import Adduser from './components/adduser/Adduser';
import Navigation from './components/navbar/Navigation';
import { createBrowserRouter,Router,RouterProvider } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import ErrorPage from './components/ErrorPage';

function App() {

  const browserobj=createBrowserRouter(
    [
      {
        path:"/",
        element:<RootLayout/>,
        errorElement:<ErrorPage/>,
        children:[
          {
            path:"/",
            element:<Adduser/>
          },
          {
            path:"/users",
            element:<Users/>
          }
        ]
      }
    ]
  )
  return (
    <div >
      <RouterProvider router={browserobj}/>
    </div>
  );
}

export default App;
