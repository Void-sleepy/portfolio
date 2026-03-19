// ─────────────────────────────────────────────
// PROJECTS DATA  ← edit this when you have your CV
// ─────────────────────────────────────────────
// Each project:
//   icon    — any emoji
//   title   — project name
//   desc    — one/two sentence description
//   tags    — array of tech strings
//   github  — URL string, or null to hide the button
//   demo    — URL string, or null to hide the button
//   image   — optional image URL string
//   imageAlt— optional image alt text

const PROJECTS = [
  {
    icon:   '🩺',
    title:  'Jaundice Detection Using Deep Learning',
    desc:   'Built a hybrid CNN+RNN model to detect jaundice from medical images using real-world data, achieving high diagnostic accuracy.',
    tags:   ['Python', 'Deep Learning', 'CNN', 'RNN'],
    github: null,
    demo:   null,
  },
  {
    icon:   '🚆',
    title:  'Train Management Database System',
    desc:   'Designed an optimized SQL database for train operations with normalization and built a GUI for clear system interaction and data visualization.',
    tags:   ['SQL', 'Database Design', 'Normalization', 'GUI'],
    github: null,
    demo:   null,
  },
  {
    icon:   '🧵',
    title:  'Unix xv6 OS System Call Tracer',
    desc:   'Implemented kernel-level tracing in xv6 to monitor system calls in real time, helping debugging through process and memory tracking.',
    tags:   ['C', 'xv6', 'Operating Systems', 'Kernel'],
    github: null,
    demo:   null,
  },
  {
    icon:   '🛍️',
    title:  'Big Data E-commerce Deal Recommendation',
    desc:   'Created a real-time personalized deal recommendation pipeline using distributed streaming and storage technologies, containerized for scalability.',
    tags:   ['Kafka', 'Spark', 'Cassandra', 'Docker'],
    github: null,
    demo:   null,
  },
  {
    icon:   '📡',
    title:  'Network Outage Prediction Model',
    desc:   'Developed a Random Forest model for network outage prediction from integrated datasets with feature engineering and robust data cleaning.',
    tags:   ['Python', 'Random Forest', 'Pandas', 'Machine Learning'],
    github: null,
    demo:   null,
  },
  {
    icon:   '📂',
    title:  'Advanced File Explorer',
    desc:   'Built a high-performance file explorer with zip/unzip, undo, and search capabilities, with improved usability and responsiveness.',
    tags:   ['Python', 'UI/UX', 'File Systems', 'Performance'],
    github: null,
    demo:   null,
  },
  {
    icon:   '🏦',
    title:  'Object-Oriented Banking System',
    desc:   'Implemented a Java banking system with secure authentication, transactions, and maintainable architecture using OOP principles.',
    tags:   ['Java', 'OOP', 'Authentication', 'Software Design'],
    github: null,
    demo:   null,
  },
];

// ─── SVG icons used in project cards ───────────
const SVG_GITHUB = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.745 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`;
const SVG_LINK  = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

const INITIAL_PROJECT_BATCH = 4;
const PROJECT_BATCH_SIZE = 3;

function buildProjectCardMarkup(p) {
  const githubBtn = p.github
    ? `<a href="${p.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="icon-link">${SVG_GITHUB}</a>`
    : '';
  const demoBtn = p.demo
    ? `<a href="${p.demo}" target="_blank" rel="noopener noreferrer" aria-label="Live Demo" class="icon-link">${SVG_LINK}</a>`
    : '';
  const tagsHtml = p.tags.map(t => `<span class="tag-sm">${t}</span>`).join('');
  const imageHtml = p.image
    ? `<div class="project-image-wrap"><img class="project-image" src="${p.image}" alt="${p.imageAlt || `${p.title} preview`}" loading="lazy" decoding="async" fetchpriority="low" /></div>`
    : '';

  return `
    <article class="project-card fade-in visible">
      ${imageHtml}
      <div class="card-header">
        <div class="card-icon">${p.icon}</div>
        <div class="card-links">${githubBtn}${demoBtn}</div>
      </div>
      <h3 class="card-title">${p.title}</h3>
      <p class="card-desc">${p.desc}</p>
      <div class="card-tags">${tagsHtml}</div>
    </article>`;
}

