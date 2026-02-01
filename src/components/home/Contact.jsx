import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Briefcase, ArrowRight } from 'lucide-react';

const Contact = () => {
    return (
        <>
            {/* Hire Me Section */}
            <section id="Contact" style={{ padding: 'var(--section-padding)' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="glass-panel"
                        style={{
                            padding: '4rem 2rem',
                            borderRadius: '2rem',
                            textAlign: 'center',
                            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(15, 23, 42, 0))'
                        }}
                    >
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-accent)', marginBottom: '1rem' }}>
                            <Briefcase size={24} />
                            <span style={{ fontWeight: '600' }}>Hire Me</span>
                        </div>

                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Available for Opportunities</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                            I'm available for full-time positions, internships, and freelance projects. Let's create something amazing together!
                        </p>

                        <motion.a
                            href="mailto:lokeshashapu@gmail.com"
                            className="btn-primary"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Mail size={20} />
                            Contact Me
                        </motion.a>
                    </motion.div>
                </div>
            </section>

            {/* Get in Touch / CTA Section */}
            <section id="Contact_me" style={{ padding: '4rem 0', background: 'var(--bg-card)' }}>
                <div className="container">
                    <center>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Ready to Start Your Next Project?</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                            I'm always looking for exciting opportunities to create exceptional digital experiences.
                        </p>
                        <motion.a
                            href="mailto:lokeshashapu@gmail.com"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: 'var(--primary-accent)',
                                fontWeight: '600',
                                fontSize: '1.1rem'
                            }}
                            whileHover={{ x: 5 }}
                        >
                            Get in Touch <ArrowRight size={20} />
                        </motion.a>
                    </center>
                </div>
            </section>
        </>
    );
};

export default Contact;
