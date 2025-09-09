(function() {
    'use strict';

    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');
    let isTicking = false;

    const updateUserInterface = () => {
        const scrollY = window.pageYOffset;

        if (header) {
            if (scrollY >= 50) {
                header.classList.add('scroll-header');
            } else {
                header.classList.remove('scroll-header');
            }
        }

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 58;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav__menu a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav__link').forEach(link => link.classList.remove('active-link'));
                    navLink.classList.add('active-link');
                }
            }
        });

        isTicking = false;
    };

    const onScroll = () => {
        if (!isTicking) {
            window.requestAnimationFrame(updateUserInterface);
            isTicking = true;
        }
    };

    const initializeSystemFilter = () => {
        const container = document.querySelector('.systems__container');
        if (!container || typeof mixitup === 'undefined') return;

        mixitup(container, {
            selectors: {
                target: '.system__card'
            },
            animation: {
                duration: 350,
                effects: 'fade',
                applyPerspective: false
            }
        });

        const filterItems = document.querySelectorAll('.systems__item');
        filterItems.forEach(item => {
            item.addEventListener('click', function() {
                filterItems.forEach(el => el.classList.remove('active-filter'));
                this.classList.add('active-filter');
            });
        });
    };

    const initializeModals = () => {
        const modalViews = document.querySelectorAll('.details__modal');
        const modalBtns = document.querySelectorAll('.system__details-button');
        const modalCloses = document.querySelectorAll('.details__modal-close');

        if (modalViews.length === 0) return;

        modalBtns.forEach((modalBtn, i) => {
            modalBtn.addEventListener('click', () => {
                if (modalViews[i]) {
                    document.body.style.overflow = 'hidden';
                    modalViews[i].classList.add('show-modal');
                }
            });
        });

        const closeModal = () => {
            modalViews.forEach(modalView => modalView.classList.remove('show-modal'));
            document.body.style.overflow = 'auto';
        };

        modalCloses.forEach(mc => mc.addEventListener('click', closeModal));
        modalViews.forEach(mv => mv.addEventListener('click', e => e.target === mv && closeModal()));
        document.addEventListener('keydown', e => e.key === 'Escape' && closeModal());
    };

    const initializeScrollReveal = () => {
        if (typeof ScrollReveal === 'undefined') return;

        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '50px',
            duration: 800,
            delay: 200,
            reset: false,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            viewFactor: 0.3
        });

        sr.reveal('.hero__data');
        sr.reveal('.feature__item', { interval: 150 });
        sr.reveal('.systems__filters', { delay: 300 });
        sr.reveal('.system__card', { interval: 100 });
        sr.reveal('.contact__container');
    };

    document.addEventListener('DOMContentLoaded', () => {
        updateUserInterface();
        
        initializeSystemFilter();
        initializeModals();
        initializeScrollReveal();

        window.addEventListener('scroll', onScroll, { passive: true });
    });

})();
