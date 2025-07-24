import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from '../Dashboards/Sidebar.jsx'; // Asegúrate que esta ruta sea CORRECTA


const medicalServices = [
  {
    id: 1,
    title: "Consulta General",
    description:
      "Atención médica integral para toda la familia. Diagnóstico y tratamiento de enfermedades comunes.",
    image:
      "https://centromedicoabc.com/storage/2024/04/Un-medico-general.webp",
  },
  {
    id: 2,
    title: "Cardiología",
    description:
      "Cuidado especializado para la salud de tu corazón. Diagnóstico y prevención de enfermedades cardíacas.",
    image:
      "https://olympia.quironsalud.com/es/medical-center/cardiologia.ficheros/3275379-olympia-cardiologia.jpg?width=790&height=526",
  },
  {
    id: 3,
    title: "Pediatría",
    description:
      "Atención dedicada a la salud y desarrollo de los más pequeños. Consultas de crecimiento y vacunación.",
    image:
      "https://centromedicoabc.com/storage/2022/12/pediatria.jpg",
  },
  {
    id: 4,
    title: "Dermatología",
    description:
      "Expertos en el cuidado de tu piel. Diagnóstico y tratamiento de afecciones cutáneas.",
    image:
      "https://www.esneca.lat/wp-content/uploads/especialidades-en-dermatologia.jpg",
  },
];

const medicalSpecialties = [
  {
    id: 1,
    title: "Ginecología",
    description: "Salud integral para la mujer en todas las etapas de su vida.",
    image:
      "https://aisafiv.com/wp-content/uploads/2019/11/que-es-la-ginecologia-zaragoza.jpg",
  },
  {
    id: 2,
    title: "Odontología",
    description: "Expertos en salud bucal para una sonrisa sana y radiante.",
    image:
      "https://faceclinic.es/wp-content/uploads/2024/08/odontologia-conservadora.jpeg",
  },
  {
    id: 3,
    title: "Oftalmología",
    description: "Diagnóstico y tratamiento de enfermedades oculares.",
    image:
      "https://aio-oftalmologia.com/wp-content/uploads/De-que-se-ocupa-un-oftalmologo.jpg",
  },
  {
    id: 4,
    title: "Fisioterapia",
    description:
      "Rehabilitación y mejora de la movilidad a través de terapias físicas.",
    image:
      "https://chronicfisioterapia.com/wp-content/uploads/2023/02/fisioterapia-traumatologica_2-e1676193365519.jpeg",
  },
];

const contactMethods = [
  {
    id: 1,
    title: "Citas Telefónicas",
    details: "123-MEDICO (633426)",
  },
  {
    id: 2,
    title: "Nuestras Clínicas",
    details: "Varias ubicaciones en Guatemala",
  },
  {
    id: 3,
    title: "App Paciente",
    details: "Disponible en iOS y Android",
  },
];

const carouselItems = [
  {
    id: 1,
    image:
      "https://cdn.lecturio.com/assets/Featured-image-Student-Blog-Hospital-Team.jpg",
    title: "Tu Salud, Nuestra Prioridad",
    description:
      "Descubre nuestros servicios integrales de atención médica y agenda tu cita online fácilmente.",
  },
  {
    id: 2,
    image:
      "https://www.shutterstock.com/image-photo/doctor-talking-patient-hospital-600nw-2182069255.jpg",
    title: "Expertos a tu Cuidado",
    description: "Contamos con un equipo de especialistas dedicados a tu bienestar.",
  },
  {
    id: 3,
    image:
      "https://www.shutterstock.com/image-photo/young-female-doctor-using-digital-600nw-1644728560.jpg",
    title: "Tecnología de Vanguardia",
    description:
      "Diagnósticos precisos y tratamientos avanzados para una atención de calidad.",
  },
];

