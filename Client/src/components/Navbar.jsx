import React, { useState, useRef, useEffect } from 'react';
import { BOOK, BOTTOM_ARROW, CARRER, EMAIL, LOGOUT, ROLE, UP_ARROW } from '../utils/Icons';  // Asegúrate de tener el ícono de flecha hacia arriba (UP_ARROW)
import Paragraph from '../utils/Paragraph';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const arrowRef = useRef(null);
    const nameContainerRef = useRef(null);
    const [menuWidth, setMenuWidth] = useState(0);
    const [user, setUser] = useState(null);  // Estado para almacenar los datos del usuario

    useEffect(() => {
        // Obtener y parsear los datos del usuario desde localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);  // Guardamos los datos del usuario en el estado
        }

        // Establecemos el ancho del menú cuando el componente se monta
        if (arrowRef.current && nameContainerRef.current) {
            const totalWidth = arrowRef.current.offsetWidth + nameContainerRef.current.offsetWidth;
            setMenuWidth(totalWidth);
        }
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
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
                    {/* Mostrar los datos del usuario solo si están disponibles */}
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
                        className="absolute top-[55px] right-0 bg-gray-800 text-white p-4 rounded-sm shadow-xl"
                        style={{
                            width: menuWidth + 100,  // Aumentar el ancho del menú
                        }}
                    >
                        <ul className="flex flex-col space-y-2">
                            <li className="hover:bg-gray-700 flex flex-row items-center px-4 py-2 hover:cursor-pointer">
                                <span className="mr-2 text-yellow-400">{CARRER()}</span>
                                <Paragraph paragraph={`Carrera: Ingeniería de Sistemas`}/>
                            </li>
                            <li className="hover:bg-gray-700 flex flex-row items-center px-4 py-2 hover:cursor-pointer">
                                <span className="mr-2 text-yellow-400">{ROLE()}</span>
                                <Paragraph paragraph={`Rol: ${user?.role === 'student' ? 'Alumno/a' : 'Profesor/a'}`}/>
                            </li>
                            <li className="hover:bg-gray-700 flex flex-row items-center px-4 py-2 hover:cursor-pointer">
                                <span className="mr-2 text-yellow-400">{EMAIL()}</span>
                                <Paragraph paragraph={`Correo: ${user?.email}`} onClick={`mailto:${user?.email}`}/>
                            </li>
                            <li className="hover:bg-gray-700 flex flex-row items-center px-4 py-2 hover:cursor-pointer">
                                <span className="mr-2 text-yellow-400">{LOGOUT()}</span>
                                <Paragraph paragraph={`Salir`} styles={`font-semibold`}/>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
