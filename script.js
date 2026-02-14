// Create opening flowers when page loads
function createOpeningFlowers() {
    const flowers = ['🌹', '🌸', '💕', '🌺', '🌷'];
    const container = document.getElementById('flowersContainer');
    
    for (let i = 0; i < 8; i++) {
        const flower = document.createElement('div');
        flower.classList.add('flower-opening');
        flower.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        flower.style.left = x + '%';
        flower.style.top = y + '%';
        flower.style.animationDelay = (i * 0.2) + 's';
        
        container.appendChild(flower);
        
        setTimeout(() => {
            flower.remove();
        }, 2500);
    }
}

// Create falling petals
function createPetal() {
    const petal = document.createElement("div");
    petal.classList.add("petal");
    const petals = ['🌸', '🌹', '💕', '🌺'];
    petal.innerHTML = petals[Math.floor(Math.random() * petals.length)];

    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = (Math.random() * 3 + 3) + "s";
    petal.style.fontSize = (Math.random() * 20 + 15) + "px";

    document.body.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 6000);
}

// Start falling petals
setInterval(createPetal, 300);

// Show message modal
function showMessage() {
    const modal = document.getElementById('messageModal');
    const content = modal.querySelector('.modal-content');
    // reset any previous transform
    content.style.transform = '';
    content.style.transition = 'transform 220ms ease';
    modal.style.display = 'block';

    // scale down modal content if it would be taller than viewport
    requestAnimationFrame(() => {
        const available = window.innerHeight - 48; // allow small margin
        const contentHeight = content.scrollHeight;
        if (contentHeight > available) {
            const scale = (available / contentHeight);
            content.style.transformOrigin = 'top center';
            content.style.transform = `scale(${scale})`;
        } else {
            content.style.transform = 'scale(1)';
        }
    });
}

// Show pictures modal
function showPictures() {
    document.getElementById('picturesModal').style.display = 'block';
}

// Show full-size image viewer
let imageViewerTimeout;
function showImageViewer(imageSrc, caption) {
    const overlay = document.getElementById('imageViewerOverlay');
    const gallery = document.getElementById('picturesGallery');
    
    document.getElementById('viewerImage').src = imageSrc;
    document.getElementById('viewerCaption').textContent = caption;
    
    // Hide gallery and show image viewer
    gallery.style.display = 'none';
    overlay.style.display = 'flex';
    
    // Clear any existing timeout
    clearTimeout(imageViewerTimeout);
    
    // Auto close after 5 seconds
    imageViewerTimeout = setTimeout(() => {
        closeImageViewer();
    }, 5000);
}

// Close image viewer and show gallery
function closeImageViewer() {
    const overlay = document.getElementById('imageViewerOverlay');
    const gallery = document.getElementById('picturesGallery');
    
    overlay.style.display = 'none';
    gallery.style.display = 'grid';
    
    // Clear timeout when closing manually
    clearTimeout(imageViewerTimeout);
}

// Surprise message with flower animation
function showLove() {
    // Create flower explosion with big center flower
    createFlowerExplosion();
}

