import React from 'react';
import { Github, Linkedin, Mail, Twitter, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const socialLinks = [
        { icon: <Mail size={20} />, href: "mailto:lokeshashapu@gmail.com" },
        { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/ashapu-lokesh-25159a298" },
        { icon: <Facebook size={20} />, href: "https://www.facebook.com/Loki615/" },
        { icon: <Github size={20} />, href: "https://github.com/LokeshAshapu" },
        { icon: <Twitter size={20} />, href: "https://x.com/AshapuLokesh?t=T1v2TO-SFc3n_6lviQy5Fg&s=09" },
    ];

    return (
        <footer style={{
            background: 'rgb(24, 24, 27)',
            padding: '3rem 0',
            borderTop: '1px solid var(--glass-border)'
        }}>
            <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>

                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Let's Connect</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Follow me on social media</p>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    {socialLinks.map((link, i) => (
                        <a
                            key={i}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                color: 'var(--text-muted)',
                                transition: 'color 0.3s',
                                padding: '8px',
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.05)'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary-accent)'}
                            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>

                <div style={{
                    width: '100%',
                    height: '1px',
                    background: 'var(--glass-border)',
                    maxWidth: '500px'
                }} />

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                    textAlign: 'center'
                }}>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                        <span style={{ color: 'var(--primary-accent)' }}>&lt;/&gt;</span> Ashapu Lokesh
                    </h4>
                    <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem' }}>
                        <Link to="/" style={{ color: 'var(--text-muted)' }}>Home</Link>
                        <Link to="/projects" style={{ color: 'var(--text-muted)' }}>Projects</Link>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>© 2025 All Rights Reserved</p>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', opacity: 0.7 }}>
                    Made with ❤️ by Ashapu Lokesh
                </div>
            </div>
        </footer>
    );
};

export default Footer;
