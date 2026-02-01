import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavigation = (e, href) => {
        e.preventDefault();
        setIsOpen(false);

        if (href.startsWith('/#')) {
            const id = href.replace('/#', '');
            if (location.pathname === '/' || location.pathname === '/index.html') {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                navigate('/');
                setTimeout(() => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        } else {
            navigate(href);
            window.scrollTo(0, 0);
        }
    };

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Skills', href: '/#skills' },
        { name: 'Projects', href: '/projects' },
        { name: 'Contact', href: '/#Contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-panel py-3' : 'bg-transparent py-5'
                }`}
            style={{
                width: '100%',
                top: 0,
                left: 0,
                position: 'fixed',
                zIndex: 1000,
                backgroundColor: scrolled ? 'var(--bg-card)' : 'transparent',
                backdropFilter: scrolled ? 'blur(12px)' : 'none',
                borderBottom: scrolled ? '1px solid var(--glass-border)' : 'none',
                padding: scrolled ? '1rem 0' : '1.5rem 0'
            }}
        >
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-bold text-white flex items-center gap-2"
                    onClick={() => window.scrollTo(0, 0)}
                    style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
                >
                    <span className="text-gradient">Ashapu Lokesh</span>
                </Link>

                {/* Desktop Menu */}
                <ul style={{ display: 'flex', gap: '2rem' }} className="hidden md:flex">
                    {navLinks.map((link) => (
                        <li key={link.name} className="desktop-link">
                            <a
                                href={link.href}
                                onClick={(e) => handleNavigation(e, link.href)}
                                className="text-gray-300 hover:text-white transition-colors"
                                style={{ fontSize: '0.95rem', fontWeight: '500', cursor: 'pointer' }}
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile Hamburger */}
                <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer', color: 'white' }}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {
                isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="glass-panel"
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            width: '100%',
                            padding: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1.5rem',
                            borderTop: '1px solid var(--glass-border)'
                        }}
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavigation(e, link.href)}
                                style={{ fontSize: '1.1rem', color: 'var(--text-main)', cursor: 'pointer' }}
                            >
                                {link.name}
                            </a>
                        ))}
                    </motion.div>
                )
            }

            {/* CSS for responsiveness */}
            <style>{`
        .desktop-link { display: block; }
        .mobile-toggle { display: none; }
        
        @media (max-width: 768px) {
          .desktop-link { display: none; }
          .mobile-toggle { display: block; }
        }
      `}</style>
        </motion.nav >
    );
};

export default Navbar;
