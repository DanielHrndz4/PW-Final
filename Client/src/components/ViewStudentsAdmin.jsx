import React, { useState, useEffect } from "react";
import RenderPage from "./RenderPage";
import Navigator from "./Navigator";

const ViewStudentComponent = () => {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [editingStudent, setEditingStudent] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/students");
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };

        fetchStudents();
    }, []);

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/students/${id}`, {
                method: "DELETE",
            });
            setStudents((prev) => prev.filter((student) => student._id !== id));
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

    const handleEdit = (student) => {
        setEditingStudent(student);
    };

    const handleSave = async () => {
        try {
            await fetch(`http://localhost:5000/api/students/${editingStudent._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: editingStudent.firstName,
                    lastName: editingStudent.lastName,
                    email: editingStudent.email,
                    gradeLevel: editingStudent.gradeLevel,
                }),
            });

            setStudents((prev) =>
                prev.map((student) =>
                    student._id === editingStudent._id ? editingStudent : student
                )
            );
            setEditingStudent(null);
        } catch (error) {
            console.error("Error updating student:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingStudent((prev) => ({ ...prev, [name]: value }));
    };

    const filteredStudents = students.filter((student) =>
        student.firstName.toLowerCase().includes(search.toLowerCase()) ||
        student.lastName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Navigator />
            <div className="p-8 w-[80%] m-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Estudiantes</h1>

                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <table className="min-w-full bg-white border rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="text-left px-6 py-3 border-b">Nombre</th>
                            <th className="text-left px-6 py-3 border-b">Correo Electrónico</th>
                            <th className="text-left px-6 py-3 border-b">Grado</th>
                            <th className="text-left px-6 py-3 border-b">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map((student) => (
                            <tr key={student._id}>
                                <td className="px-6 py-3 border-b">
                                    {student.firstName} {student.lastName}
                                </td>
                                <td className="px-6 py-3 border-b">{student.email}</td>
                                <td className="px-6 py-3 border-b">{student.gradeLevel}</td>
                                <td className="px-6 py-3 border-b">
                                    <button
                                        onClick={() => handleEdit(student)}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(student._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {editingStudent && (
                    <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Editar Estudiante</h2>
                        <div>
                            <label className="block mb-2">Nombre:</label>
                            <input
                                type="text"
                                name="firstName"
                                value={editingStudent.firstName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
                            />
                        </div>

                        <div>
                            <label className="block mb-2">Apellido:</label>
                            <input
                                type="text"
                                name="lastName"
                                value={editingStudent.lastName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
                            />
                        </div>

                        <div>
                            <label className="block mb-2">Correo Electrónico:</label>
                            <input
                                type="email"
                                name="email"
                                value={editingStudent.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
                            />
                        </div>

                        <div>
                            <label className="block mb-2">Grado:</label>
                            <input
                                type="text"
                                name="gradeLevel"
                                value={editingStudent.gradeLevel}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
                            />
                        </div>

                        <button
                            onClick={handleSave}
                            className="bg-green-500 text-white px-6 py-2 rounded-md mt-4"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

const ViewStudentsAdmin = () => {
    return <RenderPage component={<ViewStudentComponent />} />;
};

export default ViewStudentsAdmin;
