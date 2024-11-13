import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MainScreen from '../components/MainScreen';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-gray-900">
                <Navbar />
            </header>
            <main className="flex-grow bg-blue-50">
                <MainScreen/>
            </main>
            <footer className="w-full">
                <Footer />
            </footer>
        </div>
    );
}

export default Home;
