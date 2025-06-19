// Slider 
const slides = document.querySelectorAll('.slide');//semua elemen dengan class slide disimpan dalam variabel slides
let currentSlide = 0;//posisi slide saat ini

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));//perulangan untuk menghapus class active dari semua slide
    slides[n].classList.add('active');
}

function nextSlide() { // fungsi untuk menampilkan slide berikutnya
    currentSlide = (currentSlide + 1) % slides.length; // menambahkan 1 ke currentSlide, jika sudah mencapai akhir, kembali ke awal
    showSlide(currentSlide);
}

// Auto slide 4 detik
setInterval(nextSlide, 4000);


//  animasi
const observerOptions = { 
    threshold: 0.1, //menentukan seberapa banyak elemen harus terlihat sebelum trigger 10% dr elemen terlihat
    rootMargin: '0px 0px -50px 0px' // margin untuk mengatur jarak dari viewport, -50px berarti elemen akan mulai terlihat ketika 50px dari bawah viewport
};

const observer = new IntersectionObserver(function(entries) { // Callback function yang akan dipanggil ketika elemen masuk ke viewport
    entries.forEach(entry => { // perulangan untuk setiap entry yang diamati
        if (entry.isIntersecting) { // jika entry terlihat di viewport
            entry.target.style.opacity = '1'; // mengubah opacity menjadi 1
            entry.target.style.transform = 'translateY(0)'; 
        }
    });
}, observerOptions);

//  article cards
document.querySelectorAll('.article-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});


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
