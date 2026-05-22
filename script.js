// Piyush Portfolio Interactive Controller

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initStatsCounter();
  initPortfolioFilter();
  initTestimonialSlider();
  initContactForm();
  initScrollSpy();
  initFloatingDots();
});

// 1. Mobile Menu Toggle
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMenu() {
    mobileMenu.classList.toggle('translate-x-0');
    mobileMenu.classList.toggle('translate-x-full');
    mobileMenuOverlay.classList.toggle('opacity-0');
    mobileMenuOverlay.classList.toggle('pointer-events-none');
    document.body.classList.toggle('overflow-hidden');
  }

  if (mobileMenuBtn && mobileMenu && mobileMenuOverlay) {
    mobileMenuBtn.addEventListener('click', toggleMenu);
    mobileMenuOverlay.addEventListener('click', toggleMenu);
    
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', toggleMenu);
    });
  }
}

// 2. Stats Counter Animation using IntersectionObserver
function initStatsCounter() {
  const statsSection = document.getElementById('stats-section');
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  if (statsSection && statNumbers.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            const duration = 1500; // ms
            const stepTime = Math.abs(Math.floor(duration / target));
            let current = 0;
            
            const timer = setInterval(() => {
              current += Math.ceil(target / (duration / 30)); // Step size for smooth animation
              if (current >= target) {
                stat.textContent = target + '+';
                clearInterval(timer);
              } else {
                stat.textContent = current + '+';
              }
            }, 30);
          });
          observer.unobserve(statsSection);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(statsSection);
  }
}

// 3. Portfolio Tab Filter
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle Active Button styling matching Editorial Aesthetic
        filterBtns.forEach(b => {
          b.classList.remove('bg-[#141414]', 'text-[#f5f5f0]');
          b.classList.add('bg-transparent', 'text-[#141414]/75');
        });
        btn.classList.add('bg-[#141414]', 'text-[#f5f5f0]');
        btn.classList.remove('bg-transparent', 'text-[#141414]/75');

        const filter = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
          const category = item.getAttribute('data-category');
          
          if (filter === 'all' || category === filter) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
}

// 4. Testimonial Horizontal Slider
function initTestimonialSlider() {
  const testimonials = [
    {
      stars: 5,
      text: "We will also facilitate the business marketing of these products with our SEO experts so that they become a ready to use website & help sell product from company.",
      name: "Amir Uddin",
      role: "UX Designer",
      avatarSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
    },
    {
      stars: 5,
      text: "Piyush's incredible attention to detail and modern user experience principles enabled us to secure our lead venture round. Incredibly professional to work with!",
      name: "Salim Ahmed",
      role: "UI Designer",
      avatarSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120"
    },
    {
      stars: 5,
      text: "Absolute master class in product typography and grid structures. Piyush simplified a highly complex multi-tenant B2B interface into beautiful intuitive flows.",
      name: "Guy Hawkins",
      role: "Senior Product Specialist",
      avatarSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120"
    }
  ];

  let currentIndex = 0;
  const quoteText = document.getElementById('testimonial-quote');
  const userName = document.getElementById('testimonial-name');
  const userRole = document.getElementById('testimonial-role');
  const userAvatar = document.getElementById('testimonial-avatar');
  const starContainer = document.getElementById('testimonial-stars');
  
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  
  const currentIndicator = document.getElementById('testimonial-current-indicator');

  function renderTestimonial(index) {
    if (!quoteText) return;
    
    // Add simple fade animation
    const container = document.getElementById('testimonial-card-container');
    if (container) {
      container.style.opacity = '0';
      container.style.transform = 'translateY(10px)';
    }

    setTimeout(() => {
      const current = testimonials[index];
      
      // Update data
      quoteText.textContent = `"${current.text}"`;
      userName.textContent = current.name;
      userRole.textContent = current.role;
      userAvatar.src = current.avatarSrc;

      // Update stars
      starContainer.innerHTML = '';
      for (let i = 0; i < current.stars; i++) {
        starContainer.innerHTML += `
          <svg class="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        `;
      }

      // Update pagination pills
      if (currentIndicator) {
        currentIndicator.textContent = `0${index + 1} / 0${testimonials.length}`;
      }

      if (container) {
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
      }
    }, 200);
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      renderTestimonial(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      renderTestimonial(currentIndex);
    });

    // Initial render
    renderTestimonial(0);
  }
}

// 5. Contact Form Submission
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simple validation
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const budget = document.getElementById('form-budget').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        console.warn('Required contact fields missing.');
        return;
      }

      // Disable button, show interactive loader
      submitBtn.disabled = true;
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg class="animate-spin h-5 w-5 text-white inline mr-2" viewBox="0 0 24 24" fill="none">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> Sending...
      `;

      // Mock dynamic server response
      setTimeout(() => {
        submitBtn.innerHTML = 'Message Sent! ✔';
        submitBtn.classList.remove('bg-[#141414]', 'text-[#f5f5f0]');
        submitBtn.classList.add('bg-[#2c9a62]', 'text-white');
        
        // Success dialog - editorial aesthetic (black borders, box structure)
        const successBanner = document.createElement('div');
        successBanner.className = 'mt-4 p-5 text-[#141414] bg-[#f5f5f0] border-2 border-[#141414] text-xs font-mono font-bold tracking-wide flex items-start';
        successBanner.innerHTML = `
          <svg class="w-4 h-4 text-[#2c9a62] mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <div>
            <strong class="uppercase text-[#2c9a62] block mb-1">[Success Confirmation]</strong>
            Thanks ${name}. Your proposal coordinates have been securely published. Piyush will respond to <strong>${email}</strong> directly.
          </div>
        `;
        contactForm.appendChild(successBanner);
        contactForm.reset();

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.classList.remove('bg-[#2c9a62]', 'text-white');
          successBanner.style.transition = 'opacity 1s';
          successBanner.style.opacity = '0';
          setTimeout(() => successBanner.remove(), 1000);
        }, 10000);

      }, 1500);
    });
  }
}

// 6. Scroll Spy for navigation indicators
function initScrollSpy() {
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.desktop-nav-link');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPos = window.scrollY + 150; // offset for sticky header

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-primary');
      link.classList.add('text-slate-600');
      // Look for data-sec or href match
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('text-primary');
        link.classList.remove('text-slate-600');
      }
    });
    
    // Header shadow addition on scroll
    const header = document.getElementById('main-header');
    if (header) {
      if (window.scrollY > 20) {
        header.classList.add('border-[#141414]', 'bg-[#f5f5f0]/95', 'backdrop-blur-md');
        header.classList.remove('border-transparent');
      } else {
        header.classList.remove('border-[#141414]', 'bg-[#f5f5f0]/95', 'backdrop-blur-md');
        header.classList.add('border-transparent');
      }
    }
  });
}

// 7. Small whimsical touch: Floating background dots mouse responsiveness
function initFloatingDots() {
  const heroSection = document.getElementById('hero-section');
  const dots = document.querySelectorAll('.floating-dot');

  if (heroSection && window.innerWidth > 768) {
    heroSection.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const bounds = heroSection.getBoundingClientRect();
      const relX = mouseX - bounds.left;
      const relY = mouseY - bounds.top;

      dots.forEach((dot, index) => {
        const factor = (index + 1) * 0.015;
        const x = (relX - bounds.width / 2) * factor;
        const y = (relY - bounds.height / 2) * factor;
        
        dot.style.transform = `translate(${x}px, ${y}px)`;
      });
    });

    heroSection.addEventListener('mouseleave', () => {
      dots.forEach(dot => {
        dot.style.transform = `translate(0px, 0px)`;
      });
    });
  }
}
