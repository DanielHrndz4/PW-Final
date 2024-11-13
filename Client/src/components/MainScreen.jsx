import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Paragraph from '../utils/Paragraph';
import { FORWARD } from '../utils/Icons';

const MainScreen = () => {
    const [activeSection, setActiveSection] = useState(null);
    const [newGradesNotification, setNewGradesNotification] = useState(true);

    const toggleOptions = (index) => {
        setActiveSection(prevState => prevState === index ? null : index);
    };

    const items = [
        {
            title: "Consultar Notas",
            description: "Accede a tus calificaciones de manera rápida y segura.",
            options: [
                { label: "Ver Notas", path: "/ver-notas" },
                { label: "Historial de Notas", path: "/historial-notas" },
                { label: "Promedio Semestre", path: "/promedio-semestre" }
            ],
            id: 'notas',
        },
        {
            title: "Solicitudes",
            description: "Administra y consulta el estado de tus solicitudes académicas.",
            options: [
                { label: "Ver Solicitudes", path: "/ver-solicitudes" },
                { label: "Nueva Solicitud", path: "/nueva-solicitud" }
            ],
            id: 'solicitudes',
        },
        {
            title: "Datos Generales",
            description: "Consulta información general sobre tu estado académico.",
            options: [
                { label: "Ver Perfil", path: "/ver-perfil" }
            ],
            id: 'datosGenerales',
        }
    ];

    const grades = [
        { 
            subject: 'Matemáticas', 
            exams: [
                { name: 'Examen 1', grade: 3.5 },
                { name: 'Examen 2', grade: 0.5 }
            ]
        },
        { 
            subject: 'Ciencias', 
            exams: [
                { name: 'Examen 1', grade: 4.5 },
                { name: 'Examen 2', grade: 2.0 }
            ]
        },
        { 
            subject: 'Historia', 
            exams: [
                { name: 'Examen 1', grade: 2.5 },
                { name: 'Examen 2', grade: 2.5 }
            ]
        },
        { 
            subject: 'Inglés', 
            exams: [
                { name: 'Examen 1', grade: 3.5 },
                { name: 'Examen 2', grade: 4.0 }
            ]
        }
    ];

    return (
        <div className="flex flex-col items-center p-8 transition-all duration-500">
            <h1 className="text-4xl font-bold text-blue-800 mb-8 transition-all duration-500">Bienvenido al Portal Académico</h1>

            {newGradesNotification && (
                <div className="fixed bottom-20 right-6 w-80 max-w-xs bg-green-100 text-green-700 px-6 py-3 rounded-lg shadow-lg z-50 border-2 border-green-500 transition-all duration-300">
                    <p className="font-medium">¡Tienes nuevas notas subidas!</p>
                    <button
                        onClick={() => setNewGradesNotification(false)}
                        className="mt-2 text-sm text-green-600 hover:text-green-800 transition-all duration-300"
                    >
                        Cerrar Notificación
                    </button>
                </div>
            )}

            {/* Resumen de Notas */}
            <div className="w-full max-w-3xl bg-white p-4 rounded-lg shadow-2xl mb-8 transition-all duration-500">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4 transition-all duration-500">Resumen de Calificaciones Ciclo 01/2024</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 transition-all duration-500">
                    {grades.map((grade, index) => {
                        const totalGrade = grade.exams.reduce((acc, exam) => acc + exam.grade, 0);
                        const maxGrade = 10.0;

                        return (
                            <div key={index} className="bg-blue-50 p-4 rounded-lg shadow-md hover:bg-blue-100 transition-all duration-300 text-center hover:cursor-pointer transform hover:scale-105">
                                <h3 className="text-lg font-semibold text-blue-700 mb-2">{grade.subject}</h3>
                                <p className="text-xl text-gray-600 mt-2">
                                    Total: {totalGrade}/{maxGrade}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Opciones de menú */}
            <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 transition-all duration-500">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`bg-white rounded-lg shadow-lg p-6 hover:shadow-xl hover:scale-105 transition-all duration-500 cursor-pointer ${activeSection === index ? 'h-auto' : 'h-44'}`}
                    >
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 transition-all duration-300">{item.title}</h3>
                        
                        {/* Descripción oculta al expandir */}
                        {activeSection !== index && <Paragraph paragraph={item.description} styles="text-gray-600 mb-4 transition-all duration-300" />}

                        {/* Botón para mostrar más opciones */}
                        <button
                            onClick={() => toggleOptions(index)}
                            className="text-blue-600 font-medium hover:text-blue-800 focus:outline-none transition-all duration-300"
                        >
                            {activeSection === index ? "Mostrar Menos" : "Mostrar Más"}
                        </button>

                        {/* Menú desplegable dentro del cuadro activo */}
                        <div 
                            className={`overflow-hidden transition-all duration-500 ${activeSection === index ? 'max-h-screen' : 'max-h-0'}`}
                            style={{ height: activeSection === index ? 'auto' : '0' }}
                        >
                            <div className="mt-4 rounded-sm shadow-sm transition-all duration-300">
                                <ul>
                                    {item.options.map((option, idx) => (
                                        <li key={idx} className="py-2 px-2 flex hover:bg-gray-200 rounded-sm transition-all duration-300">
                                            <span className='pr-1 my-auto text-gray-800'>{FORWARD()}</span>
                                            <Link to={option.path} className="text-blue-700 hover:text-blue-900 transition-all duration-300">
                                                {option.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainScreen;
