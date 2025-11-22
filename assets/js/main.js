const starContainer = document.getElementById('star-field');
if (starContainer) {
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 4 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        starContainer.appendChild(star);
    }
}

// خرائط مسارات الصور (تمت استعادة المسارات المحلية الأصلية)
const laptopScreens = {
    dashboard: "assets/img/dashboard.png",
    pos: "assets/img/pos.png",
    debts: "assets/img/debts.png"
};

const phoneScreens = {
    monitor: "assets/img/mobile-monitor.png",
    inventory: "assets/img/mobile-inventory.png",
    debts: "assets/img/mobile-debts.png"
};

// وظيفة تبديل التبويبات وتحديث صور الأجهزة
function setActiveTab(button) {
    // إزالة التفعيل من جميع الأزرار
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    // تفعيل الزر الحالي
    button.classList.add('active');
    
    const laptopScreenName = button.getAttribute('data-laptop');
    const phoneScreenName = button.getAttribute('data-phone');
    
    const laptopImgElement = document.getElementById('laptop-img');
    const phoneImgElement = document.getElementById('phone-img');

    // تحديث صور اللابتوب مع التحقق وتأثير بسيط
    if (laptopImgElement && laptopScreens[laptopScreenName]) {
        laptopImgElement.style.opacity = 0;
        setTimeout(() => { 
            laptopImgElement.src = laptopScreens[laptopScreenName];
            laptopImgElement.style.opacity = 1;
        }, 100);
    }

    // تحديث صور الهاتف مع التحقق وتأثير بسيط
    if (phoneImgElement && phoneScreens[phoneScreenName]) {
        phoneImgElement.style.opacity = 0;
        setTimeout(() => {
            phoneImgElement.src = phoneScreens[phoneScreenName];
            phoneImgElement.style.opacity = 1;
        }, 100);
    }
}

// تعيين التبويب الأول كنشط عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const firstTab = document.querySelector('.tab-btn');
    if (firstTab) {
        setActiveTab(firstTab);
    }
    const showLaptopBtn = document.getElementById('show-laptop-btn');
    const showPhoneBtn = document.getElementById('show-phone-btn');

    if (window.innerWidth <= 767) {
        // افتراضياً، عند الجوال نبدأ بعرض الهاتف
        if (showPhoneBtn) {
            showDevice('phone', showPhoneBtn);
        }
    } else {
        // على الديسكتوب، تأكد من إظهار كلاهما وإخفاء أزرار التبديل
        document.querySelector('.laptop-frame')?.classList.remove('frame-hidden');
        document.querySelector('.phone-frame')?.classList.remove('frame-hidden');
    }
});


// منطق النافذة المنبثقة (Modal)
const modal = document.getElementById('pricing-modal');
const modalTitle = document.getElementById('modal-title');
const systemTitles = {
    'restaurant': 'تفاصيل باقات المطاعم والمقاهي',
    'retail': 'تفاصيل باقات الملابس والتجزئة',
    'pharmacy': 'تفاصيل باقات الصيدليات',
    'grocery': 'تفاصيل باقات المواد الغذائية',
    'construction': 'تفاصيل باقات المقاولات والكهرباء'
};

function openModal(systemType) {
    if (modal && modalTitle && systemTitles[systemType]) {
        modalTitle.innerText = systemTitles[systemType];
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // منع التمرير أثناء عرض المودال
    }
}

function closeModal() {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // إعادة التمرير
    }
}

// إغلاق المودال عند النقر على الخلفية
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// إغلاق المودال باستخدام زر ESC
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains('active')) {
        closeModal();
    }
});

// منطق التكبير (Lightbox)
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const zoomableElements = document.querySelectorAll('.zoomable');
    const closeBtn = document.querySelector('.lightbox-close');

    zoomableElements.forEach(element => {
        element.addEventListener('click', function(e) {
            e.stopPropagation();
            // البحث عن عنصر الصورة داخل الإطار
            const innerImg = this.querySelector('.laptop-img, .phone-img');
            if (lightbox && innerImg) {
                lightbox.style.display = 'flex';
                lightboxImg.src = innerImg.src;
            }
        });
    });

    function closeLightbox() {
        if (lightbox) {
            lightbox.style.display = 'none';
        }
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    // إغلاق اللايت بوكس عند النقر على الخلفية
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) { // تأكدنا من النقر على الخلفية وليس الصورة
                closeLightbox();
            }
        });
    }
});function showDevice(deviceType, button) {
    const laptopFrame = document.querySelector('.laptop-frame');
    const phoneFrame = document.querySelector('.phone-frame');
    const allToggleBtns = document.querySelectorAll('.toggle-btn');
    
    // إزالة التفعيل من جميع أزرار التبديل
    allToggleBtns.forEach(btn => btn.classList.remove('active-toggle'));

    if (deviceType === 'laptop') {
        laptopFrame.classList.remove('frame-hidden');
        phoneFrame.classList.add('frame-hidden');
    } else {
        phoneFrame.classList.remove('frame-hidden');
        laptopFrame.classList.add('frame-hidden');
    }
    
    // تفعيل الزر الذي تم النقر عليه
    if (button) {
        button.classList.add('active-toggle');
    }
}