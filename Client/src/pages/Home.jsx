import React from 'react';
import MainScreen from '../components/MainScreen';
import RenderPage from '../components/RenderPage';

const Home = () => {
    return (
        <RenderPage component={<MainScreen/>}/>
    );
}

export default Home;
