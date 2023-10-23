import React from 'react';
import ReactDOM from 'react-dom/client';
import 'reflect-metadata'
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {container} from './ioc';
import {ContainerProvider} from './containerContext';
import UserIncoComponent from './components/UserIncoComponent';
import LoginForm from './routes/Login';
import RegisterForm from './routes/register';
import Auth from './routes/auth';

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserIncoComponent />,
  },
  {
    path: '', element: <Auth />,
    children: [

      {
        path: '/login',
        element: <LoginForm />
      },
      {
        path: '/register',
        element: <RegisterForm />
      },
    ]
  },
]);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ContainerProvider value={container}>
      <RouterProvider router={router} />
    </ContainerProvider>
  </React.StrictMode>
);
