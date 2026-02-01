import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Hero from '../components/home/Hero';
import Skills from '../components/home/Skills';
import Experience from '../components/home/Experience';
import Education from '../components/home/Education';
import Contact from '../components/home/Contact';

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Skills />
            <Experience />
            <Education />
            <Contact />
            <Footer />
        </>
    );
};

export default Home;
