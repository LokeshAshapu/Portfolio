import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'; // Assuming lucide-react has X/Twitter icon, else use Twitter
import profileImg from '../../assets/profile.jpeg';

const Hero = () => {
    const socialLinks = [
        { icon: <Mail size={24} />, href: "mailto:lokeshashapu@gmail.com" },
        { icon: <Linkedin size={24} />, href: "https://www.linkedin.com/in/ashapu-lokesh-25159a298" },
        { icon: <Github size={24} />, href: "https://github.com/LokeshAshapu" },
        // Using simple Generic icon or FontAwesome if needed for X, but Lucide has 'Twitter' usually. X icon is 'X' in some versions.
        // Let's stick to standard icons for now.
    ];

    return (
        <section id="About" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '80px', // Navbar height
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Glow */}
            <div style={{
                position: 'absolute',
                width: '500px',
                height: '500px',
                background: 'var(--gradient-bg)',
                filter: 'blur(100px)',
                zIndex: -1,
                top: '10%',
                left: '20%'
            }} />

            <div className="container" style={{
                display: 'flex',
                flexDirection: 'row', // Default desktop
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap-reverse', // Stack reverse on mobile
                gap: '2rem'
            }}>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ flex: '1 1 500px' }}
                >
                    <div className="glass-panel" style={{
                        display: 'inline-block',
                        padding: '0.5rem 1rem',
                        borderRadius: '50px',
                        marginBottom: '1.5rem',
                        color: 'var(--primary-accent)',
                        fontSize: '0.9rem',
                        fontWeight: '600'
                    }}>
                        Front-end & AI Tool Expert
                    </div>

                    <h1 style={{
                        fontSize: '3.5rem',
                        lineHeight: '1.1',
                        marginBottom: '1.5rem',
                        fontWeight: '700'
                    }}>
                        Welcome to <br />
                        <span className="text-gradient">Lokesh's Portfolio</span>
                    </h1>

                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '1.2rem',
                        marginBottom: '2rem',
                        maxWidth: '600px'
                    }}>
                        Hi there! I create elegant, high-performance web applications that solve real-world problems.
                        Specializing in modern JavaScript frameworks and scalable architecture.
                    </p>

                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <motion.a
                            href="#Contact_me"
                            className="btn-primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Contact Me
                        </motion.a>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {socialLinks.map((link, index) => (
                                <motion.a
                                    key={index}
                                    href={link.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    whileHover={{ y: -3, color: 'var(--primary-accent)' }}
                                    style={{
                                        color: 'var(--text-muted)',
                                        padding: '8px',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '50%',
                                        background: 'var(--bg-card)'
                                    }}
                                >
                                    {link.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Profile Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}
                >
                    <div style={{
                        position: 'relative',
                        width: '350px',
                        height: '350px',
                        borderRadius: '50%',
                        padding: '10px',
                        background: 'linear-gradient(135deg, rgba(59,130,246,0.5), rgba(15,23,42,0))'
                    }}>
                        <img
                            src={profileImg}
                            alt="Ashapu Lokesh"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '50%',
                                border: '4px solid var(--bg-dark)'
                            }}
                        />
                    </div>
                </motion.div>
            </div>

            {/* Mobile fix via style tag */}
            <style>{`
        @media (max-width: 768px) {
            h1 { font-size: 2.5rem !important; }
            .container { text-align: center; justify-content: center !important; }
            .container > div { alignItems: center; }
            div[style*="justify-content: space-between"] { justify-content: center !important; }
             /* Fix flex stacking order logic overridden by JS style if needed, but flex-wrap-reverse handles it mostly */
        }
      `}</style>
        </section>
    );
};

export default Hero;
