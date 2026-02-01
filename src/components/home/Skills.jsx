import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Terminal, Cpu, GraduationCap, Sparkles } from 'lucide-react';

const Skills = () => {
    const skillCategories = [
        {
            title: "Frontend",
            icon: <Code2 size={32} />,
            skills: ["HTML", "CSS", "Tailwind CSS", "JavaScript", "React"]
        },
        {
            title: "Database",
            icon: <Database size={32} />,
            skills: ["SQL Databases", "MongoDB"]
        },
        {
            title: "Programming & DSA",
            icon: <Terminal size={32} />,
            skills: ["Java Development", "Data Structures & Algorithms", "Problem Solving"]
        },
        {
            title: "Tools",
            icon: <Cpu size={32} />,
            skills: ["Git & GitHub", "VS Code", "Few AI Tools"]
        },
        {
            title: "Soft Skills",
            icon: <GraduationCap size={32} />,
            skills: ["Team Leadership", "Communication", "Public Speaking"]
        },
        {
            title: "Emerging Tech",
            icon: <Sparkles size={32} />,
            skills: ["Prompt Engineering", "Vibe Coding", "AI Content Creation"]
        }
    ];

    return (
        <section id="skills" style={{ padding: 'var(--section-padding)' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <span className="header">Expertise</span>
                    <h2 style={{ fontSize: '2.5rem', margin: '1rem 0' }}>Skills & Technologies</h2>
                    <p style={{ color: 'var(--text-muted)' }}>A diverse set of skills and technologies I've mastered</p>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {skillCategories.map((cat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="glass-panel"
                            whileHover={{ y: -5, borderColor: 'var(--primary-accent)' }}
                            style={{
                                padding: '2rem',
                                borderRadius: '1.5rem',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{
                                color: 'var(--primary-accent)',
                                marginBottom: '1.5rem',
                                background: 'rgba(59, 130, 246, 0.1)',
                                padding: '1rem',
                                borderRadius: '1rem',
                                display: 'inline-block'
                            }}>
                                {cat.icon}
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>{cat.title}</h3>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                {cat.skills.map((skill, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                                        <span style={{ width: '6px', height: '6px', background: 'var(--primary-accent)', borderRadius: '50%' }}></span>
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
