
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

 // const elements = document.querySelectorAll('.block, .crt, .hire, .cert-3, #Contact_me');

 //  const observer = new IntersectionObserver((entries) => {
 //    entries.forEach((entry) => {
 //      if (entry.isIntersecting) {
 //        entry.target.classList.add('show');
 //        observer.unobserve(entry.target); // Optional: animate only once
 //      }
 //    });
 //  }, {
 //    threshold: 0.1
 //  });

const elements = document.querySelectorAll('.block, .crt, .hire, .cert-3, #Contact_me');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  }, {
    threshold: 0.1 // adjust sensitivity here
  });

  elements.forEach(el => {
    observer.observe(el);
  });

  elements.forEach((el) => {
    observer.observe(el);
  });

