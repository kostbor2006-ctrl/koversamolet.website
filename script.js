document.addEventListener('DOMContentLoaded', () => {

    /** 1. МОБІЛЬНЕ МЕНЮ **/
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

    /** 2. МОДАЛЬНЕ ВІКНО **/
    const modal = document.getElementById('requestModal');
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const closeModalBtn = document.querySelector('.close-modal');

    const openModal = () => { if(modal) { modal.classList.add('active'); document.body.style.overflow = 'hidden'; } };
    const closeModal = () => { if(modal) { modal.classList.remove('active'); document.body.style.overflow = 'initial'; } };

    modalTriggers.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    }));
    
    if(closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if(modal) {
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    }

    /** 3. ВАЛІДАЦІЯ ТА МАСКА ТЕЛЕФОНУ **/
    const phoneInput = document.getElementById('formPhone');
    const nameInput = document.getElementById('formName');

    if (nameInput) {
        nameInput.addEventListener('input', (e) => {
            // Тільки літери та пробіли
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

    /** 4. ВІДПРАВКА В TELEGRAM (На 2 чати) **/
    const contactForm = document.getElementById('contactForm');
    const TELEGRAM_TOKEN = '8611141157:AAEgnyiwna5sJShHfCx2FdHuhSfPJh8S8vI'; 
    const TELEGRAM_CHAT_IDS = ['829947469', '5166749939']; 

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const currentLang = document.documentElement.lang || 'ua';
            const submitBtn = contactForm.querySelector('button');
            const name = nameInput.value.trim();
            const phone = phoneInput.value.trim();
            const serviceSelect = document.getElementById('formService');
            const selectedServiceText = serviceSelect.options[serviceSelect.selectedIndex].text;

            if (phone.length < 13) {
                const alertMsg = currentLang === 'ua' ? 'Введіть повний номер: +380XXXXXXXXX' : 'Введите полный номер: +380XXXXXXXXX';
                alert(alertMsg);
                return;
            }

            // Текст повідомлення (статичний, залежить від мови сторінки)
            const labels = {
                ua: { title: "🚀 *Нова заявка!*", name: "👤 Ім'я", phone: "📞 Тел", service: "🛠 Послуга", sending: "Відправка..." },
                ru: { title: "🚀 *Новая заявка!*", name: "👤 Имя", phone: "📞 Тел", service: "🛠 Услуга", sending: "Отправка..." }
            };
            const l = labels[currentLang] || labels.ua;

            const message = `${l.title}\n${l.name}: ${name}\n${l.phone}: ${phone}\n${l.service}: ${selectedServiceText}`;

            submitBtn.disabled = true;
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = l.sending;

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
                    const successMsg = currentLang === 'ua' ? 'Дякуємо! Заявка прийнята.' : 'Спасибо! Заявка принята.';
                    alert(successMsg);
                    contactForm.reset();
                    closeModal();
                } else {
                    alert('Error / Помилка');
                }
            } catch (error) {
                alert('Connection Error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
            }
        });
    }

    /** 5. ЛОГІКА FAQ (Акордеон) **/
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

    /** 6. ПЛАВНИЙ СКРОЛ **/
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

    /** 7. АНІМАЦІЯ ПОЯВИ ЕЛЕМЕНТІВ **/
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
});