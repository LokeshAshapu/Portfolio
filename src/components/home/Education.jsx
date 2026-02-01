import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const Education = () => {
    const education = [
        {
            degree: "B.Tech in Computer Science",
            school: "Sri Sivani College Of Engineering",
            year: "2023 - 2027",
            gpa: "8.01/10",
            desc: "Focus on software development and data science."
        },
        {
            degree: "Intermediate (MPC)",
            school: "PPR Kaumudi Junior College",
            year: "2021 - 2023",
            gpa: "9.01/10",
            desc: "Mathematics, Physics, and Chemistry."
        }
    ];

    return (
        <section id="education" style={{ padding: 'var(--section-padding)' }}>
            <div className="container">
                <center style={{ marginBottom: '4rem' }}>
                    <span className="header">Background</span>
                    <h2 style={{ fontSize: '2.5rem', margin: '1rem 0' }}>Education</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Academic background and qualifications</p>
                </center>

                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    {education.map((edu, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="glass-panel"
                            style={{
                                padding: '2rem',
                                borderRadius: '1.5rem',
                                marginBottom: '2rem',
                                position: 'relative',
                                borderLeft: '4px solid var(--primary-accent)'
                            }}
                        >
                            <div style={{
                                position: 'absolute',
                                top: '-15px',
                                left: '-15px',
                                background: 'var(--bg-dark)',
                                padding: '8px',
                                borderRadius: '50%',
                                border: '1px solid var(--glass-border)'
                            }}>
                                <GraduationCap size={24} color="var(--primary-accent)" />
                            </div>

                            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{edu.degree}</h3>
                            <h4 style={{ color: 'var(--primary-accent)', fontSize: '1.1rem', margin: '0.5rem 0' }}>
                                {edu.school}
                            </h4>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                                <span style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    padding: '4px 12px',
                                    borderRadius: '999px',
                                    fontSize: '0.9rem',
                                    color: 'var(--text-muted)'
                                }}>
                                    {edu.year}
                                </span>
                                <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>GPA: {edu.gpa}</span>
                            </div>
                            <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>{edu.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
