import React from 'react';
import Paragraph from '../utils/Paragraph';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="w-full bg-gray-900 text-white py-5">
            <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 px-4">
                <div className="text-center md:text-left md:flex-1 flex justify-center items-center flex-col h-full">
                    <h1 className="font-bold text-lg mb-2">Sistema de Registro de Notas © 2024</h1>
                    <Link 
                        to="mailto:unidad.sistemasinformacion@uca.edu.sv"
                        className="text-yellow-400 hover:underline transition-colors"
                    >
                        <Paragraph paragraph="unidad.sistemasinformacion@uca.edu.sv" />
                    </Link>
                </div>
                <div className="text-center md:text-left md:flex-1 flex justify-center items-center flex-col h-full">
                    <Paragraph 
                        paragraph="Universidad Centroamericana José Simeón Cañas – UCA" 
                        styles="font-semibold"
                    />
                    <Paragraph 
                        paragraph="La Libertad, El Salvador, Centroamérica" 
                        styles="font-semibold"
                    />
                </div>
            </div>
            <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-400 w-[80%] m-auto">
                <Paragraph 
                    paragraph="Todos los derechos reservados." 
                    styles="italic"
                />
            </div>
        </footer>
    );
}

export default Footer;
