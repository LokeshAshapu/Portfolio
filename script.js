// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#') return;
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Light/Dark Theme Toggling
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check stored theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        let theme = htmlElement.getAttribute('data-theme');
        let newTheme = (theme === 'dark') ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('i');
    if (!icon) return;
    if (theme === 'dark') {
        icon.className = 'fa-solid fa-sun';
    } else {
        icon.className = 'fa-solid fa-moon';
    }
}

// Typing Effect for Hero Section
const typedTextSpan = document.getElementById('typed-text');
const roles = ["Frontend Developer", "Product Designer", "Prompt Engineer", "Computer Engineering Student"];
const typingDelay = 100;
const erasingDelay = 60;
const newRoleDelay = 2000;
let roleIndex = 0;
let charIndex = 0;

function type() {
    if (!typedTextSpan) return;
    if (charIndex < roles[roleIndex].length) {
        typedTextSpan.textContent += roles[roleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newRoleDelay);
    }
}

function erase() {
    if (!typedTextSpan) return;
    if (charIndex > 0) {
        typedTextSpan.textContent = roles[roleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, typingDelay + 300);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (roles.length) setTimeout(type, newRoleDelay - 1500);
});

// Scroll Reveal Animations
const revealElements = document.querySelectorAll('.scroll-reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Reveal only once
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => revealObserver.observe(el));

// GitHub Projects Dynamic Rendering & Filtering (Only runs on projects.html)
const repositories = [
    { name: "GreenLoopAI", language: "HTML", url: "https://github.com/LokeshAshapu/GreenLoopAI", description: "A platform integrating AI and data analytics to optimize eco-friendly operations.", tags: ["html/css", "ai"] },
    { name: "civictrack", language: "HTML", url: "https://github.com/LokeshAshapu/civictrack", description: "Internship project developed at DataValley, demonstrating real-world application of software development concepts and technologies.", tags: ["html/css", "backend"] },
    { name: "IBM_internship_project", language: "HTML", url: "https://github.com/LokeshAshapu/IBM_internship_project", description: "Backend and frontend code for the IBM SkillsBuild internship project.", tags: ["html/css"] },
    { name: "TeamFlow", language: "JavaScript", url: "https://github.com/LokeshAshapu/TeamFlow", description: "Collaboration and project management tool designed for agile developer teams.", tags: ["javascript"] },
    { name: "conventions", language: "TypeScript", url: "https://github.com/LokeshAshapu/conventions", description: "Code style guidelines, linter configurations, and conventions repository.", tags: ["typescript"] },
    { name: "IBM-internship-project", language: "JavaScript", url: "https://github.com/LokeshAshapu/IBM-internship-project", description: "Responsive front-end web portal created during the IBM frontend development certification.", tags: ["javascript"] },
    { name: "Zorvyn", language: "JavaScript", url: "https://github.com/LokeshAshapu/Zorvyn", description: "Design assets, layouts, and product showcase code for Grovyn graphic design products.", tags: ["javascript"] },
    { name: "google-ca-month2", language: "JavaScript", url: "https://github.com/LokeshAshapu/google-ca-month2", description: "Google Career Certificate program monthly assessment projects.", tags: ["javascript"] },
    { name: "gear4rent", language: "HTML", url: "https://github.com/LokeshAshapu/gear4rent", description: "Equipment rental marketplace platform with responsive, interactive rental booking dashboards.", tags: ["html/css"] },
    { name: "Meditrack", language: "JavaScript", url: "https://github.com/LokeshAshapu/Meditrack", description: "Healthcare management system featuring appointment booking, patient registrations, and secure medical history dashboards.", tags: ["javascript", "backend"] },
    { name: "Warehouse-Operations-Explainer-Bot", language: "Python", url: "https://github.com/LokeshAshapu/Warehouse-Operations-Explainer-Bot", description: "Intelligent AI assistant bot developed to explain complex warehouse log data and operations.", tags: ["python", "ai"] },
    { name: "Portfolio", language: "JavaScript", url: "https://github.com/LokeshAshapu/Portfolio", description: "Source code of this personal developer portfolio showing skills, experience, and contact forms.", tags: ["javascript", "html/css"] },
    { name: "generate-and-learn-main", language: "TypeScript", url: "https://github.com/LokeshAshapu/generate-and-learn-main", description: "Educational AI-powered quizzes and code snippet generator tool.", tags: ["typescript", "ai"] },
    { name: "QrCode-Generator", language: "HTML", url: "https://github.com/LokeshAshapu/QrCode-Generator", description: "Sleek client-side web tool to generate, download, and share customized QR codes instantly.", tags: ["html/css"] },
    { name: "cardioguard-ai", language: "JavaScript", url: "https://github.com/LokeshAshapu/cardioguard-ai", description: "Heart health diagnostic AI platform running local predictive analysis.", tags: ["javascript", "ai"] },
    { name: "IBM-Magic-Bus-Foundation-workshop", language: "HTML", url: "https://github.com/LokeshAshapu/IBM-Magic-Bus-Foundation-workshop", description: "Social impact workshop landing page designed for the Magic Bus Foundation.", tags: ["html/css"] },
    { name: "capston", language: "Python", url: "https://github.com/LokeshAshapu/capston", description: "Capstone engineering project using machine learning models to solve data challenges.", tags: ["python", "ai"] },
    { name: "EcoTracker", language: "TypeScript", url: "https://github.com/LokeshAshapu/EcoTracker", description: "Real-time supply chain environmental tracker highlighting green metrics and sustainability metrics.", tags: ["typescript", "backend"] },
    { name: "ModernBlog", language: "HTML", url: "https://github.com/LokeshAshapu/ModernBlog", description: "Static grid blog layout with clean design, typography, and responsive articles.", tags: ["html/css"] },
    { name: "Assignment-Plooran", language: "JavaScript", url: "https://github.com/LokeshAshapu/Assignment-Plooran", description: "Front-end developer technical assessment demonstrating UI/UX layouts.", tags: ["javascript"] },
    { name: "HACK_TIME_Hackathon", language: "JavaScript", url: "https://github.com/LokeshAshapu/HACK_TIME_Hackathon", description: "Interactive hackathon tracking system showing real-time submissions and team countdowns.", tags: ["javascript"] },
    { name: "Aicte-internship-IBM", language: "Python", url: "https://github.com/LokeshAshapu/Aicte-internship-IBM", description: "AICTE resume screening and ranking project using Natural Language Processing.", tags: ["python", "ai"] },
    { name: "Medicine-on-complete-updator", language: "JavaScript", url: "https://github.com/LokeshAshapu/Medicine-on-complete-updator", description: "Pharmacy stock and inventory automatic updater backend system.", tags: ["javascript", "backend"] },
    { name: "StudentNeed", language: "PHP", url: "https://github.com/LokeshAshapu/StudentNeed", description: "Comprehensive student hub portal for notes exchange, study materials, and campus updates.", tags: ["backend"] },
    { name: "Age-Calculator", language: "HTML", url: "https://github.com/LokeshAshapu/Age-Calculator", description: "Fast, responsive client-side utility calculator with clean, dark-mode styling.", tags: ["html/css"] },
    { name: "micro-it-india-intern-stop-watch-project", language: "JavaScript", url: "https://github.com/LokeshAshapu/micro-it-india-intern-stop-watch-project", description: "Professional stop-watch project with lap recording completed during the Micro IT India internship.", tags: ["javascript"] },
    { name: "Micro-it-india-intern-calculator-project", language: "HTML", url: "https://github.com/LokeshAshapu/Micro-it-india-intern-calculator-project", description: "Interactive standard mathematical web calculator from Micro IT India internship.", tags: ["html/css"] },
    { name: "skills-getting-started-with-github-copilot", language: "JavaScript", url: "https://github.com/LokeshAshapu/skills-getting-started-with-github-copilot", description: "Exercise: Get started using GitHub Copilot", tags: ["javascript", "ai"] },
    { name: "Ai-resume-Screening-and-ranking-system", language: "Python", url: "https://github.com/LokeshAshapu/Ai-resume-Screening-and-ranking-system", description: "Natural Language Processing web app to parse resume text and rank candidates by job match.", tags: ["python", "ai", "backend"] },
    { name: "GenAI-101-Workshop", language: "HTML", url: "https://github.com/LokeshAshapu/GenAI-101-Workshop", description: "Resources, slides, and code examples for GenAI workshop training sessions.", tags: ["html/css", "ai"] }
];

