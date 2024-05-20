import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PersonaList from './pages/personas/PersonaList.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import PersonaForm from './pages/personas/PersonaForm.jsx';
import MascotaForm from './pages/mascotas/MascotaForm.jsx';
import MascotaList from './pages/mascotas/MascotaList.jsx';
import LoginForm from './pages/auth/LoginForm.jsx';
import RegisterForm from './pages/auth/RegisterForm.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Page404 from './pages/Page404.jsx';
const router = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  {
    path: "/personas",
    element: <PersonaList />,
  },
  {
    path: "/personas/create",
    element: <PersonaForm />
  },
  {
    path: "/personas/:id",
    element: <PersonaForm />
  },
  {
    path: "/mascotas",
    element: <MascotaList />,
  },
  {
    path: "/mascotas/create",
    element: <MascotaForm />
  },
  {
    path: "/mascotas/:id",
    element: <MascotaForm />
  }, {
    path: "/login",
    element: <LoginForm />
  },
  {
    path: "/register",
    element: <RegisterForm />
  },
  {
    path: "*",
    element: <Page404 />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
