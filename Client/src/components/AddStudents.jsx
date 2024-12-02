import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RenderPage from "./RenderPage";
import Navigator from "./Navigator";

const AddStudentsComponent = () => {
    const [studentData, setStudentData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        gradeLevel: "",
        password: "",  // Añadimos el campo de contraseña
    });

    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!studentData.firstName || !studentData.lastName || !studentData.email || !studentData.gradeLevel || !studentData.password) {
            setErrorMessage("Todos los campos son obligatorios.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/students", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(studentData),
            });

            if (response.ok) {
                navigate("./ViewEstudentsAdmin");
            } else {
                throw new Error("Error al agregar el estudiante.");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <>
            <Navigator />
            <div className="max-w-lg mt-10 m-auto p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center mb-4">Agregar Estudiante</h1>

                {errorMessage && <div className="text-red-600 text-center mb-4">{errorMessage}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-group">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Nombre:</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={studentData.firstName}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Apellido:</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={studentData.lastName}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={studentData.email}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="gradeLevel" className="block text-sm font-medium text-gray-700">Nivel de Grado:</label>
                        <input
                            type="text"
                            id="gradeLevel"
                            name="gradeLevel"
                            value={studentData.gradeLevel}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={studentData.password}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="mt-4 px-6 py-2 bg-blue-900 text-white font-medium text-sm rounded-md hover:bg-blue-800 transition-colors"
                        >
                            Agregar Estudiante
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

const AddStudents = () => {
    return <RenderPage component={<AddStudentsComponent />} />;
};

export default AddStudents;