const container = document.getElementById('github-projects-container');
const searchInput = document.getElementById('project-search');
const filterPills = document.querySelectorAll('.filter-pill');

let activeFilter = 'all';
let searchQuery = '';

function renderProjects() {
    if (!container) return; // Exit if not on projects page
    container.innerHTML = '';

    const filtered = repositories.filter(repo => {
        const matchesFilter = activeFilter === 'all' || repo.tags.includes(activeFilter);
        const matchesSearch = repo.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              repo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              repo.language.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 0; color: var(--text-muted);">
                <i class="fa-solid fa-folder-open" style="font-size: 3rem; margin-bottom: 1rem; display: block;"></i>
                <p style="font-size: 1.1rem; font-weight: 500;">No projects found matching your search.</p>
            </div>
        `;
        return;
    }

    filtered.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'prodiv1';

        // Choose appropriate icon depending on primary tag
        let iconClass = 'fa-solid fa-code';
        if (repo.tags.includes('ai')) iconClass = 'fa-solid fa-robot';
        else if (repo.tags.includes('backend')) iconClass = 'fa-solid fa-server';
        else if (repo.tags.includes('typescript')) iconClass = 'fa-solid fa-cubes';

        card.innerHTML = `
            <h4>${repo.language || 'Code'}</h4>
            <div style="background: linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.08) 0%, rgba(20, 184, 166, 0.08) 100%); border: 1px solid var(--border-color); height: 100px; border-radius: var(--radius-md); margin-bottom: 1.25rem; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; color: var(--color-primary);">
                <i class="${iconClass}"></i>
            </div>
            <h2 class="card-head" style="font-size: 1.2rem;">${repo.name}</h2>
            <p class="para-3" style="font-size: 0.88rem; margin-bottom: 1rem;">${repo.description || 'No description provided yet.'}</p>
            <div class="prodiv1-links" style="padding-top: 0.75rem;">
                <a href="${repo.url}" target="_blank" class="btn-1" style="font-size: 0.85rem;">View Repository &nbsp;<i class="fa-solid fa-chevron-right" style="font-size: 0.75rem;"></i></a>
                <a href="${repo.url}" target="_blank" style="font-size: 1.15rem;"><i class="fab fa-github a"></i></a>
            </div>
        `;
        container.appendChild(card);
    });
}

// Attach Search and Filter event listeners
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderProjects();
    });
}

filterPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
        filterPills.forEach(p => p.classList.remove('active'));
        e.target.classList.add('active');
        activeFilter = e.target.getAttribute('data-filter');
        renderProjects();
    });
});

// Initial render
if (container) {
    renderProjects();
}
