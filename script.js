// Prithvi's Redville Farmhouse - Interactive Script

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('active')) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });

    // Close menu when clicking any nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }

  // 2. Sticky Navbar Transition on Scroll (Transparent to Solid White)
  const siteHeader = document.getElementById('siteHeader') || document.querySelector('.navbar');
  const handleScroll = () => {
    if (window.scrollY > 60) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check once on initial page load

  // 3. Tab Switching for Pricing
  const tabButtons = document.querySelectorAll('.tab-btn');
  const pricingContents = document.querySelectorAll('.pricing-content');

  if (tabButtons.length > 0 && pricingContents.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const target = button.getAttribute('data-target');

        tabButtons.forEach(btn => btn.classList.remove('active'));
        pricingContents.forEach(content => content.style.display = 'none');

        button.classList.add('active');
        const activeContent = document.getElementById(target);
        if (activeContent) {
          activeContent.style.display = 'grid';
        }
      });
    });
  }

  // 4. Interactive Expanding Cards Gallery (Nearby Attractions)
  const expandCards = document.querySelectorAll('.expand-card');
  if (expandCards.length > 0) {
    expandCards.forEach(card => {
      // Hover event
      card.addEventListener('mouseenter', () => {
        expandCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });

      // Click/Touch event for mobile support
      card.addEventListener('click', () => {
        expandCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });
    });
  }

  // 5. Interactive FAQs Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const parentItem = question.parentElement;
      const isActive = parentItem.classList.contains('active');

      // Close all other open items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      // Toggle clicked item
      if (!isActive) {
        parentItem.classList.add('active');
      }
    });
  });

  // 5. Quick Availability Bar Form Handler (Hero Section)
  const quickBarForm = document.getElementById('quickBarForm');
  if (quickBarForm) {
    quickBarForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const date = document.getElementById('quickDate')?.value || 'Upcoming Date';
      const guests = document.getElementById('quickGuests')?.value || '10+';
      const packageType = document.getElementById('quickPackage')?.value || '22-Hour Stay';

      const whatsappNumber = '919819969677';
      const textMessage = `*Prithvi's Redville - Quick Availability Check*%0A%0A` +
        `📅 *Requested Date:* ${encodeURIComponent(date)}%0A` +
        `👥 *Number of Guests:* ${encodeURIComponent(guests)}%0A` +
        `🏡 *Preferred Package:* ${encodeURIComponent(packageType)}%0A%0A` +
        `Please let me know if these dates are available!`;

      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${textMessage}`;
      window.open(whatsappURL, '_blank');
    });
  }

  // 6. Detailed WhatsApp Enquiry Form Handler (Contact Page)
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('guestName')?.value || 'Guest';
      const phone = document.getElementById('guestPhone')?.value || '';
      const date = document.getElementById('checkInDate')?.value || 'Upcoming';
      const guests = document.getElementById('guestCount')?.value || 'Not specified';
      const packageType = document.getElementById('packageType')?.value || 'Stay Package';
      const message = document.getElementById('guestNotes')?.value || 'None';

      const whatsappNumber = '919819969677';
      const textMessage = `*New Booking Enquiry - Prithvi's Redville*%0A%0A` +
        `👤 *Name:* ${encodeURIComponent(name)}%0A` +
        `📱 *Phone:* ${encodeURIComponent(phone)}%0A` +
        `📅 *Check-in Date:* ${encodeURIComponent(date)}%0A` +
        `👥 *Number of Guests:* ${encodeURIComponent(guests)}%0A` +
        `🏡 *Package Choice:* ${encodeURIComponent(packageType)}%0A` +
        `📝 *Notes/Questions:* ${encodeURIComponent(message)}%0A%0A` +
        `Please confirm availability & details. Thank you!`;

      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${textMessage}`;
      window.open(whatsappURL, '_blank');
    });
  }

  // 7. Gallery Filter & Fullscreen Lightbox Modal
  const photoGrid = document.getElementById('photoGrid');
  const videoGrid = document.getElementById('videoGrid');
  const lightboxModal = document.getElementById('lightboxModal');

  if (lightboxModal) {
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxVideo = document.getElementById('lightboxVideo');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxWhatsApp = document.getElementById('lightboxWhatsApp');

    let activePool = []; // points to either visible photos or videos
    let currentIndex = 0;

    // Open Lightbox with a specific list of items
    const openLightbox = (pool, index) => {
      if (!pool || !pool.length) return;
      activePool = pool;
      currentIndex = (index + pool.length) % pool.length;
      const activeItem = pool[currentIndex];
      const title = activeItem.getAttribute('data-title') || "Prithvi's Redville Farmhouse";
      const isVideo = activeItem.hasAttribute('data-video');

      if (lightboxTitle) lightboxTitle.textContent = title;
      if (lightboxCounter) lightboxCounter.textContent = `${currentIndex + 1} / ${pool.length}`;

      if (lightboxWhatsApp) {
        const waMsg = `Hello Prithvi's Redville, I am interested in this view from your gallery: ${title}`;
        lightboxWhatsApp.href = `https://wa.me/919819969677?text=${encodeURIComponent(waMsg)}`;
      }

      if (isVideo) {
        const videoSrc = activeItem.getAttribute('data-video');
        if (lightboxImg) {
          lightboxImg.style.display = 'none';
          lightboxImg.src = '';
        }
        if (lightboxVideo) {
          lightboxVideo.style.display = 'block';
          lightboxVideo.src = videoSrc;
          lightboxVideo.load();
          lightboxVideo.play().catch(() => {});
        }
      } else {
        const imgSrc = activeItem.getAttribute('data-src');
        if (lightboxVideo) {
          lightboxVideo.style.display = 'none';
          lightboxVideo.pause();
          lightboxVideo.src = '';
        }
        if (lightboxImg) {
          lightboxImg.style.display = 'block';
          lightboxImg.src = imgSrc;
          lightboxImg.alt = title;
        }
      }

      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    // Close Lightbox
    const closeLightbox = () => {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
      if (lightboxVideo) {
        lightboxVideo.pause();
        lightboxVideo.src = '';
      }
      if (lightboxImg) {
        lightboxImg.src = '';
      }
    };

    // Next / Prev Navigation
    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        if (activePool.length) openLightbox(activePool, currentIndex - 1);
      });
    }

    if (lightboxNext) {
      lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        if (activePool.length) openLightbox(activePool, currentIndex + 1);
      });
    }

    // Close Button & Backdrop Click
    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target.classList.contains('lightbox-dialog')) {
        closeLightbox();
      }
    });

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      if (!lightboxModal.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft' && activePool.length) openLightbox(activePool, currentIndex - 1);
      if (e.key === 'ArrowRight' && activePool.length) openLightbox(activePool, currentIndex + 1);
    });

    // 1. Hook up Video Cards
    if (videoGrid) {
      const videoCards = Array.from(videoGrid.querySelectorAll('.video-card'));
      videoCards.forEach((card, idx) => {
        card.addEventListener('click', () => {
          openLightbox(videoCards, idx);
        });
      });
    }

    // 2. Hook up Photo Cards & Filter Bar
    if (photoGrid) {
      const photoCards = Array.from(photoGrid.querySelectorAll('.photo-card'));
      const filterBtns = document.querySelectorAll('.filter-btn');
      let currentVisiblePhotos = [...photoCards];

      photoCards.forEach(card => {
        card.addEventListener('click', () => {
          const idx = currentVisiblePhotos.indexOf(card);
          if (idx !== -1) {
            openLightbox(currentVisiblePhotos, idx);
          }
        });
      });

      // Filter Buttons Click
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const filter = btn.getAttribute('data-filter') || 'all';

          photoCards.forEach(card => {
            const cat = card.getAttribute('data-category') || '';
            if (filter === 'all' || cat === filter) {
              card.classList.remove('hidden');
            } else {
              card.classList.add('hidden');
            }
          });

          currentVisiblePhotos = photoCards.filter(c => !c.classList.contains('hidden'));
        });
      });
    }
  }

  // 8. Reviews Mobile Carousel Dot Sync
  const reviewsGrid = document.getElementById('reviewsGrid');
  const reviewDots = document.querySelectorAll('.review-dot');

  if (reviewsGrid && reviewDots.length > 0) {
    const updateActiveDot = () => {
      const scrollLeft = reviewsGrid.scrollLeft;
      const cardWidth = reviewsGrid.querySelector('.review-card')?.offsetWidth || 1;
      const activeIdx = Math.round(scrollLeft / (cardWidth + 16));
      reviewDots.forEach((dot, idx) => {
        if (idx === activeIdx) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };

    reviewsGrid.addEventListener('scroll', updateActiveDot, { passive: true });

    reviewDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.getAttribute('data-index') || '0', 10);
        const cards = reviewsGrid.querySelectorAll('.review-card');
        if (cards[idx]) {
          cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      });
    });
  }
});
