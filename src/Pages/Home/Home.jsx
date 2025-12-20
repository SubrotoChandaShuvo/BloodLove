import React from 'react';
import Slider from '../../Components/Slider/Slider';
import Banner from '../Banner/Banner';
import Featured from '../Featured/Featured';
import Contact from '../Contact/Contact';

const Home = () => {
    return (
        <div className='mt-5'>
            <Banner/>
            <Slider/>
            <Featured/>
            <Contact/>
        </div>
    );
};

export default Home;