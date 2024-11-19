import React, { useState, useEffect } from 'react';
import RenderPage from './RenderPage';
import Navigator from './Navigator';

const mockTeachers = [
    { id: 1, name: 'Juan Pérez', email: 'juan.perez@example.com', subject: 'Matemáticas' },
    { id: 2, name: 'María García', email: 'maria.garcia@example.com', subject: 'Historia' },
    { id: 3, name: 'Carlos López', email: 'carlos.lopez@example.com', subject: 'Ciencias' },
];

const ViewTeacherComponent = () => {
    const [teachers, setTeachers] = useState([]);
    const [search, setSearch] = useState('');
    const [editingTeacher, setEditingTeacher] = useState(null);

    useEffect(() => {
        // Simula una llamada a una API para obtener los maestros
        setTeachers(mockTeachers);
    }, []);

    const handleDelete = (id) => {
        setTeachers((prev) => prev.filter((teacher) => teacher.id !== id));
    };

    const handleEdit = (teacher) => {
        setEditingTeacher(teacher);
    };

    const handleSave = () => {
        setTeachers((prev) =>
            prev.map((teacher) =>
                teacher.id === editingTeacher.id ? editingTeacher : teacher
            )
        );
        setEditingTeacher(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingTeacher((prev) => ({ ...prev, [name]: value }));
    };

    const filteredTeachers = teachers.filter((teacher) =>
        teacher.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Navigator />
            <div className="p-8 w-[80%] m-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Maestros</h1>

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
                                <th className="text-left px-6 py-3 border-b font-semibold text-gray-600">ID</th>
                                <th className="text-left px-6 py-3 border-b font-semibold text-gray-600">Nombre</th>
                                <th className="text-left px-6 py-3 border-b font-semibold text-gray-600">Correo Electrónico</th>
                                <th className="text-left px-6 py-3 border-b font-semibold text-gray-600">Materia</th>
                                <th className="text-left px-6 py-3 border-b font-semibold text-gray-600">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTeachers.map((teacher) => (
                                <tr key={teacher.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-3 border-b text-gray-800">{teacher.id}</td>
                                    <td className="px-6 py-3 border-b text-gray-800">
                                        {editingTeacher?.id === teacher.id ? (
                                            <input
                                                type="text"
                                                name="name"
                                                value={editingTeacher.name}
                                                onChange={handleChange}
                                                className="border border-gray-300 rounded-lg px-2 py-1 w-full"
                                            />
                                        ) : (
                                            teacher.name
                                        )}
                                    </td>
                                    <td className="px-6 py-3 border-b text-gray-800">
                                        {editingTeacher?.id === teacher.id ? (
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
                                        {editingTeacher?.id === teacher.id ? (
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
                                        {editingTeacher?.id === teacher.id ? (
                                            <>
                                                <button
                                                    onClick={handleSave}
                                                    className="text-green-600 hover:text-green-800 font-medium"
                                                >
                                                    Guardar
                                                </button>
                                                <button
                                                    onClick={() => setEditingTeacher(null)}
                                                    className="text-gray-600 hover:text-gray-800 font-medium ml-4"
                                                >
                                                    Cancelar
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => handleEdit(teacher)}
                                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(teacher.id)}
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

                {filteredTeachers.length === 0 && (
                    <p className="text-center text-gray-600 mt-6">No se encontraron resultados.</p>
                )}
            </div>
        </>
    );
};

const ViewTeacher = () => {
    return <RenderPage component={<ViewTeacherComponent />} />;
}

export default ViewTeacher;