// Create flower explosion animation
function createFlowerExplosion() {
    const flowers = ['🌹', '🌸', '💕', '🌺', '🌷'];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Create big center flower (constructed)
    const big = document.createElement('div');
    big.classList.add('surprise-flower');
    big.style.left = centerX + 'px';
    big.style.top = centerY + 'px';

    // add petals
    for (let p = 0; p < 8; p++) {
        const pet = document.createElement('div');
        pet.classList.add('petal');
        const angle = (360 / 8) * p;
        pet.style.setProperty('--angle', angle + 'deg');
        pet.style.transform = `rotate(${angle}deg) translateX(6px) translateY(-18px) scale(0.95)`;
        big.appendChild(pet);
    }
    const core = document.createElement('div');
    core.classList.add('core');
    big.appendChild(core);
    // add a stem to the big flower
    const bigStem = document.createElement('div');
    bigStem.classList.add('stem');
    big.appendChild(bigStem);

    document.body.appendChild(big);

    setTimeout(() => { big.remove(); }, 2800);

    // Create surrounding constructed flowers that fly out
    for (let i = 0; i < 12; i++) {
        const flower = document.createElement('div');
        flower.classList.add('surprise-flower');
        
        // add petals
        const petalsCount = 6 + Math.floor(Math.random() * 3);
        for (let p = 0; p < petalsCount; p++) {
            const pet = document.createElement('div');
            pet.classList.add('petal');
            const angle = (360 / petalsCount) * p + (Math.random() * 10 - 5);
            pet.style.setProperty('--angle', angle + 'deg');
            pet.style.transform = `rotate(${angle}deg) translateX(6px) translateY(-18px) scale(${0.8 + Math.random() * 0.4})`;
            flower.appendChild(pet);
        }
        const c = document.createElement('div');
        c.classList.add('core');
        flower.appendChild(c);
        // add a stem
        const s = document.createElement('div');
        s.classList.add('stem');
        flower.appendChild(s);

        // random direction
        const angle = (Math.PI * 2 * i) / 12 + (Math.random() * 0.4 - 0.2);
        const distance = 160 + Math.random() * 160;
        const tx = Math.cos(angle) * distance + 'px';
        const ty = Math.sin(angle) * distance + 'px';

        flower.style.left = centerX + 'px';
        flower.style.top = centerY + 'px';
        flower.style.setProperty('--tx', tx);
        flower.style.setProperty('--ty', ty);
        flower.style.animation = `surpriseFly 1.8s cubic-bezier(.2,.8,.2,1) forwards`;
        flower.style.filter = `drop-shadow(0 8px 20px rgba(255,20,100,0.25))`;

        document.body.appendChild(flower);

        setTimeout(() => { flower.remove(); }, 2000 + Math.random() * 600);
    }
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    // Clear timeout when closing manually
    clearTimeout(imageViewerTimeout);
    // reset any scaling applied to message modal
    if (modalId === 'messageModal') {
        const modal = document.getElementById('messageModal');
        const content = modal.querySelector('.modal-content');
        if (content) {
            content.style.transform = '';
        }
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const messageModal = document.getElementById('messageModal');
    const picturesModal = document.getElementById('picturesModal');
    
    if (event.target === messageModal) {
        messageModal.style.display = 'none';
    }
    if (event.target === picturesModal) {
        picturesModal.style.display = 'none';
    }
}

// Trigger opening flowers on page load
window.addEventListener('load', createOpeningFlowers);

// Recompute scaling when window resizes while message modal is open
window.addEventListener('resize', () => {
    const modal = document.getElementById('messageModal');
    if (modal && modal.style.display === 'block') {
        const content = modal.querySelector('.modal-content');
        if (content) {
            const available = window.innerHeight - 48;
            const contentHeight = content.scrollHeight;
            if (contentHeight > available) {
                const scale = (available / contentHeight);
                content.style.transformOrigin = 'top center';
                content.style.transform = `scale(${scale})`;
            } else {
                content.style.transform = 'scale(1)';
            }
        }
    }
});

/* Background music control */
(function setupBackgroundMusic(){
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    if (!bgMusic || !musicToggle) return;

    bgMusic.volume = 0.45;
    let unmuteOnInteraction = true;

    // Unmute on first user interaction
    function unmute() {
        if (unmuteOnInteraction) {
            bgMusic.muted = false;
            unmuteOnInteraction = false;
            document.removeEventListener('click', unmute);
            document.removeEventListener('keydown', unmute);
            document.removeEventListener('touchstart', unmute);
        }
    }

    // Listen for first user interaction
    document.addEventListener('click', unmute);
    document.addEventListener('keydown', unmute);
    document.addEventListener('touchstart', unmute);

    // Update button state based on playback
    bgMusic.addEventListener('play', () => {
        musicToggle.classList.add('playing');
        musicToggle.textContent = '🔊';
    });

    bgMusic.addEventListener('pause', () => {
        musicToggle.classList.remove('playing');
        musicToggle.textContent = '🎵';
    });

    // Toggle button for manual control
    musicToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (unmuteOnInteraction) {
            bgMusic.muted = false;
            unmuteOnInteraction = false;
        }
        if (bgMusic.paused) {
            bgMusic.play();
        } else {
            bgMusic.pause();
        }
    });
})();
