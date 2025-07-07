import { Navigate } from "react-router";
import HomePage from "./pages/Dashboards/HomePage";
import ContactList from "./components/contact/ContactList"
import HelpList from "./components/contact/HelpList"
import LoginPage from "./pages/Dashboards/LoginPage"
import RegisterPage from "./pages/Dashboards/RegisterPage"
import DoctoresPage from "./components/Doctores/DoctoresPage.jsx"
import AgregarDoctorPage from "./components/Doctores/AgregarDoctorPage.jsx";
import ClientesPage from "./components/Clientes/ClientesPage.jsx";



const routes = [
    {path: "/HomePage", element: <HomePage />},
    {path: "/", element: <Navigate to={"/Homepage"}/>},
    {path: "/ContactList", element: <ContactList />},
    {path: "/HelpList", element: <HelpList />},
    {path: "/login", element: <LoginPage />},
    {path: "/Register", element: <RegisterPage />},
    {path: "/doctores", element: <DoctoresPage />},
    { path: '/agregar-doctor', element: <AgregarDoctorPage /> },
    { path: "/clientes", element: <ClientesPage /> },




]

export default routes