function appendProjectBatch(grid, startIndex, batchSize) {
  const endIndex = Math.min(startIndex + batchSize, PROJECTS.length);
  const chunk = PROJECTS.slice(startIndex, endIndex).map(buildProjectCardMarkup).join('');
  grid.insertAdjacentHTML('beforeend', chunk);
  return endIndex;
}

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  if (PROJECTS.length === 0) {
    grid.innerHTML = `
      <div class="projects-empty">
        <p>Projects coming soon — check back shortly!</p>
      </div>`;
    return;
  }

  grid.innerHTML = '';

  // Render the first batch immediately, then progressively append when scrolled near.
  let renderedCount = appendProjectBatch(grid, 0, INITIAL_PROJECT_BATCH);
  if (renderedCount >= PROJECTS.length) return;

  const sentinel = document.createElement('div');
  sentinel.className = 'projects-sentinel';
  grid.appendChild(sentinel);

  if (!('IntersectionObserver' in window)) {
    appendProjectBatch(grid, renderedCount, PROJECTS.length);
    sentinel.remove();
    return;
  }

  const projectObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        renderedCount = appendProjectBatch(grid, renderedCount, PROJECT_BATCH_SIZE);
        if (renderedCount >= PROJECTS.length) {
          projectObserver.disconnect();
          sentinel.remove();
        }
      });
    },
    { rootMargin: '300px 0px' }
  );

  projectObserver.observe(sentinel);
}

renderProjects();

// ─────────────────────────────────────────────
// NAVBAR — scroll shadow + hamburger
// ─────────────────────────────────────────────
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
const themeBtn  = document.getElementById('theme-toggle');

function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  if (themeBtn) {
    const isLight = theme === 'light';
    themeBtn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    themeBtn.setAttribute('title', isLight ? 'Switch to dark mode' : 'Switch to light mode');
  }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light' || savedTheme === 'dark') {
  setTheme(savedTheme);
} else {
  setTheme('dark');
}

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const nextTheme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  });
}

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ─────────────────────────────────────────────
// TYPED TEXT EFFECT
// ─────────────────────────────────────────────
const phrases = [
  'AI / ML Engineer',
  'Deep Learning Dev',
  'NLP Enthusiast',
  'Data Scientist',
  'Freelance Builder',
];

let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
const typedEl   = document.getElementById('typed');

function type() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typedEl.textContent = current.substring(0, charIndex);

  let delay = isDeleting ? 50 : 90;

  if (!isDeleting && charIndex === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 300;
  }

  setTimeout(type, delay);
}

type();

// ─────────────────────────────────────────────
// SCROLL FADE-IN OBSERVER
// ─────────────────────────────────────────────
const fadeTargets = [
  '.section-title',
  '.section-sub',
  '.about-grid',
  '.skill-cat',
  '.project-card',
  '.service-card',
  '.contact-grid',
];

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

fadeTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${i * 60}ms`;
    observer.observe(el);
  });
});

// ─────────────────────────────────────────────
// EMAILJS — keys are loaded from config.js
// (config.js is gitignored — see config.example.js)
// ─────────────────────────────────────────────
emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

// ─────────────────────────────────────────────
// CONTACT FORM
// ─────────────────────────────────────────────
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn      = contactForm.querySelector('button[type="submit"]');
  const original = btn.textContent;

  btn.textContent = 'Sending...';
  btn.disabled    = true;

  const sanitize = str => str.replace(/[<>"'`]/g, c => ({
    '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '`': '&#96;'
  })[c]);

  const params = {
    from_name:  sanitize(contactForm.querySelector('#name').value.trim()),
    from_email: sanitize(contactForm.querySelector('#email').value.trim()),
    subject:    sanitize(contactForm.querySelector('#subject').value.trim()),
    message:    sanitize(contactForm.querySelector('#message').value.trim()),
  };

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
    .then(() => {
      btn.textContent      = 'Message Sent!';
      btn.style.background = 'var(--green)';
      contactForm.reset();
      setTimeout(() => {
        btn.textContent      = original;
        btn.style.background = '';
        btn.disabled         = false;
      }, 3000);
    })
    .catch(() => {
      btn.textContent      = 'Failed — try again';
      btn.style.background = 'var(--red)';
      setTimeout(() => {
        btn.textContent      = original;
        btn.style.background = '';
        btn.disabled         = false;
      }, 3000);
    });
});

// ─────────────────────────────────────────────
// ACTIVE NAV LINK ON SCROLL
// ─────────────────────────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navAnchor = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchor.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${entry.target.id}`
            ? 'var(--text)'
            : '';
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));
