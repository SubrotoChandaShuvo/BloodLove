import React from 'react';
import Slider from '../../Components/Slider/Slider';
import Banner from '../Banner/Banner';

const Home = () => {
    return (
        <div className='mt-5'>
            <Banner/>
            <Slider/>
        </div>
    );
};

export default Home;