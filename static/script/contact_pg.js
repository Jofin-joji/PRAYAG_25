// Add smooth interactions and animations
document.addEventListener('DOMContentLoaded', function() {

    // Custom Cursor with Spice Trail
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) return;

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    // Instant cursor movement
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .event-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            cursor.style.background = 'rgba(212, 175, 55, 0.3)';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = 'transparent';
        });
    });
    // Add click animations to contact buttons
    const contactButtons = document.querySelectorAll('.contact-btn');
    
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Handle contact actions
            if (this.classList.contains('email-btn')) {
                const card = this.closest('.team-card');
                const name = card.querySelector('.member-name').textContent;
                handleEmailClick(name);
            } else if (this.classList.contains('phone-btn')) {
                const card = this.closest('.team-card');
                const name = card.querySelector('.member-name').textContent;
                handlePhoneClick(name);
            }
        });
    });
    
    // Add intersection observer for card animations
    const cards = document.querySelectorAll('.team-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Initially hide cards and observe them
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        cardObserver.observe(card);
    });
    
    
    // Add parallax effect to stars based on mouse movement
    document.addEventListener('mousemove', (e) => {
        const stars1 = document.querySelector('.stars');
        const stars2 = document.querySelector('.stars2');
        const stars3 = document.querySelector('.stars3');
        
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        if (stars1) stars1.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
        if (stars2) stars2.style.transform = `translate(${x * 15}px, ${y * 15}px)`;
        if (stars3) stars3.style.transform = `translate(${x * 5}px, ${y * 5}px)`;
    });
});

// Handle email contact
function handleEmailClick(name) {
    const emails = {
        'ABINAND B ARJUN': 'abinandbarjun7@gmail.com',
        'KRISHNAJA TN': 'krishnajatn20@gmail.com',
        'ABHIJITH A K': '2002abihijithak@gmail.com'
    };
    
    const email = emails[name] || 'info@prayag25.live';
    
    showNotification(`Opening email client for ${name}`, 'email');
    
    setTimeout(() => {
        window.location.href = `mailto:${email}?subject=Contact from Prayag Tech Fest 2025`;
    }, 1000);
}

// Handle phone contact
function handlePhoneClick(name) {
    const phones = {
        'ABINAND B ARJUN': '+91 83010 66741',
        'KRISHNAJA TN': '+91 80759 60827',
        'ABHIJITH A K': '+91 85906 95431'
    };
    
    const phone = phones[name] || '+91 94462 00253';
    
    showNotification(`Calling ${name} at ${phone}`, 'phone');
    
    setTimeout(() => {
        window.location.href = `tel:${phone.replace(/\s/g, '')}`;
    }, 1000);
}


// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                ${type === 'email' ? '📧' : '📞'}
            </div>
            <div class="notification-message">${message}</div>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS for ripple effect and animations
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-icon {
        font-size: 1.2rem;
    }
    
    .notification-message {
        font-size: 0.9rem;
        font-weight: 500;
    }
`;

document.head.appendChild(style);