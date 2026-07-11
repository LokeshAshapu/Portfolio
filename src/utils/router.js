export function routeIntent(query) {
  const t = query.toLowerCase().trim();

  // Contact
  if (t.includes('contact') || t.includes('email') || t.includes('linkedin') || t.includes('github') || t.includes('phone') || t.includes('reach') || t.includes('call')) {
    return {
      intent: 'contact',
      title: 'Contact Details',
      ai_text: "You can reach Lokesh directly at +91 6301451462 or email him at lokeshashapu@gmail.com. I've also displayed his social profiles below."
    };
  }

  // Education
  if (t.includes('education') || t.includes('university') || t.includes('study') || t.includes('studied') || t.includes('learn') || t.includes('college') || t.includes('school') || t.includes('degree') || t.includes('bachelor') || t.includes('jntu') || t.includes('sivani')) {
    return {
      intent: 'general',
      title: 'Education',
      ai_text: "Lokesh is pursuing a Bachelor of Technology in Computer Science Engineering at Sri Sivani College of Engineering (affiliated with JNTU Kakinada), with a current CGPA of 8.1. He completed Intermediate education at PPR Kaumudi Junior College (9.01 CGPA) and High School at AP Model School (9.3 CGPA)."
    };
  }

  // Projects
  if (t.includes('project') || t.includes('portfolio') || t.includes('github') || t.includes('code') || t.includes('civic') || t.includes('meditrack') || t.includes('gear')) {
    return {
      intent: 'projects',
      title: 'Projects & Repositories',
      ai_text: "Here is Lokesh's project portfolio, featuring CivicTrack, Meditrack, Gear4Rent, and his personal portfolio. You can also explore all 30 of his repositories directly below."
    };
  }

  // Skills
  if (t.includes('skill') || t.includes('stack') || t.includes('technology') || t.includes('python') || t.includes('react') || t.includes('javascript') || t.includes('frontend') || t.includes('css') || t.includes('figma')) {
    return {
      intent: 'skills',
      title: 'Skills & Expertise',
      ai_text: "Lokesh's core technical skills include Frontend Development (React, Tailwind CSS, JavaScript), Backend (Node.js, Express, Django), Database Management (MongoDB, SQL), UX/UI Design (Figma, graphic design), and AI Tools (Prompt Engineering)."
    };
  }

  // Experience
  if (t.includes('experience') || t.includes('resume') || t.includes('work') || t.includes('job') || t.includes('grovyn') || t.includes('internship') || t.includes('role')) {
    return {
      intent: 'resume',
      title: 'Professional Experience',
      ai_text: "I have loaded Lokesh's professional timeline, highlighting his graphic design experience at Grovyn, IBM frontend development training, and AI chatbot/resume screening internships at Edunet Foundation."
    };
  }

  // Leadership / Google Student Ambassador
  if (t.includes('leadership') || t.includes('gsa') || t.includes('google') || t.includes('ambassador') || t.includes('gdsc') || t.includes('lead')) {
    return {
      intent: 'general',
      title: 'Leadership & Community',
      ai_text: "Lokesh is a Google Student Ambassador (GSA'25). In this role, he leads tech communities, hosts technical workshops on campus (AI, UX/UI, coding), and guides student projects."
    };
  }

  // About Me
  if (t.includes('about') || t.includes('yourself') || t.includes('who are you') || t.includes('lokesh') || t.includes('background') || t.includes('bio')) {
    return {
      intent: 'me',
      title: 'About Lokesh',
      ai_text: "Here is a quick summary of Lokesh's background. He is a Computer Engineering Student, UX/UI Designer, Frontend Developer, and Google Student Ambassador based in Srikakulam, Andhra Pradesh. Ask about his projects, skills, or internships to learn more!"
    };
  }

  // General fallback
  return {
    intent: 'general',
    title: 'Assistant Help',
    ai_text: "I can help you explore Lokesh Ashapu's professional profile. Try asking: 'Show me your projects', 'What are your skills?', 'Tell me about your internships', or 'How can I contact you?'"
  };
}
