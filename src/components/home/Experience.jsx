import React from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase } from 'lucide-react';

const Experience = () => {
    const certifications = [
        { title: "Introduction to Python", org: "Codio", year: "2024" },
        { title: "Introduction to Java Programming", org: "Uc3m", year: "2024" },
        { title: "Data Structures and Algorithms", org: "Uc3m", year: "2024" },
        { title: "GenAI 101 with Pieces credential", org: "Pieces AI", year: "2025" },
        { title: "AI for Beginners", org: "HP", year: "2025" },
        { title: "Generative AI Mastermind", org: "Outskill", year: "2025" },
        { title: "Artificial Intelligence Fundamentals", org: "HCL GUVI", year: "2025" },
    ];

    const jobs = [
        {
            title: "AI and Data Analytics Intern",
            company: "Edunet",
            year: "2025",
            desc: "Developed a restaurant chatbot using AI and data analytics to handle customer interactions, streamline reservations, and enhance user experience."
        },
        {
            title: "AI Transformative Learning Intern",
            company: "Edunet",
            year: "2025",
            desc: "Developed an AI-driven resume screening & ranking system using NLP and ML techniques to automate resume evaluation."
        }
    ];



    const Section = ({ title, icon, children }) => (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel"
            style={{ padding: '2rem', borderRadius: '1.5rem', marginBottom: '2rem' }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ color: 'var(--primary-accent)' }}>{icon}</div>
                <h2 style={{ fontSize: '1.8rem' }}>{title}</h2>
            </div>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {children}
            </div>
        </motion.div>
    );

    return (
        <section id="experience" style={{ padding: 'var(--section-padding)' }}>
            <div className="container">
                <center style={{ marginBottom: '4rem' }}>
                    <span className="header">Milestones</span>
                    <h2 style={{ fontSize: '2.5rem', margin: '1rem 0' }}>Achievements & Experience</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Recognitions, certifications, and professional journey</p>
                </center>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>

                    {/* Experience */}
                    <Section title="Experience" icon={<Briefcase size={32} />}>
                        {jobs.map((job, i) => (
                            <div key={i} style={{ borderLeft: '2px solid var(--glass-border)', paddingLeft: '1.5rem', position: 'relative' }}>
                                <div style={{ position: 'absolute', left: '-5px', top: '0', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-accent)' }}></div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '600' }}>{job.title}</h3>
                                <div style={{ color: 'var(--primary-accent)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{job.company} • {job.year}</div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{job.desc}</p>
                            </div>
                        ))}
                    </Section>



                    {/* Certifications (Updated layout to be more compact or grid) */}
                    <Section title="Certifications" icon={<Award size={32} />}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                            {certifications.map((cert, i) => (
                                <div key={i} style={{
                                    background: 'rgba(255,255,255,0.03)',
                                    padding: '1rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid var(--glass-border)'
                                }}>
                                    <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{cert.title}</h4>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                        <span>{cert.org}</span>
                                        <span>{cert.year}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Section>

                </div>
            </div>
        </section>
    );
};

export default Experience;