export default function MedicalHomePage() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeMenu, setActiveMenu] = useState("home");
  const [role, setRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem("role") || "CLIENT_ROLE";
    setRole(userRole);

    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === carouselItems.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? carouselItems.length - 1 : prev - 1
    );
  };

  const renderMainContent = () => {
    switch (activeMenu) {
      case "home":
        return (
          <>
            {/* La cabecera original. En pantallas grandes (md en adelante), la nav interna será visible.
                En pantallas pequeñas, esta nav puede considerarse redundante si el Sidebar es la principal.
                La dejo como estaba en tu código original, solo ten en cuenta esta consideración.
            */}
            <header className="bg-gradient-to-r from-red-700 to-red-600 shadow-lg">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="bg-white p-2 rounded-full">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2800/2800318.png"
                      alt="Logo Clínica Salud"
                      className="h-8 w-8 object-contain"
                    />
                  </div>
                  <h1 className="text-2xl font-bold text-white tracking-wide">
                    Clínica Salud Guatemala
                  </h1>
                </div>
                <nav className="hidden md:flex space-x-6"> {/* Esta nav se oculta en mobile */}
                  <Link to="/HomePage" className="text-white hover:text-red-100 font-medium transition-colors">Inicio</Link>
                  <Link to="/services" className="text-white hover:text-red-100 font-medium transition-colors">Servicios</Link>
                  <Link to="/specialties" className="text-white hover:text-red-100 font-medium transition-colors">Especialidades</Link>
                  <Link to="/about" className="text-white hover:text-red-100 font-medium transition-colors">Nosotros</Link>
                </nav>
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="bg-white text-red-800 hover:bg-red-100 font-medium py-2 px-6 rounded-full transition-colors shadow-md"
                  >
                    Cerrar Sesión
                  </button>
                ) : (
                  <button
                    className="bg-white text-red-800 hover:bg-red-100 font-medium py-2 px-6 rounded-full transition-colors shadow-md"
                    onClick={() => navigate("/login")}
                  >
                    Inicia Sesión
                  </button>
                )}
              </div>
            </header>

            {/* Resto de contenido de la página de inicio */}
            <section className="relative mb-16 h-[500px] md:h-[600px] overflow-hidden">
              <div className="absolute inset-0 transition-opacity duration-700 ease-in-out">
                <img
                  src={carouselItems[currentSlide].image}
                  alt={carouselItems[currentSlide].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center p-6">
                  <div className="text-white text-center max-w-3xl">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-up">
                      {carouselItems[currentSlide].title}
                    </h2>
                    <p className="text-lg md:text-xl mb-8 opacity-90 animate-fade-in-up delay-200">
                      {carouselItems[currentSlide].description}
                    </p>
                    <button
                        onClick={() => navigate('/agendar-cita')}
                        className="bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 animate-fade-in-up delay-400"
                            >
                              Agendar Cita Ahora
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm hover:bg-white/50 p-3 rounded-full text-white transition-all z-10"
                aria-label="Anterior"
              >
                <span className="h-6 w-6 block transform rotate-180">→</span>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm hover:bg-white/50 p-3 rounded-full text-white transition-all z-10"
                aria-label="Siguiente"
              >
                <span className="h-6 w-6 block">→</span>
              </button>
              <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3 z-10">
                {carouselItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-3 w-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? "bg-white w-8" : "bg-white/50"
                    }`}
                    aria-label={`Ir a la diapositiva ${index + 1}`}
                  />
                ))}
              </div>
            </section>

            <section className="py-16 bg-white max-w-7xl mx-auto rounded-xl shadow-lg mb-16 px-6 lg:px-8">
              <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
                Nuestros Servicios Esenciales
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {medicalServices.map((service) => (
                  <div
                    key={service.id}
                    className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="p-6 bg-white">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {service.description}
                      </p>
                      <Link
                        to={`/service/${service.id}`}
                        className="inline-flex items-center text-red-600 hover:text-red-800 font-medium transition-colors"
                      >
                        Saber más
                        <span className="ml-1 text-lg">→</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <Link
                  to="/services"
                  className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-full font-semibold transition-all shadow-md"
                >
                  Ver todos los servicios
                  <span className="ml-2 text-lg">→</span>
                </Link>
              </div>
            </section>

            <section className="py-16 bg-red-50 mb-16">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center text-red-900 mb-12">
                  Especialidades que te Cuidan
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {medicalSpecialties.map((specialty) => (
                    <div
                      key={specialty.id}
                      className="overflow-hidden rounded-xl shadow-md bg-white group hover:shadow-xl transition-all duration-300"
                    >
                      <img
                        src={specialty.image}
                        alt={specialty.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {specialty.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {specialty.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="bg-white py-16 max-w-7xl mx-auto rounded-xl shadow-lg px-6 lg:px-8">
              <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
                Contáctanos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {contactMethods.map(({ id, title, details }) => (
                  <div
                    key={id}
                    className="bg-red-100 p-6 rounded-xl text-center"
                  >
                    <h3 className="text-xl font-semibold text-red-800 mb-2">
                      {title}
                    </h3>
                    <p className="text-red-700 text-sm">{details}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        );
      case "doctores":
        return (
          <section className="p-8 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Sección Doctores</h2>
            <p>Aquí puedes listar, agregar o editar doctores. (Solo disponible para dueño)</p>
          </section>
        );
      // **CAMBIO IMPORTANTE AQUÍ**: Asegúrate de que estos `case` coincidan con los `id` de tu Sidebar.jsx
      case "clientes": // En tu Sidebar, el ID es 'clientes'
        return (
          <section className="p-8 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Sección Clientes</h2>
            <p>Listado y gestión de clientes (Solo disponible para dueño).</p>
          </section>
        );
      // Si tienes un enlace para "Agregar Doctor" en el Sidebar, debería tener un ID.
      // Si no lo tienes, este case no se alcanzará desde el Sidebar.
      case "agregarDoctor":
        return (
          <section className="p-8 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Agregar Nuevo Doctor</h2>
            <p>Formulario para agregar doctor (Solo disponible para dueño).</p>
          </section>
        );
      case "misCitas":
        return (
          <section className="p-8 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Mis Citas</h2>
            <p>Listado de citas del paciente (cliente).</p>
          </section>
        );
      case "userDetails": // En tu Sidebar, el ID es 'userDetails'
        return (
          <section className="p-8 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Perfil del Usuario</h2>
            <p>Información personal y configuración (cliente).</p>
          </section>
        );
      default:
        return <div className="p-8">Contenido no disponible</div>;
    }
  };

  return (
    <div className="flex min-h-screen font-sans text-gray-800">
      {/* Sidebar */}
      <Sidebar role={role} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      {/* Main content */}
      <main className="flex-1 bg-gray-50 min-h-screen overflow-y-auto lg:ml-64">
        {renderMainContent()}
      </main>
    </div>
  );
}