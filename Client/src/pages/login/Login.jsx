import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!credentials.email || !credentials.password) {
            setErrorMessage("Por favor, ingrese su correo y contraseña.");
            return;
        }

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            if (response.ok) {
                navigate("/dashboard");
            } else {
                throw new Error("Correo o contraseña incorrectos.");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Imagen a la izquierda */}
            <div className="w-[60%] bg-cover bg-center" style={{ backgroundImage: 'url("./img/ucasv.webp")' }}>
                {/* Aquí puedes poner tu imagen de fondo */}
            </div>

            {/* Formulario a la derecha */}
            <div className="flex items-center justify-center w-1/2 bg-blue-900">
                <div className="bg-white p-10 shadow-2xl w-[70%] min-h-1/2 rounded-lg">
                    <h2 className="text-4xl font-semibold text-center text-gray-900 mb-10">Registro de notas</h2>
                    {errorMessage && (
                        <div className="text-red-500 text-center mb-4">{errorMessage}</div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
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
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
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

                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">Recuérdame</label>
                            </div>
                            {/* <a href="#" className="text-sm text-blue-600 hover:text-blue-800">¿Olvidaste tu contraseña?</a> */}
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
