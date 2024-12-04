import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Paragraph from '../utils/Paragraph';
import { FORWARD } from '../utils/Icons';
import { cyclesAndAsignatures } from '../constants/cycleandasignatures';

const MainScreen = () => {
    const [activeSection, setActiveSection] = useState(null);
    const [newGradesNotification, setNewGradesNotification] = useState(true);
    const [greeting, setGreeting] = useState('');
    const [role, setRole] = useState(() => JSON.parse(localStorage.getItem('role')) || 'guest');
    const [name, setName] = useState(() => JSON.parse(localStorage.getItem('user')) || { firstName: 'Usuario' });

    const actualCycle = "01/2024";

    const toggleOptions = (index) => {
        setActiveSection(prevState => (prevState === index ? null : index));
    };

    const hiUser = (firstName) => {
        const currentHour = new Date().getHours();

        if (currentHour >= 5 && currentHour < 12) {
            setGreeting(`¡Buenos días, ${firstName}! Esperamos que tengas un comienzo de día lleno de energía y éxitos.`);
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreeting(`🌞 ¡Buenas tardes, ${firstName}! ¡Sigue con todo el entusiasmo para cerrar el día en grande!`);
        } else if (currentHour >= 18 && currentHour < 24) {
            setGreeting(`🌙 ¡Buenas noches, ${firstName}! Has trabajado duro hoy, ¡te mereces un descanso!`);
        } else {
            setGreeting(`🌌 ¡Hola, ${firstName}! Es de madrugada, pero si estás aquí es porque eres una persona dedicada. ¡Aprovecha este momento tranquilo para avanzar!`);
        }
    };

    useEffect(() => {
        hiUser(name.firstName || 'Usuario');
    }, [name]);

    const items = [
        {
            title: "Consultar Notas",
            description: "Accede a tus calificaciones de manera rápida y segura.",
            options: [{ label: "Ver Notas", path: "/ver-notas" }],
            id: 'notas',
            roles: ['student'],
        },
        {
            title: "Solicitudes",
            description: "Administra y consulta el estado de tus solicitudes académicas.",
            options: [
                { label: "Ver Solicitudes", path: "/ver-solicitud" },
                { label: "Nueva Solicitud", path: "/nueva-solicitud" },
            ],
            id: 'solicitudes',
            roles: ['student'],
        },
        {
            title: "Gestión de Personas",
            description: "Agrega y consulta la información de maestros y alumnos.",
            options: [
                { label: "Ver Maestros", path: "/ver-maestros" },
                { label: "Ver Alumnos", path: "/ver-alumnos" },
                { label: "Agregar Maestros", path: "/agregar-maestro" },
                { label: "Agregar Alumnos", path: "/agregar-alumno" },
            ],
            id: 'gestion-personas',
            roles: ['admin'],
        },
        {
            title: "Materias y Alumnos",
            description: "Gestiona y consulta las materias que impartes y los alumnos inscritos.",
            options: [{ label: "Ver Alumnos Inscritos", path: "/ver-alumnos-inscritos" }],
            id: 'materias-alumnos',
            roles: ['teacher', 'admin'],
        },
        {
            title: "Subida de Notas",
            description: "Administra y sube las notas académicas de los estudiantes.",
            options: [{ label: "Subir Notas", path: "/subir-notas" }],
            id: 'subida-notas',
            roles: ['teacher', 'admin'],
        },
    ];

    const filteredItems = items.filter(item => item.roles.includes(role));

    return (
        <div className="flex flex-col items-center p-8 transition-all duration-500">
            <div className="pb-10 text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-5 transition-all duration-500">
                    Bienvenido al Portal Académico
                </h1>
                <p className="text-2xl text-gray-700">{greeting}</p>
            </div>
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
            {role === 'student' ? (
                <div className="max-w-8xl bg-white p-8 rounded-lg shadow-2xl mb-10 transition-all duration-500">
                    <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                        Resumen de Calificaciones Ciclo {actualCycle}
                    </h2>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-y-6 gap-x-6 w-full">
                        {cyclesAndAsignatures
                            .filter(cycle => cycle.cycle === `Ciclo ${actualCycle}`)
                            .flatMap(cycle => cycle.subjects)
                            .slice(0, 6)
                            .map((subject, index) => {
                                const totalGrade = subject.evaluations.reduce((acc, evaluation) => {
                                    return acc + (evaluation.grade !== null ? evaluation.grade * (evaluation.weight / 100) : 0);
                                }, 0).toFixed(1);
                                const maxGrade = 10.0;
                                const gradeColor = totalGrade > 6 ? 'text-green-600' : 'text-red-600';

                                return (
                                    <div
                                        key={index}
                                        className="bg-gray-50 hover:bg-gray-100 flex flex-col items-center justify-between p-4 rounded-lg shadow-xl transition-all duration-300 text-center hover:cursor-pointer transform hover:scale-105 w-full sm:w-[150px] md:w-[180px] lg:w-[200px]"
                                    >
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 overflow-hidden">
                                            {subject.name}
                                        </h3>
                                        <p className="text-xl text-gray-600 mt-2">
                                            Total: <span className={`${gradeColor} font-bold`}>{totalGrade}</span>/{maxGrade}
                                        </p>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            ) : (
                <div className="max-w-8xl bg-white p-8 rounded-lg shadow-2xl mb-10">
                    <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                        Acceso Rápido para {role === 'teacher' ? 'Maestros' : 'Administradores'}
                    </h2>
                    <p className="text-gray-700 text-center">
                        Aquí puedes gestionar solicitudes, materias y otros recursos relacionados con tu rol.
                    </p>
                </div>
            )}
            <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {filteredItems.map((item, index) => (
                    <div
                        key={index}
                        className={`bg-white rounded-lg shadow-lg p-6 hover:shadow-xl hover:scale-105 transition-all cursor-pointer ${activeSection === index ? 'h-auto' : 'h-44'}`}
                    >
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">{item.title}</h3>
                        {activeSection !== index && (
                            <Paragraph paragraph={item.description} styles="text-gray-600 mb-4" />
                        )}
                        <button
                            onClick={() => toggleOptions(index)}
                            className="text-blue-600 font-medium hover:text-blue-800 focus:outline-none"
                        >
                            {activeSection === index ? "Mostrar Menos" : "Mostrar Más"}
                        </button>
                        <div className={`overflow-hidden transition-all ${activeSection === index ? 'max-h-screen' : 'max-h-0'}`}>
                            <ul className="mt-4 rounded-sm shadow-sm">
                                {item.options.map((option, idx) => (
                                    <li key={idx} className="py-2 px-2 border-b">
                                        <Link to={option.path} className="text-blue-600 hover:text-blue-800 flex items-center">
                                            {option.label}
                                            <span className="ml-2 text-lg">{FORWARD}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainScreen;
