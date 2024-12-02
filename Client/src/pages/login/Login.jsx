import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/AuthContext";
import { useRole } from "../../provider/RoleProvider";


const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const { setRole } = useRole();

  // Sanitizar las entradas del usuario
  const sanitizeInput = (value) => {
    const sanitizedValue = value.replace(/<[^>]+>/g, ""); // Remueve etiquetas HTML
    return sanitizedValue.trim(); // Elimina espacios innecesarios
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevData) => ({
      ...prevData,
      [name]: sanitizeInput(value), // Sanitizar entrada
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      setErrorMessage("Por favor, ingrese su correo y contraseña.");
      return;
    }

    try {
      // Enviar credenciales sanitizadas al servidor
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: sanitizeInput(credentials.email),
          password: sanitizeInput(credentials.password),
        }),
      });
    
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data.user)); // Guardar los datos del usuario en el contexto de Auth
        setRole(data.user.role); // Guardar el rol en el contexto de Role
    
        // Persistir el rol en localStorage
        localStorage.setItem("role", JSON.stringify(data.user.role));
    
        navigate("/");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Correo o contraseña incorrectos.");
      }
    } catch (error) {
      setErrorMessage("Ocurrió un error. Inténtalo de nuevo.");
    }
  }   

  return (
    <div className="flex min-h-screen">
      <div
        className="w-full bg-cover bg-center justify-center items-center flex flex-row"
        style={{ backgroundImage: 'url("./img/background.png")' }}
      >
        <div className="bg-white p-10 shadow-2xl w-[30%] min-h-1/2 rounded-lg">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">
            Registro de notas
          </h2>
          {errorMessage && (
            <div className="text-red-500 text-center mb-4">{errorMessage}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ejemplo@universidad.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="********"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
