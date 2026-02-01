import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code2 } from 'lucide-react';

// Import images
import portfolioImg from '../assets/portfolio.png';
import ageCalcImg from '../assets/age-calculator.png';
import qrGenImg from '../assets/qr-generator.png';
import medicalProfileImg from '../assets/medical_profile.png';
import meditrackImg from '../assets/meditrack.png';
import jarvisImg from '../assets/jarvis.png';

const Projects = () => {

    const projects = [
        {
            title: "Personal Portfolio",
            img: portfolioImg,
            desc: "Responsive and animated portfolio site showcasing resume, projects, and contact information.",
            tags: ["HTML", "CSS", "JavaScript"],
            live: "https://ashapulokesh.vercel.app/",
            github: "https://github.com/LokeshAshapu"
        },
        {
            title: "Simple Age Calculator",
            img: ageCalcImg,
            desc: "Responsive and basic site for calculating Age.",
            tags: ["HTML", "TailwindCSS", "JavaScript"],
            live: "#",
            github: "https://github.com/LokeshAshapu/Age-Calculator"
        },
        {
            title: "Qr-code-Generator",
            img: qrGenImg,
            desc: "Responsive and animated qrcode generator and scan feature.",
            tags: ["HTML", "TailwindCSS", "JavaScript"],
            live: "#",
            github: "https://github.com/LokeshAshapu/QrCode-Generator"
        },
        {
            title: "Emergency Medical Profile",
            img: medicalProfileImg,
            desc: "Web app that stores and displays emergency medical information for quick access.",
            tags: ["HTML", "TailwindCSS", "JavaScript", "GitHub Storage"],
            live: "https://emergency-medical-profile.vercel.app/",
            github: "https://github.com/LokeshAshapu/IBM_internship_project"
        },
        {
            title: "Meditrack",
            img: meditrackImg,
            desc: "Comprehensive healthcare management platform to help patients track medications and appointments.",
            tags: ["ReactJS", "Tailwind CSS", "Firebase", "Node JS"],
            live: "#",
            github: "https://github.com/LokeshAshapu/Meditrack"
        },
        {
            title: "Jarvis",
            img: jarvisImg,
            desc: "Personal AI assistant that helps simplify and complete daily tasks easily.",
            tags: ["Python", "APIs", "Vibe Coding"],
            live: "#",
            github: "#"
        }
    ];

    const ProjectCard = ({ project, index }) => (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="glass-panel"
            style={{
                borderRadius: '1.5rem',
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
            whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
        >
            <div style={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
                <motion.img
                    src={project.img}
                    alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                />
                <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: 'var(--primary-accent)',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                }}>
                    Featured
                </div>
            </div>

            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: '700' }}>{project.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', flex: 1 }}>
                    {project.desc}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {project.tags.map((tag, i) => (
                        <span key={i} style={{
                            background: 'rgba(255,255,255,0.05)',
                            padding: '4px 12px',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            color: 'var(--text-main)',
                            border: '1px solid var(--glass-border)'
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                    <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary"
                        style={{
                            fontSize: '0.9rem',
                            padding: '0.5rem 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        View Live <ExternalLink size={16} />
                    </a>
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            padding: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.05)',
                            color: 'var(--text-main)',
                            width: '40px',
                            height: '40px'
                        }}
                    >
                        <Github size={20} />
                    </a>
                </div>
            </div>
        </motion.div>
    );

    return (
        <>
            <Navbar />

            <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
                <center style={{ marginBottom: '4rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'rgba(59, 130, 246, 0.1)',
                            padding: '0.5rem 1rem',
                            borderRadius: '999px',
                            color: 'var(--primary-accent)',
                            marginBottom: '1rem'
                        }}
                    >
                        <Code2 size={20} />
                        <span style={{ fontWeight: '600' }}>My Projects</span>
                    </motion.div>

                    <h2 style={{ fontSize: '3rem', margin: '0 0 1rem', fontWeight: '700' }}>Creative <span className="text-gradient">Portfolio</span></h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px' }}>
                        Browse through my portfolio of projects, showcasing my skills in web development, design, and problem-solving.
                    </p>
                </center>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '2.5rem'
                }}>
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Projects;
