import React from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, Trophy } from 'lucide-react';

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

    const achievements = [
        { title: "GenAI Hackathon Winner", org: "Zentrobytes", desc: "Secured 1st place in the Generative AI Hackathon." },
        { title: "Poster Presentation Runner-up", org: "Avanti College Tech Fest", desc: "Awarded 2nd place for innovative technical presentation." },
        { title: "Science Fest Participation", org: "Rathasapthami", desc: "Active participant in the annual Science exhibition." }
    ];

    const jobs = [
        {
            title: "Product Designer",
            company: "OurFirstCode",
            year: "Dec 2025 - Present",
            desc: "Designed user-friendly interfaces through structured design workflows. Collaborated with developers to translate product requirements. Improved overall user experience using iterative feedback."
        },
        {
            title: "Campus Ambassador",
            company: "Google Gemini",
            year: "Aug 2025 - Dec 2025",
            desc: "Boosted campus engagement by 40% through targeted digital campaigns. Organized 3 webinars with 200+ attendees, enhancing brand reach. Mentored 20+ peers in resume building and interview skills."
        },
        {
            title: "FullStack Web Developer Intern",
            company: "WebStackAcademy",
            year: "Sep 2025 - Nov 2025",
            desc: "Gained hands-on experience building projects using MERN stack. Practiced foundational HTML, CSS, JavaScript, and React development. Worked on SDLC-based project development with structured workflows."
        },
        {
            title: "Frontend Development Certification Program",
            company: "IBM",
            year: "Jun 2025 - Jul 2025",
            desc: "Reduced page load time by 40% via lazy loading and CSS Grid optimization. Developed 8+ reusable UI components for scalability and maintainability. Collaborated in a 5-member Agile team, delivering features ahead of schedule."
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



                    {/* Achievements */}
                    <Section title="Achievements" icon={<Trophy size={32} />}>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {achievements.map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ x: 10, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        padding: '1.5rem',
                                        borderRadius: '0.75rem',
                                        border: '1px solid var(--glass-border)',
                                        background: 'rgba(255,255,255,0.02)',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-main)' }}>{item.title}</h4>
                                    <div style={{ fontSize: '0.95rem', color: 'var(--primary-accent)', margin: '0.25rem 0' }}>{item.org}</div>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </Section>

                    {/* Certifications */}
                    <Section title="Certifications" icon={<Award size={32} />}>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {certifications.map((cert, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ x: 10, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '1rem 1.5rem',
                                        borderRadius: '0.75rem',
                                        border: '1px solid var(--glass-border)',
                                        background: 'rgba(255,255,255,0.02)',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <div>
                                        <h4 style={{ fontSize: '1.1rem', fontWeight: '500', color: 'var(--text-main)' }}>{cert.title}</h4>
                                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                            {cert.org}
                                        </div>
                                    </div>
                                    <div style={{
                                        fontSize: '0.85rem',
                                        color: 'var(--primary-accent)',
                                        background: 'rgba(59, 130, 246, 0.1)',
                                        padding: '4px 12px',
                                        borderRadius: '999px',
                                        fontWeight: '500'
                                    }}>
                                        {cert.year}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </Section>

                </div>
            </div>
        </section>
    );
};

export default Experience;
