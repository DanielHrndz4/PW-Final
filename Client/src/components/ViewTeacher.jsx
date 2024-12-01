import React, { useState, useEffect } from "react";
import RenderPage from "./RenderPage";
import Navigator from "./Navigator";

const ViewTeacherComponent = () => {
    const [teachers, setTeachers] = useState([]);
    const [search, setSearch] = useState("");
    const [editingTeacher, setEditingTeacher] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/teachers");
            if (response.ok) {
                const data = await response.json();
                setTeachers(data);
            } else {
                throw new Error("Error al obtener los profesores.");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/teachers/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setTeachers((prev) => prev.filter((teacher) => teacher._id !== id));
            } else {
                throw new Error("Error al eliminar el profesor.");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleEdit = (teacher) => {
        setEditingTeacher(teacher);
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/teachers/${editingTeacher._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editingTeacher),
            });

            if (response.ok) {
                const updatedTeacher = await response.json();
                setTeachers((prev) =>
                    prev.map((teacher) =>
                        teacher._id === updatedTeacher._id ? updatedTeacher : teacher
                    )
                );
                setEditingTeacher(null);
            } else {
                throw new Error("Error al actualizar el profesor.");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingTeacher((prev) => ({ ...prev, [name]: value }));
    };

    const filteredTeachers = teachers.filter((teacher) =>
        teacher.firstName.toLowerCase().includes(search.toLowerCase()) ||
        teacher.lastName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Navigator />
            <div className="p-8 w-[80%] m-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Maestros</h1>

                {errorMessage && (
                    <div className="text-red-600 text-center mb-4">{errorMessage}</div>
                )}

                {/* Barra de búsqueda */}
                <div className="mb-6 flex justify-between items-center">
                    <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Tabla de maestros */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="text-left px-6 py-3 border-b font-semibold text-gray-600">Nombre</th>
                                <th className="text-left px-6 py-3 border-b font-semibold text-gray-600">Correo Electrónico</th>
                                <th className="text-left px-6 py-3 border-b font-semibold text-gray-600">Materia</th>
                                <th className="text-left px-6 py-3 border-b font-semibold text-gray-600">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTeachers.map((teacher) => (
                                <tr key={teacher._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-3 border-b text-gray-800">
                                        {editingTeacher?._id === teacher._id ? (
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={editingTeacher.firstName}
                                                onChange={handleChange}
                                                className="border border-gray-300 rounded-lg px-2 py-1 w-full"
                                            />
                                        ) : (
                                            `${teacher.firstName} ${teacher.lastName}`
                                        )}
                                    </td>
                                    <td className="px-6 py-3 border-b text-gray-800">
                                        {editingTeacher?._id === teacher._id ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={editingTeacher.email}
                                                onChange={handleChange}
                                                className="border border-gray-300 rounded-lg px-2 py-1 w-full"
                                            />
                                        ) : (
                                            teacher.email
                                        )}
                                    </td>
                                    <td className="px-6 py-3 border-b text-gray-800">
                                        {editingTeacher?._id === teacher._id ? (
                                            <input
                                                type="text"
                                                name="subject"
                                                value={editingTeacher.subject}
                                                onChange={handleChange}
                                                className="border border-gray-300 rounded-lg px-2 py-1 w-full"
                                            />
                                        ) : (
                                            teacher.subject
                                        )}
                                    </td>
                                    <td className="px-6 py-3 border-b text-gray-800">
                                        {editingTeacher?._id === teacher._id ? (
                                            <>
                                                <button
                                                    className="text-blue-600 mr-2 hover:underline"
                                                    onClick={handleSave}
                                                >
                                                    Guardar
                                                </button>
                                                <button
                                                    className="text-red-600 hover:underline"
                                                    onClick={() => setEditingTeacher(null)}
                                                >
                                                    Cancelar
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className="text-blue-600 mr-2 hover:underline"
                                                    onClick={() => handleEdit(teacher)}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="text-red-600 hover:underline"
                                                    onClick={() => handleDelete(teacher._id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

const ViewTeacher = () => {
    return <RenderPage component={<ViewTeacherComponent />} />;
};

export default ViewTeacher;
