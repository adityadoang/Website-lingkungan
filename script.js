// Slider functionality
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[n].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Auto slide every 4 seconds
setInterval(nextSlide, 4000);

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Header background change on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(45, 90, 39, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #2d5a27, #4a7c59)';
        header.style.backdropFilter = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all article cards
document.querySelectorAll('.article-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add click effects to article cards
document.querySelectorAll('.article-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Environmental facts popup (bonus feature)
const environmentalFacts = [
    "🌍 Tahukah kamu? Setiap menit, area hutan seluas 20 lapangan sepak bola hilang di dunia.",
    "♻️ Mendaur ulang 1 ton kertas dapat menyelamatkan 17 pohon dan 26.000 liter air!",
    "💡 Lampu LED menggunakan 75% lebih sedikit energi dibanding bohlam biasa.",
    "🌱 Satu pohon dewasa dapat menghasilkan oksigen untuk 2 orang selama satu hari.",
    "🚗 Berjalan kaki 1 km dapat menghemat 0.5 kg CO2 dibanding menggunakan mobil."
];

function showEnvironmentalFact() {
    const fact = environmentalFacts[Math.floor(Math.random() * environmentalFacts.length)];
    
    // Create popup element
    const popup = document.createElement('div');
    popup.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: linear-gradient(135deg, #4a7c59, #90c695);
        color: white;
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        max-width: 380px;
        z-index: 2000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        cursor: pointer;
    `;
    popup.innerHTML = `
        <strong style="display: block; margin-bottom: 0.5rem;">💚 Fakta Lingkungan</strong>
        <p style="margin: 0; font-size: 0.9rem;">${fact}</p>
        <small style="display: block; margin-top: 0.5rem; opacity: 0.8;">Klik untuk menutup</small>
    `;
    
    document.body.appendChild(popup);
    
    // Animate in
    setTimeout(() => {
        popup.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 8 seconds or on click
    const removePopup = () => {
        popup.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (popup.parentNode) {
                popup.parentNode.removeChild(popup);
            }
        }, 300);
    };
    
    popup.addEventListener('click', removePopup);
    setTimeout(removePopup, 8000);
}

if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/" || window.location.pathname === "/index") {
    // Show environmental fact every 30 seconds
    setInterval(showEnvironmentalFact, 30000);

    // Show first fact after 3 seconds
    setTimeout(showEnvironmentalFact, 3000);
}

// Form keluhan lingkungan
// Check if on index.html or the root page before adding event listener for complaintForm
if (document.getElementById('complaintForm')) {
    document.getElementById('complaintForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const judul = document.getElementById('judul').value.trim();
        const lokasi = document.getElementById('lokasi').value.trim();
        const keluhan = document.getElementById('keluhan').value.trim();

        if (!judul || !lokasi || !keluhan) return;

        const list = document.getElementById('complaintList');

        // Create a new div for the heading if it doesn't exist
        if (!list.querySelector('h3')) {
            const heading = document.createElement('h3');
            heading.textContent = 'Keluhan Terbaru:';
            list.insertBefore(heading, list.firstChild);
        }
        
        const item = document.createElement('div');
        item.className = 'complaint-item';
        item.innerHTML = `
            <h4>${judul}</h4>
            <p><strong>Lokasi:</strong> ${lokasi}</p>
            <p>${keluhan}</p>
        `;

        // Insert new complaint after the heading (if exists) or at the beginning
        const headingElement = list.querySelector('h3');
        if (headingElement && headingElement.nextSibling) {
            list.insertBefore(item, headingElement.nextSibling);
        } else if (headingElement) {
            list.appendChild(item);
        }
         else {
            list.insertBefore(item, list.firstChild);
        }


        // Reset form
        document.getElementById('complaintForm').reset();
    });
}

// Forum Page Functionality
// Ensure this code runs only on forum.html
if (window.location.pathname.endsWith("forum.html")) {
    const createDiscussionBtn = document.getElementById('createDiscussionBtn');
    const newDiscussionFormContainer = document.getElementById('newDiscussionFormContainer');
    const newDiscussionForm = document.getElementById('newDiscussionForm');
    const cancelDiscussionBtn = document.getElementById('cancelDiscussionBtn');
    const discussionList = document.querySelector('.discussion-list');

    if (createDiscussionBtn) {
        createDiscussionBtn.addEventListener('click', () => {
            newDiscussionFormContainer.style.display = 'block';
            createDiscussionBtn.style.display = 'none'; // Hide the "Buat Diskusi Baru" button
        });
    }

    if (cancelDiscussionBtn) {
        cancelDiscussionBtn.addEventListener('click', () => {
            newDiscussionFormContainer.style.display = 'none';
            createDiscussionBtn.style.display = 'block'; // Show the "Buat Diskusi Baru" button again
            newDiscussionForm.reset();
        });
    }

    if (newDiscussionForm) {
        newDiscussionForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const title = document.getElementById('discussionTitle').value.trim();
            const content = document.getElementById('discussionContent').value.trim();
            const author = document.getElementById('discussionAuthor').value.trim() || 'Anonim'; // Default to Anonim if no name

            if (!title || !content) {
                alert('Judul dan isi diskusi tidak boleh kosong!');
                return;
            }

            const newDiscussionItem = document.createElement('div');
            newDiscussionItem.classList.add('discussion-item');

            // Get current time for "X jam yang lalu"
            const now = new Date();
            const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;


            newDiscussionItem.innerHTML = `
                <div class="discussion-avatar">👤</div>
                <div class="discussion-content">
                    <h3>${title}</h3>
                    <p>${content}</p>
                    <div class="discussion-meta">
                        <span>Oleh: ${author}</span>
                        <span>• Baru saja (${timeString})</span>
                        <span>• 0 Balasan</span>
                    </div>
                </div>
            `;
            
            // Prepend to the list so new discussions appear at the top
            if (discussionList) {
                 // Check if there's a "Diskusi Terbaru" heading, if not, create it.
                let recentDiscussionsHeading = discussionList.previousElementSibling;
                if (!recentDiscussionsHeading || recentDiscussionsHeading.tagName !== 'H2' || recentDiscussionsHeading.textContent !== 'Diskusi Terbaru') {
                    const newHeading = document.createElement('h2');
                    newHeading.textContent = 'Diskusi Terbaru';
                    discussionList.parentNode.insertBefore(newHeading, discussionList);
                }
                discussionList.insertBefore(newDiscussionItem, discussionList.firstChild);
            }


            newDiscussionForm.reset();
            newDiscussionFormContainer.style.display = 'none';
            createDiscussionBtn.style.display = 'block'; // Show the "Buat Diskusi Baru" button again

            alert('Diskusi berhasil dibuat!');
        });
    }
}
