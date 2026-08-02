document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu .nav-link');
    const hamburgerIcon = document.querySelector('.hamburger i');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        
        // Toggle Icon
        if(mobileMenu.classList.contains('open')) {
            hamburgerIcon.classList.remove('fa-bars');
            hamburgerIcon.classList.add('fa-times');
        } else {
            hamburgerIcon.classList.remove('fa-times');
            hamburgerIcon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            hamburgerIcon.classList.remove('fa-times');
            hamburgerIcon.classList.add('fa-bars');
        });
    });

    // 2. Sticky Navbar & Active Link Update on Scroll
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links .nav-link');

    window.addEventListener('scroll', () => {
        // Sticky Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Update
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 3. Scroll Reveal Animations
    const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealOnScroll = () => {
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 100;

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    };

    window.addEventListener('scroll', revealOnScroll);
    
    // Trigger once on load to reveal elements initially visible
    revealOnScroll();
    
    // 4. Typing Effect for Hero Section
    const typeTextSpan = document.querySelector('.type-text');
    const roles = ["Computer Science Engineer", "Full-Stack Developer", "Cloud Architect", "AI Enthusiast"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 150;
    let erasingDelay = 100;
    let newTextDelay = 2000;

    function type() {
        if (!typeTextSpan) return;
        
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typeTextSpan.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typeTextSpan.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? erasingDelay : typingDelay;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = newTextDelay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex++;
            if (roleIndex >= roles.length) roleIndex = 0;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    if (typeTextSpan) {
        setTimeout(type, newTextDelay);
    }

    // 5. Initialize Particles.js if available
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 250,
                    "density": { "enable": true, "value_area": 800 }
                },
                "color": { "value": ["#ffffff", "#00f2fe", "#4facfe"] },
                "shape": {
                    "type": "circle",
                    "stroke": { "width": 0, "color": "#000000" }
                },
                "opacity": {
                    "value": 0.8,
                    "random": true,
                    "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false }
                },
                "line_linked": {
                    "enable": false
                },
                "move": {
                    "enable": true,
                    "speed": 1.5,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "bubble" },
                    "onclick": { "enable": true, "mode": "repulse" },
                    "resize": true
                },
                "modes": {
                    "bubble": { "distance": 200, "size": 6, "duration": 2, "opacity": 1, "speed": 3 },
                    "repulse": { "distance": 200, "duration": 0.4 }
                }
            },
            "retina_detect": true
        });
    }

    // 6. Interactive Projects Gallery
    const projectsData = [
        {
            title: "AI Code Review Assistant",
            desc: "AI-powered automated pull request review platform",
            image: "assets/proj_ai_new_1785615411490.png", 
            bullets: [
                "Developed an AI-powered code review platform integrating Gemini LLM and GitHub API to analyze commits, generate contextual feedback, and automate pull request review workflows.",
                "Engineered an asynchronous FastAPI backend with secure Supabase authentication and a responsive React dashboard for scalable multi-repository management and AI-driven code diff visualization."
            ],
            tech: ["React.js", "FastAPI", "Python", "Supabase", "Gemini LLM"],
            link: "https://github.com/Laxmiharika522/Ai-code-review-assisstant"
        },
        {
            title: "InventoryPro",
            desc: "Database-driven retail inventory and transaction management platform",
            image: "assets/proj_inv_orange_1785613680161.png",
            bullets: [
                "Built a real-time inventory and sales management platform supporting stock tracking, supplier management, and transaction processing across multiple operational modules.",
                "Implemented ACID-compliant transaction workflows, idempotent billing APIs, and optimized relational database queries to ensure concurrent data consistency and faster reporting."
            ],
            tech: ["React.js", "Express.js", "MySQL"],
            link: "https://github.com/Laxmiharika522/Design-and-Implementation-of-an-Inventory-and-Sales-Management-System-for-a-Retail-Store"
        },
        {
            title: "Magpie Books",
            desc: "Full-stack library management and digital borrowing platform",
            image: "assets/proj_magpie_gold_1785613693888.png",
            bullets: [
                "Developed a full-stack digital library platform enabling catalog search, online book borrowing, and centralized administrative inventory management.",
                "Integrated the Open Library API with scalable relational schemas and RESTful APIs to automate metadata synchronization and efficiently manage rental histories and user operations."
            ],
            tech: ["React.js", "Flask", "MySQL"],
            link: "https://github.com/Laxmiharika522/Rental-Library-Management-System"
        },
        {
            title: "Space News NLP",
            desc: "Large-scale NLP pipeline for space industry news analytics",
            image: "assets/proj_space_white_1785614038744.png",
            bullets: [
                "Built an NLP pipeline processing 20,000+ space industry news articles using sentiment analysis, topic modeling, and named entity recognition to uncover industry trends and thematic insights.",
                "Applied VADER sentiment analysis, LDA topic modeling, and spaCy NER to transform unstructured text into actionable data visualizations for market research."
            ],
            tech: ["Python", "NLP", "Machine Learning"],
            link: "https://github.com/Laxmiharika522/SpaceNews-NLP-Analysis"
        }
    ];

    const tabsContainer = document.getElementById('projects-tabs-container');
    const featuredImg = document.getElementById('featured-img');
    const featuredTitle = document.getElementById('featured-title');
    const featuredDesc = document.getElementById('featured-desc');
    const featuredBullets = document.getElementById('featured-bullets');
    const featuredTech = document.getElementById('featured-tech');
    const featuredLink = document.getElementById('featured-link');
    const nextProjectBtn = document.getElementById('next-project-btn');
    
    let currentProjectIndex = 0;

    if (tabsContainer && featuredImg) {
        // Initialize tabs
        projectsData.forEach((project, index) => {
            const tab = document.createElement('div');
            tab.className = `project-tab ${index === 0 ? 'active' : ''}`;
            tab.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
                <span>${project.title}</span>
            `;
            tab.addEventListener('click', () => updateFeaturedProject(index));
            tabsContainer.appendChild(tab);
        });

        // Initialize featured project
        updateFeaturedProject(0);

        // Next button
        if(nextProjectBtn) {
            nextProjectBtn.addEventListener('click', () => {
                let nextIndex = (currentProjectIndex + 1) % projectsData.length;
                updateFeaturedProject(nextIndex);
            });
        }
    }

    function updateFeaturedProject(index) {
        currentProjectIndex = index;
        const project = projectsData[index];
        
        // Update DOM
        featuredImg.src = project.image;
        featuredTitle.textContent = project.title;
        featuredDesc.textContent = project.desc;
        featuredLink.href = project.link;
        
        // Update bullets
        featuredBullets.innerHTML = '';
        project.bullets.forEach(bullet => {
            const li = document.createElement('li');
            li.textContent = bullet;
            featuredBullets.appendChild(li);
        });
        
        // Update tech
        featuredTech.innerHTML = '';
        project.tech.forEach(t => {
            const span = document.createElement('span');
            span.textContent = t;
            featuredTech.appendChild(span);
        });

        // Update active tab styling
        const tabs = tabsContainer.querySelectorAll('.project-tab');
        tabs.forEach((tab, i) => {
            if (i === index) {
                tab.classList.add('active');
                // Safely scroll only the tabs container, preventing full page shift
                const tabLeft = tab.offsetLeft;
                const tabWidth = tab.offsetWidth;
                const containerWidth = tabsContainer.offsetWidth;
                tabsContainer.scrollTo({
                    left: tabLeft - (containerWidth / 2) + (tabWidth / 2),
                    behavior: 'smooth'
                });
            } else {
                tab.classList.remove('active');
            }
        });
    }
});

// ==========================================
// Three.js Animated Globe
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('globe-container');
    if (!container || typeof THREE === 'undefined') return;

    // Set up Scene, Camera, Renderer
    const scene = new THREE.Scene();
    
    // We want a transparent background
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    // Get container dimensions
    let width = container.clientWidth;
    let height = container.clientHeight;
    
    // Fallback if container has no height initially
    if (height === 0) height = 400;

    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7.5; // Increased to make the globe appear slightly smaller

    // Create the main sphere (Textured Earth)
    const textureLoader = new THREE.TextureLoader();
    const earthMap = textureLoader.load('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg');
    
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    const material = new THREE.MeshPhongMaterial({
        map: earthMap,
        color: 0xffffff,
        specular: 0x222222,
        shininess: 25,
        transparent: true,
        opacity: 0.98
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);
    
    // Add rim lighting to separate globe from dark background
    const backLight = new THREE.DirectionalLight(0x00f2fe, 0.8);
    backLight.position.set(-5, 3, -5);
    scene.add(backLight);

    // Atmosphere Glow
    const atmosGeom = new THREE.SphereGeometry(2.12, 64, 64);
    const atmosMat = new THREE.MeshBasicMaterial({
        color: 0x00f2fe,
        transparent: true,
        opacity: 0.2,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending
    });
    const atmos = new THREE.Mesh(atmosGeom, atmosMat);
    scene.add(atmos);

    // Create Ring 1
    const ring1Geom = new THREE.RingGeometry(2.4, 2.42, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
    });
    const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
    ring1.rotation.x = Math.PI / 2.2;
    ring1.rotation.y = Math.PI / 8;
    scene.add(ring1);

    // Create Ring 2
    const ring2Geom = new THREE.RingGeometry(2.7, 2.72, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({
        color: 0x00f2fe,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4
    });
    const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
    ring2.rotation.x = Math.PI / 2.8;
    ring2.rotation.y = -Math.PI / 6;
    scene.add(ring2);

    // Orbiting Particles (Stars)
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
        // Random positions around the sphere
        posArray[i] = (Math.random() - 0.5) * 8;
    }
    const particlesGeom = new THREE.BufferGeometry();
    particlesGeom.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
        size: 0.03,
        color: 0x00f2fe,
        transparent: true,
        opacity: 0.8
    });
    const particles = new THREE.Points(particlesGeom, particlesMat);
    scene.add(particles);

    // Animation Loop
    const animate = () => {
        requestAnimationFrame(animate);
        
        // Gentle rotations (increased speed)
        sphere.rotation.y += 0.005;
        
        atmos.rotation.y += 0.005;

        ring1.rotation.z -= 0.003;
        ring2.rotation.z += 0.005;

        particles.rotation.y += 0.001;
        particles.rotation.x -= 0.0005;

        // Add floating effect
        const time = Date.now() * 0.001;
        scene.position.y = Math.sin(time) * 0.15;

        renderer.render(scene, camera);
    };
    
    animate();

    // Handle Window Resize
    window.addEventListener('resize', () => {
        width = container.clientWidth;
        height = container.clientHeight || 400;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
});
