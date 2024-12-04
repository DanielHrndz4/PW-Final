import React, { useState, useRef, useEffect } from 'react';
import { BOOK, BOTTOM_ARROW, CARRER, EMAIL, LOGOUT, ROLE, UP_ARROW } from '../utils/Icons';
import Paragraph from '../utils/Paragraph';
import { useAuth } from '../provider/AuthContext'; // Asegúrate de usar el contexto de autenticación
import { useNavigate } from 'react-router-dom'; // Necesario para la redirección

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const arrowRef = useRef(null);
    const nameContainerRef = useRef(null);
    const [menuWidth, setMenuWidth] = useState(0);
    const [user, setUser] = useState(null);
    const { logout } = useAuth(); // Obtén la función de logout desde el contexto
    const navigate = useNavigate(); // Para redirigir al usuario

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        }

        if (arrowRef.current && nameContainerRef.current) {
            const totalWidth = arrowRef.current.offsetWidth + nameContainerRef.current.offsetWidth;
            setMenuWidth(totalWidth);
        }
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        // Eliminar datos del usuario
        localStorage.removeItem('user'); // Remover del localStorage
        document.cookie.split(';').forEach((cookie) => {
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        });

        // Llamar al contexto de logout
        logout();

        // Redirigir al usuario
        navigate('/login');
    };

    return (
        <div className="w-full lg:w-[90%] mx-auto gap-4 flex flex-col md:flex-row justify-center md:justify-between items-center py-4 px-6 bg-gray-900 rounded-lg shadow-lg">
            <div className="flex items-center gap-4">
                <span className="text-4xl text-yellow-400 font-bold">{BOOK()}</span>
                <h1 className="text-3xl font-semibold text-white tracking-wider">
                    Sistema de registro de notas
                </h1>
            </div>
            <div className="flex flex-row items-center relative">
                <div
                    className="text-2xl pr-2 cursor-pointer text-white transform transition-all duration-300"
                    onClick={toggleMenu}
                    ref={arrowRef}
                >
                    {isOpen ? UP_ARROW() : BOTTOM_ARROW()}
                </div>
                <div className="flex flex-col text-white w-max" ref={nameContainerRef}>
                    {user && (
                        <>
                            <Paragraph paragraph={`Nombre: ${user.firstName} ${user.lastName}`} />
                            <Paragraph paragraph={`Carnet: ${user.email.split('@')[0]}`} />
                        </>
                    )}
                </div>
                {isOpen && (
                    <div
                        ref={menuRef}
                        className="absolute w-full top-[55px] right-0 bg-gray-800 text-white p-4 rounded-sm shadow-xl z-10"
                        style={{
                            width: menuWidth + 100,
                        }}
                    >
                        <ul className="flex flex-col space-y-2 w-full">
                            {user.role == "student" && (
                                <li className="hover:bg-gray-700 flex flex-row items-center px-4 py-2 hover:cursor-pointer">
                                    <span className="mr-2 text-yellow-400">{CARRER()}</span>
                                    <Paragraph paragraph={`Carrera: Ingeniería de Sistemas`} />
                                </li>
                            )}
                            <li className="hover:bg-gray-700 flex flex-row items-center px-4 py-2 hover:cursor-pointer">
                                <span className="mr-2 text-yellow-400">{ROLE()}</span>
                                <Paragraph paragraph={`Rol: ${user?.role === 'student' ? 'Alumno/a' : 'Profesor/a'}`} />
                            </li>
                            <li className="hover:bg-gray-700 flex flex-row items-center px-4 py-2 hover:cursor-pointer">
                                <span className="mr-2 text-yellow-400">{EMAIL()}</span>
                                <Paragraph paragraph={`Correo: ${user?.email}`} onClick={`mailto:${user?.email}`} />
                            </li>
                            <li
                                className="hover:bg-gray-700 flex flex-row items-center px-4 py-2 hover:cursor-pointer"
                                onClick={handleLogout}
                            >
                                <span className="mr-2 text-yellow-400">{LOGOUT()}</span>
                                <Paragraph paragraph={`Salir`} styles={`font-semibold`} />
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
