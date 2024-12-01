import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RenderPage from "./RenderPage";
import Navigator from "./Navigator";

const AddTeachersComponent = () => {
    const [teacherData, setTeacherData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeacherData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!teacherData.firstName || !teacherData.lastName || !teacherData.email || !teacherData.subject) {
            setErrorMessage("Todos los campos son obligatorios.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/teachers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(teacherData),
            });

            if (response.ok) {
                navigate("/ver-maestros");
            } else {
                throw new Error("Error al agregar el profesor.");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <>
            <Navigator />
            <div className="max-w-lg mt-10 m-auto p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center mb-4">Agregar Profesor</h1>

                {errorMessage && <div className="text-red-600 text-center mb-4">{errorMessage}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-group">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Nombre:</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={teacherData.firstName}
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
                            value={teacherData.lastName}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={teacherData.email}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Materia:</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={teacherData.subject}
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
                            Agregar Profesor
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

const AddTeachers = () => {
    return <RenderPage component={<AddTeachersComponent />} />;
};

export default AddTeachers;
