// Page Navigation
let currentPage = 1;

function showPage(pageNumber) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(`page${pageNumber}`);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Add animation
        targetPage.style.animation = 'none';
        setTimeout(() => {
            targetPage.style.animation = 'slideIn 0.5s ease-out';
        }, 10);
    }
    
    // Update navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach((btn, index) => {
        btn.classList.remove('active');
        if (index + 1 === pageNumber) {
            btn.classList.add('active');
        }
    });
    
    currentPage = pageNumber;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Copy Code Function
function copyCode(button) {
    const codeBlock = button.parentElement;
    const code = codeBlock.querySelector('code');
    const text = code.textContent;
    
    // Create temporary textarea to copy text
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    
    // Visual feedback
    const originalText = button.textContent;
    button.textContent = '✅ Copiado!';
    button.style.background = 'rgba(40, 167, 69, 0.8)';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = 'rgba(255,255,255,0.1)';
    }, 2000);
}

// FPS Calculator
function calculateFps() {
    const originalFps = document.getElementById('originalFps').value;
    const resultDiv = document.getElementById('result');
    
    if (!originalFps || originalFps <= 0) {
        resultDiv.innerHTML = '<span style="color: #e74c3c;">Por favor, insira um valor válido!</span>';
        return;
    }
    
    const factor = (30 / parseFloat(originalFps)).toFixed(3);
    const command = `python patch_mp4.py input.mp4 output.mp4 ${factor}`;
    
    resultDiv.innerHTML = `
        <div style="color: #27ae60; font-weight: 600; margin-bottom: 10px;">
            Fator de escala: ${factor}
        </div>
        <div style="background: #1a1a1a; color: #f8f8f2; padding: 15px; border-radius: 8px; font-family: monospace; position: relative;">
            <code>${command}</code>
            <button onclick="copyCalculatedCode('${command}')" style="position: absolute; top: 5px; right: 5px; background: rgba(255,255,255,0.1); border: none; color: white; padding: 5px 10px; border-radius: 3px; cursor: pointer; font-size: 12px;">📋</button>
        </div>
    `;
}

// Copy calculated code
function copyCalculatedCode(command) {
    const textarea = document.createElement('textarea');
    textarea.value = command;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    
    // Find and update the button
    const buttons = document.querySelectorAll('#result button');
    buttons.forEach(button => {
        if (button.textContent === '📋') {
            button.textContent = '✅';
            button.style.background = 'rgba(40, 167, 69, 0.8)';
            setTimeout(() => {
                button.textContent = '📋';
                button.style.background = 'rgba(255,255,255,0.1)';
            }, 2000);
        }
    });
}

// Discord Member Count
async function fetchDiscordMembers() {
    try {
        // Note: This is a mock implementation since we can't access Discord API directly
        // In a real implementation, you'd need a backend service to fetch this data
        const memberCount = Math.floor(Math.random() * 500) + 800; // Simulate member count
        document.getElementById('memberCount').textContent = memberCount.toLocaleString('pt-BR');
    } catch (error) {
        document.getElementById('memberCount').textContent = '1000+';
    }
}

// Smooth scroll for navigation
function smoothScroll() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
        });
    });
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft' && currentPage > 1) {
        showPage(currentPage - 1);
    } else if (e.key === 'ArrowRight' && currentPage < 5) {
        showPage(currentPage + 1);
    }
});

// Progress bar animation
function animateProgressBar() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Show first page by default
    showPage(1);
    
    // Fetch Discord member count
    fetchDiscordMembers();
    
    // Initialize smooth scrolling
    smoothScroll();
    
    // Add loading animation to member count initially
    const memberCountElement = document.getElementById('memberCount');
    memberCountElement.innerHTML = '<span class="loading"></span>';
    
    // Simulate loading time
    setTimeout(() => {
        fetchDiscordMembers();
    }, 1500);
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0.2s';
                entry.target.style.animationFillMode = 'both';
            }
        });
    }, observerOptions);
    
    // Observe content cards
    const cards = document.querySelectorAll('.content-card');
    cards.forEach(card => {
        observer.observe(card);
    });
});

// Add click sound effect (optional)
function playClickSound() {
    // Create audio context for click feedback
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Add click sounds to buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('button, .nav-btn, .download-btn')) {
        // Uncomment the line below if you want click sounds
        // playClickSound();
    }
});

// Auto-refresh Discord member count every 5 minutes
setInterval(fetchDiscordMembers, 300000);

// Add hover effects to cards
document.querySelectorAll('.content-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Easter egg activated
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
        
        // Show message
        const message = document.createElement('div');
        message.innerHTML = '🎉 Código Konami ativado! Slucss Community rocks! 🎉';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 20px;
            border-radius: 15px;
            z-index: 9999;
            font-weight: 600;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: fadeInUp 0.5s ease-out;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
        
        konamiCode = [];
    }
});