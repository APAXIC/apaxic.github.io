const tabs = [...document.querySelectorAll('[data-tab]')];
function activateTab(tab) {
  tabs.forEach(button => {
    const active = button === tab;
    button.setAttribute('aria-selected', String(active));
    button.tabIndex = active ? 0 : -1;
    document.getElementById(`panel-${button.dataset.tab}`).hidden = !active;
  });
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    activateTab(tabs[next]);
    tabs[next].focus();
  });
});

const galleries = {
  eonet: { title: 'NASA EONET Events Tracker', images: [
    { src: 'assets/gallery/eonet/eonet-1.png', caption: 'Map and active events' },
    { src: 'assets/gallery/eonet/eonet-2.png', caption: 'Custom watch zones' },
    { src: 'assets/gallery/eonet/eonet-3.png', caption: 'Notifications' },
    { src: 'assets/gallery/eonet/eonet-4.png', caption: 'Historical data and statistics' },
    { src: 'assets/gallery/eonet/eonet-5.png', caption: 'Map settings' }
  ]},
  argentum: { title: 'Argentum', images: [
    { src: 'assets/gallery/argentum/argentum-1.png', caption: 'Main page' },
    { src: 'assets/gallery/argentum/argentum-2.png', caption: 'Dashboard' },
    { src: 'assets/gallery/argentum/argentum-3.png', caption: 'Transactions' },
    { src: 'assets/gallery/argentum/argentum-4.png', caption: 'Categories' },
    { src: 'assets/gallery/argentum/argentum-5.png', caption: 'Creating a financial goal' }
  ]},
  apartica: { title: 'Apartica', images: [
    { src: 'assets/gallery/apartica/apartica-1.png', caption: 'Main page' },
    { src: 'assets/gallery/apartica/apartica-2.png', caption: 'Accommodation search' },
    { src: 'assets/gallery/apartica/apartica-3.png', caption: 'Accommodation page' },
    { src: 'assets/gallery/apartica/apartica-4.png', caption: 'Accommodation booking' },
    { src: 'assets/gallery/apartica/apartica-5.png', caption: 'Booking management' },
    { src: 'assets/gallery/apartica/apartica-6.png', caption: 'Accommodation management for hosts' }
  ]}
};

const dialog = document.getElementById('gallery-dialog');
const galleryImage = document.getElementById('gallery-image');
const placeholder = document.getElementById('gallery-placeholder');
const caption = document.getElementById('gallery-caption');
const counter = document.getElementById('gallery-count');
let currentGallery = null;
let currentIndex = 0;
function showSlide() {
  const slide = currentGallery.images[currentIndex];
  galleryImage.hidden = true;
  placeholder.hidden = false;
  galleryImage.alt = `${currentGallery.title}: ${slide.caption}`;
  galleryImage.onload = () => { galleryImage.hidden = false; placeholder.hidden = true; };
  galleryImage.onerror = () => { galleryImage.hidden = true; placeholder.hidden = false; };
  galleryImage.src = slide.src;
  caption.textContent = slide.caption;
  counter.textContent = `${currentIndex + 1} / ${currentGallery.images.length}`;
}
document.querySelectorAll('[data-gallery]').forEach(button => {
  button.addEventListener('click', () => {
    currentGallery = galleries[button.dataset.gallery];
    currentIndex = 0;
    document.getElementById('gallery-title').textContent = `🖼 ${currentGallery.title} — Gallery`;
    showSlide();
    dialog.showModal();
  });
});
function moveSlide(direction) {
  if (!currentGallery) return;
  currentIndex = (currentIndex + direction + currentGallery.images.length) % currentGallery.images.length;
  showSlide();
}
document.getElementById('gallery-prev').addEventListener('click', () => moveSlide(-1));
document.getElementById('gallery-next').addEventListener('click', () => moveSlide(1));
document.getElementById('gallery-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') moveSlide(-1);
  if (event.key === 'ArrowRight') moveSlide(1);
});

const skillDescriptions = {
  "JavaScript / TypeScript": "I used these programming languages across multiple full-stack applications, including NASA EONET Events Tracker, Argentum and Apartica. I have also built smaller projects using JavaScript and the DOM.",
  "C# / Python": "I used these programming languages in personal projects and during my university studies. My computer science coursework has also helped me practise applying core programming concepts.",
  "React": "Used React to build the frontend interfaces for most my projects.",
  "Django": "Used Django once in a small project to practice switching between multiple languages and frameworks and found myself comfortable and confident using it.",
  "Express.js / NestJS": "Express.js powers the backend of NASA EONET Events Tracker and Apartica; NestJS was used for Argentum. I have also worked with Express.js in other projects.",
  "PostgreSQL / MongoDB": "I can work with both SQL and NoSQL databases. PostgreSQL is used in NASA EONET Events Tracker, while MongoDB is used in Argentum and other projects. My coursework also supports my understanding of relational and non-relational data models.",
  "HTML5 / CSS3": "The site you see is built without a frontend framework, using just pure HTML, CSS and JavaScript DOM manipulation.",
  "Team collaboration": "Worked with a teammate on Argentum, a budgeting application, and also completed several group assignments of varying difficulty at university.",
  "Problem-solving": "Practised through regional informatics olympiads, computer science coursework, and challenging application features in personal projects.",
  "Communication": "Developed through university group assignments and collaborating on shared project.",
  "Continuous learning": "I regularly learn new technologies while building projects, moving between different programming languages, frameworks and databases.",
  "Adaptability": "Applied different technology stacks across multiple personal projects, adapting to each project’s requirements.",
  "Docker": "Used in NASA EONET Events Tracker to support a containerised development environment.",
  "Linux / Shell / CLI": "Hands-on experience using Linux, shell commands and command-line tools during development and coursework.",
  "Git / GitHub": "Used for version control across coursework, personal and group projects, including collaboration on Argentum.",
  "JWT authentication": "Implemented JWT-based authentication in several projects.",
  "REST APIs": "Integrated third-party APIs, including NASA EONET, Stripe payment, Google OAuth and others and developed backend endpoints for full-stack applications."
};

const skillDialog = document.getElementById('skill-dialog');
const skillTitle = document.getElementById('skill-title');
const skillDescription = document.getElementById('skill-description');

document.querySelectorAll('[data-skill]').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.dataset.skill;
    skillTitle.textContent = `💡 ${name}`;
    skillDescription.textContent = skillDescriptions[name] || 'Details coming soon.';
    skillDialog.showModal();
  });
});

document.getElementById('skill-close').addEventListener('click', () => skillDialog.close());
document.getElementById('skill-ok').addEventListener('click', () => skillDialog.close());
skillDialog.addEventListener('click', event => {
  if (event.target === skillDialog) skillDialog.close();
});
