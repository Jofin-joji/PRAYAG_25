class DuneEventSchedule {
  constructor() {
    this.events = [
      {
        time: "06:00",
        title: "IDEA PITCH",
        description: "Begin the day with mindfulness as the twin suns rise over the dunes of Arrakis.",
        type: "all",
        location: "location",
        category: "all"
      },
      {
        time: "08:30",
        title: "CODE CONQUEST",
        description: "Master the deadly arts of desert warfare under the guidance of Stilgar.",
        type: "coding",
        location: "location",
        category: "code"
      },
      {
        time: "10:00",
        title: "DA VINCI",
        description: "Strategic planning for the next melange extraction operation in the deep desert.",
        type: "designing",
        location: "location",
        category: "designing"
      },
      {
        time: "12:00",
        title: "VIRTUAL VICTORY",
        description: "Honor the sacred gift of water in the traditional Fremen ritual.",
        type: "gaming",
        location: "location",
        category: "gaming"
      },
      {
        time: "14:30",
        title: "CRYPTIC CODEX",
        description: "Learn the ancient art of riding the great makers through the endless sands.",
        type: "gaming",
        location: "location",
        category: "gaming"
      },
      {
        time: "16:00",
        title: "FUN ZONE",
        description: "Gather with the tribal leaders to discuss matters affecting all of Arrakis.",
        type: "all",
        location: "location",
        category: "all"
      },
      {
        time: "18:00",
        title: "PROJECT EXPO",
        description: "Craft the sacred blade from the tooth of Shai-Hulud under master supervision.",
        type: "all",
        location: "location",
        category: "all"
      },
    ];

    this.currentFilter = 'all';
    this.init();
  }

  init() {
    this.createParticles();
    this.renderEvents();
    this.setupEventListeners();
    this.updateCurrentTime();
    this.animateOnScroll();
    
    // Update time every second
    setInterval(() => this.updateCurrentTime(), 1000);
    
    // Create new particles periodically
    setInterval(() => this.createParticle(), 2000);
  }

  createParticles() {
    const particleContainer = document.getElementById('particles-bg');
    
    // Create initial particles
    for (let i = 0; i < 20; i++) {
      setTimeout(() => this.createParticle(), i * 200);
    }
  }

  createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 3 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    document.getElementById('particles-bg').appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 20000);
  }

  renderEvents() {
    const grid = document.getElementById('schedule-grid');
    grid.innerHTML = '';

    const filteredEvents = this.currentFilter === 'all' 
      ? this.events 
      : this.events.filter(event => event.category === this.currentFilter);

    filteredEvents.forEach((event, index) => {
      const eventCard = this.createEventCard(event);
      grid.appendChild(eventCard);
      
      // Stagger animation
      setTimeout(() => {
        eventCard.classList.add('visible');
      }, index * 100);
    });
  }

  createEventCard(event) {
    const card = document.createElement('div');
    card.className = `event-card ${event.category} hidden`;
    
    card.innerHTML = `
      <div class="event-location">${event.location}</div>
      <div class="event-time">${event.time}</div>
      <h3 class="event-title">${event.title}</h3>
      <p class="event-description">${event.description}</p>
      <span class="event-type">${event.type}</span>
    `;

    // Add interactive effects
    card.addEventListener('mouseenter', () => {
      this.addCardGlow(card);
    });

    card.addEventListener('mouseleave', () => {
      this.removeCardGlow(card);
    });

    card.addEventListener('click', () => {
      this.showEventDetails(event);
    });

    return card;
  }

  addCardGlow(card) {
    // Create a temporary glow effect
    const glow = document.createElement('div');
    glow.style.position = 'absolute';
    glow.style.top = '-2px';
    glow.style.left = '-2px';
    glow.style.right = '-2px';
    glow.style.bottom = '-2px';
    glow.style.background = 'linear-gradient(45deg, #FF8C00, #D4AF37, #FF8C00)';
    glow.style.borderRadius = '17px';
    glow.style.zIndex = '-1';
    glow.style.opacity = '0.6';
    glow.style.animation = 'pulse 2s infinite';
    glow.className = 'card-glow';
    
    card.appendChild(glow);
  }

  removeCardGlow(card) {
    const glow = card.querySelector('.card-glow');
    if (glow) {
      glow.remove();
    }
  }

  setupEventListeners() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Update filter and re-render
        this.currentFilter = button.dataset.filter;
        this.renderEvents();
      });
    });

    // Add scroll effects
    window.addEventListener('scroll', () => {
      this.updateParallaxEffects();
    });

    // Add mouse movement effects to header
    const header = document.querySelector('.main-header');
    header.addEventListener('mousemove', (e) => {
      this.updateHeaderEffects(e);
    });
  }

  updateHeaderEffects(e) {
    const header = e.currentTarget;
    const rect = header.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / centerY * 10;
    const rotateY = (x - centerX) / centerX * 10;
    
    const titleLines = header.querySelectorAll('.title-line');
    titleLines.forEach((line, index) => {
      const depth = (index + 1) * 5;
      line.style.transform = `translateZ(${20 + depth}px) rotateX(${rotateX * 0.5}deg) rotateY(${rotateY * 0.5}deg)`;
    });
  }

  updateParallaxEffects() {
    const scrolled = window.pageYOffset;
    const spiceGlow = document.querySelector('.spice-glow');
    
    if (spiceGlow) {
      spiceGlow.style.transform = `translate(-50%, -50%) translateZ(-50px) scale(${1 + scrolled * 0.001})`;
    }
  }

  updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
      timeElement.textContent = `Current Time: ${timeString}`;
    }
  }

  animateOnScroll() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
        }
      });
    }, observerOptions);

    // Observe all event cards
    document.querySelectorAll('.event-card').forEach(card => {
      observer.observe(card);
    });
  }

  showEventDetails(event) {
    // Create modal-like effect with event details
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
      background: linear-gradient(135deg, rgba(74, 44, 23, 0.95), rgba(139, 69, 19, 0.9));
      border: 2px solid #D4AF37;
      border-radius: 20px;
      padding: 3rem;
      max-width: 500px;
      width: 90%;
      text-align: center;
      transform: scale(0.8);
      transition: transform 0.3s ease;
    `;
    
    modalContent.innerHTML = `
      <h2 style="color: #D4AF37; font-family: 'Orbitron', monospace; font-size: 2rem; margin-bottom: 1rem;">${event.title}</h2>
      <p style="color: #FF8C00; font-size: 1.2rem; margin-bottom: 1rem;">${event.time} - ${event.location}</p>
      <p style="color: #F4E4BC; line-height: 1.6; margin-bottom: 2rem;">${event.description}</p>
      <button style="background: linear-gradient(45deg, #FF8C00, #D4AF37); border: none; color: #0A0A0A; padding: 1rem 2rem; border-radius: 10px; font-family: 'Orbitron', monospace; font-weight: bold; cursor: pointer;">The Spice Must Flow</button>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
      modal.style.opacity = '1';
      modalContent.style.transform = 'scale(1)';
    }, 10);
    
    // Close on click
    modal.addEventListener('click', () => {
      modal.style.opacity = '0';
      modalContent.style.transform = 'scale(0.8)';
      setTimeout(() => {
        document.body.removeChild(modal);
      }, 300);
    });
  }
}

// Add custom CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 0.8; }
  }
`;
document.head.appendChild(style);

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  new DuneEventSchedule();
});

// Add some extra visual flair
window.addEventListener('load', () => {
  // Add a subtle screen glow effect
  const screenGlow = document.createElement('div');
  screenGlow.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    background: radial-gradient(circle at center, rgba(255, 140, 0, 0.03) 0%, transparent 70%);
  `;
  document.body.appendChild(screenGlow);
});