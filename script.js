document.addEventListener('DOMContentLoaded', () => {

    /** 1. МОБИЛЬНЕ МЕНЮ **/
    const menuToggle = document.getElementById('menuToggle');
    const headerNav = document.getElementById('headerNav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            headerNav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }

    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            if (headerNav) headerNav.classList.remove('active');
            const icon = menuToggle ? menuToggle.querySelector('i') : null;
            if(icon) icon.className = 'fas fa-bars';
        });
    });

    /** 2. МОДАЛЬНЕ ОКНО (ЗАЯВКИ) **/
    const modal = document.getElementById('requestModal');
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const closeModalBtns = modal ? modal.querySelectorAll('.close-modal, [class*="close"], .close') : [];

    const openModal = () => { if(modal) { modal.classList.add('active'); document.body.style.overflow = 'hidden'; } };
    const closeModal = () => { if(modal) { modal.classList.remove('active'); document.body.style.overflow = 'initial'; } };

    modalTriggers.forEach(btn => btn.addEventListener('click', (e) => {
        if (btn.getAttribute('type') === 'submit') return;
        e.preventDefault();
        openModal();
    }));
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    if(modal) {
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    }

    /** 3. ВАЛИДАЦИЯ И МАСКА ТЕЛЕФОНА **/
    const phoneInput = document.getElementById('formPhone');
    const nameInput = document.getElementById('formName');

    if (nameInput) {
        nameInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s]/g, '');
        });
    }

    if (phoneInput) {
        phoneInput.addEventListener('focus', () => {
            if (!phoneInput.value) phoneInput.value = '+380';
        });

        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value;
            if (!value.startsWith('+380')) value = '+380';
            e.target.value = '+' + value.substring(1).replace(/[^\d]/g, '');
            if (e.target.value.length > 13) e.target.value = e.target.value.slice(0, 13);
        });
    }

    /** 4. ОТПРАВКА В TELEGRAM **/
    const contactForm = document.getElementById('contactForm');
    const TELEGRAM_TOKEN = '8611141157:AAEgnyiwna5sJShHfCx2FdHuhSfPJh8S8vI'; 
    const TELEGRAM_CHAT_IDS = ['829947469', '5166749939']; 

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const currentLang = document.documentElement.lang || 'uk';
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            
            if (submitBtn && submitBtn.disabled) return;

            const name = nameInput ? nameInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const addressInput = document.getElementById('formAddress');
            const address = addressInput ? addressInput.value.trim() : '';
            const serviceSelect = document.getElementById('formService');
            const selectedServiceText = serviceSelect ? serviceSelect.options[serviceSelect.selectedIndex].text : '';

            if (phone.length < 13) {
                const alertMsg = (currentLang === 'uk' || currentLang === 'ua') 
                    ? 'Введіть повний номер: +380XXXXXXXXX' 
                    : 'Введите полный номер: +380XXXXXXXXX';
                alert(alertMsg);
                return;
            }

            const labels = {
                uk: { 
                    title: "🚀 *Нова заявка!*", 
                    name: "👤 Ім'я", 
                    phone: "📞 Тел", 
                    address: "📍 Адреса", 
                    service: "🛠 Послуга", 
                    notSpecified: "Не вказано",
                    sending: "Відправка..." 
                },
                ru: { 
                    title: "🚀 *Новая заявка!*", 
                    name: "👤 Имя", 
                    phone: "📞 Тел", 
                    address: "📍 Адрес", 
                    service: "🛠 Услуга", 
                    notSpecified: "Не указан",
                    sending: "Отправка..." 
                }
            };
            
            const isUk = (currentLang === 'uk' || currentLang === 'ua');
            const l = isUk ? labels.uk : labels.ru;

            const displayAddress = address || l.notSpecified;
            const message = `${l.title}\n${l.name}: ${name}\n${l.phone}: ${phone}\n${l.address}: ${displayAddress}\n${l.service}: ${selectedServiceText}`;

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerText = l.sending;
            }

            try {
                const requests = TELEGRAM_CHAT_IDS.map(chatId => 
                    fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            chat_id: chatId,
                            text: message,
                            parse_mode: 'Markdown'
                        })
                    })
                );

                const responses = await Promise.all(requests);
                const isAnySuccess = responses.some(res => res.ok);

                if (isAnySuccess) {
                    const successMsg = isUk ? 'Дякуємо! Заявка прийнята.' : 'Спасибо! Заявка принята.';
                    alert(successMsg);
                    contactForm.reset();
                    closeModal();
                } else {
                    alert('Error / Помилка');
                }
            } catch (error) {
                alert('Connection Error');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerText = isUk ? 'Відправити' : 'Отправить';
                }
            }
        });
    }

    /** 5. ЛОГИКА FAQ (Аккордеон) **/
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(el => el.classList.remove('active'));
                if (!isActive) item.classList.add('active');
            });
        }
    });

    /** 6. ПЛАВНЫЙ СКРОЛЛ **/
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.startsWith('#request')) return; 
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    /** 7. АНИМАЦИЯ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ **/
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.s-card, .equip-card, .step-item, .extra-item, .faq-item, .dist-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        revealObserver.observe(el);
    });

    const revealStyle = document.createElement('style');
    revealStyle.innerHTML = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(revealStyle);

    /** 8. ИНТЕРАКТИВНОЕ ПОРТФОЛИО И ОБЩИЙ КАТАЛОГ **/
    const workModal = document.getElementById('workDetailModal');
    const allPhotosModal = document.getElementById('allPhotosModal') || document.getElementById('galleryModal');
    const openAllGallery = document.getElementById('openAllGallery') || document.getElementById('openGalleryBtn');
    const closeWorkModal = document.getElementById('closeWorkModal');
    const closeAllModal = document.getElementById('closeAllModal') || document.getElementById('closeGalleryBtn');

    const modalTitle = document.getElementById('modalWorkTitle');
    const modalVideoBox = document.getElementById('modalVideoBox');
    const modalVideoElement = document.getElementById('modalVideoElement');
    const modalPhotosContainer = document.getElementById('modalPhotosContainer');

    if (openAllGallery && allPhotosModal) {
        openAllGallery.addEventListener('click', (e) => {
            e.preventDefault();
            allPhotosModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    const closeAll = () => {
        if (allPhotosModal) {
            allPhotosModal.classList.remove('active');
            document.body.style.overflow = 'initial';
        }
    };

    if (closeAllModal) closeAllModal.addEventListener('click', closeAll);

    const closeWork = () => {
        if (workModal) {
            workModal.classList.remove('active');
            if (modalVideoElement) {
                modalVideoElement.pause();
                modalVideoElement.currentTime = 0;
            }
            document.body.style.overflow = 'initial';
        }
    };

    if (closeWorkModal) closeWorkModal.addEventListener('click', closeWork);

    window.addEventListener('click', (e) => {
        if (workModal && e.target === workModal) {
            closeWork();
        }
        if (allPhotosModal && e.target === allPhotosModal) {
            closeAll();
        }
    });

    document.querySelectorAll('.modal-work-trigger').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            const videoSrc = card.getAttribute('data-video');
            let images = [];
            
            try {
                images = JSON.parse(card.getAttribute('data-images'));
            } catch (err) {
                images = [];
            }

            if (modalTitle) modalTitle.textContent = title || 'Пример работы';

            if (videoSrc && modalVideoBox && modalVideoElement) {
                modalVideoBox.style.display = 'block';
                const videoSource = modalVideoElement.querySelector('source');
                if (videoSource) {
                    videoSource.src = videoSrc;
                } else {
                    modalVideoElement.src = videoSrc;
                }
                modalVideoElement.load();
            } else if (modalVideoBox) {
                modalVideoBox.style.display = 'none';
            }
            
            if (modalPhotosContainer) {
                modalPhotosContainer.innerHTML = '';
                images.forEach(imgSrc => {
                    const item = document.createElement('div');
                    item.className = 'modal-photo-item';
                    item.innerHTML = `<img src="${imgSrc}" alt="Фото работы">`;
                    modalPhotosContainer.appendChild(item);
                });
            }

            if (allPhotosModal) allPhotosModal.classList.remove('active');
            if (workModal) {
                workModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    /** 9. КНОПКА ПОЛНОЭКРАННОГО РЕЖИМА И ПЛЕЙ/ПАУЗА ДЛЯ ВИДЕО **/
    const fullScreenBtn = document.getElementById('fullScreenBtn');
    
    if (fullScreenBtn && modalVideoElement) {
        fullScreenBtn.addEventListener('click', () => {
            if (modalVideoElement.requestFullscreen) {
                modalVideoElement.requestFullscreen();
            } else if (modalVideoElement.webkitRequestFullscreen) { /* Safari */
                modalVideoElement.webkitRequestFullscreen();
            } else if (modalVideoElement.msRequestFullscreen) { /* IE11 */
                modalVideoElement.msRequestFullscreen();
            }
        });
    }

    if (modalVideoElement) {
        modalVideoElement.addEventListener('click', () => {
            if (modalVideoElement.paused) {
                modalVideoElement.play();
            } else {
                modalVideoElement.pause();
            }
        });
    }
});
