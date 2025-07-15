import { Navigate } from "react-router";
import HomePage from "./pages/Dashboards/HomePage";
import LoginPage from "./pages/Dashboards/LoginPage";
import RegisterPage from "./pages/Dashboards/RegisterPage";
import DoctoresPage from "./components/Doctores/DoctoresPage.jsx";
import AgregarDoctorPage from "./components/Doctores/AgregarDoctorPage.jsx";
import ClientesPage from "./components/Clientes/ClientesPage.jsx";
import AgendarCitaPage from "./components/Citas/AgendarCitaPage";
import MisCitasPage from './components/Citas/MisCitasPage.jsx';



const routes = [
  { path: "/HomePage", element: <HomePage /> },
  { path: "/", element: <Navigate to={"/Homepage"} /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/Register", element: <RegisterPage /> },
  { path: "/doctores", element: <DoctoresPage /> },
  { path: "/agregar-doctor", element: <AgregarDoctorPage /> },
  { path: "/clientes", element: <ClientesPage /> },
  { path: "/agendar-cita", element: <AgendarCitaPage /> },
  { path: "/mis-citas", element: <MisCitasPage /> }, 



];

export default routes;

