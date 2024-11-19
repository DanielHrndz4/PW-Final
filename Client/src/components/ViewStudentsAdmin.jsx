import React, { useState, useEffect } from 'react';
import RenderPage from './RenderPage';
import Navigator from './Navigator';

const mockStudents = [
    { id: 1, name: 'Luis Martínez', email: 'luis.martinez@example.com', grade: '10º' },
    { id: 2, name: 'Ana Torres', email: 'ana.torres@example.com', grade: '9º' },
    { id: 3, name: 'Pedro Gómez', email: 'pedro.gomez@example.com', grade: '11º' },
];

const ViewStudentComponent = () => {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState('');
    const [editingStudent, setEditingStudent] = useState(null);

    useEffect(() => {
        // Simula una llamada a una API para obtener los estudiantes
        setStudents(mockStudents);
    }, []);

    const handleDelete = (id) => {
        setStudents((prev) => prev.filter((student) => student.id !== id));
    };

    const handleEdit = (student) => {
        setEditingStudent(student);
    };

    const handleSave = () => {
        setStudents((prev) =>
            prev.map((student) =>
                student.id === editingStudent.id ? editingStudent : student
            )
        );
        setEditingStudent(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingStudent((prev) => ({ ...prev, [name]: value }));
    };

    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Navigator />
            <div className="p-8 w-[80%] m-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Estudiantes</h1>

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

                {/* Tabla de estudiantes */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="text-left px-6 py-3 border-b font-semibold text-gray-600">ID</th>
                                <th className="text-left px-6 py-3 border-b font-semibold text-gray-600">Nombre</th>
                                <th className="text-left px-6 py-3 border-b font-semibold text-gray-600">Correo Electrónico</th>
                                <th className="text-left px-6 py-3 border-b font-semibold text-gray-600">Grado</th>
                                <th className="text-left px-6 py-3 border-b font-semibold text-gray-600">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-3 border-b text-gray-800">{student.id}</td>
                                    <td className="px-6 py-3 border-b text-gray-800">
                                        {editingStudent?.id === student.id ? (
                                            <input
                                                type="text"
                                                name="name"
                                                value={editingStudent.name}
                                                onChange={handleChange}
                                                className="border border-gray-300 rounded-lg px-2 py-1 w-full"
                                            />
                                        ) : (
                                            student.name
                                        )}
                                    </td>
                                    <td className="px-6 py-3 border-b text-gray-800">
                                        {editingStudent?.id === student.id ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={editingStudent.email}
                                                onChange={handleChange}
                                                className="border border-gray-300 rounded-lg px-2 py-1 w-full"
                                            />
                                        ) : (
                                            student.email
                                        )}
                                    </td>
                                    <td className="px-6 py-3 border-b text-gray-800">
                                        {editingStudent?.id === student.id ? (
                                            <input
                                                type="text"
                                                name="grade"
                                                value={editingStudent.grade}
                                                onChange={handleChange}
                                                className="border border-gray-300 rounded-lg px-2 py-1 w-full"
                                            />
                                        ) : (
                                            student.grade
                                        )}
                                    </td>
                                    <td className="px-6 py-3 border-b text-gray-800">
                                        {editingStudent?.id === student.id ? (
                                            <>
                                                <button
                                                    onClick={handleSave}
                                                    className="text-green-600 hover:text-green-800 font-medium"
                                                >
                                                    Guardar
                                                </button>
                                                <button
                                                    onClick={() => setEditingStudent(null)}
                                                    className="text-gray-600 hover:text-gray-800 font-medium ml-4"
                                                >
                                                    Cancelar
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => handleEdit(student)}
                                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(student.id)}
                                                    className="text-red-600 hover:text-red-800 font-medium ml-4"
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

                {filteredStudents.length === 0 && (
                    <p className="text-center text-gray-600 mt-6">No se encontraron resultados.</p>
                )}
            </div>
        </>
    );
};

const ViewStudentsAdmin = () => {
    return <RenderPage component={<ViewStudentComponent />} />;
}

export default ViewStudentsAdmin;
