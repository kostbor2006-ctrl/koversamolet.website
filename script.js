document.addEventListener('DOMContentLoaded', () => {

    /** 1. ТЕКСТИ ДЛЯ ПЕРЕКЛАДУ (UA/RU) **/
    const translations = {
        ua: {
            nav_services: "Послуги", nav_equip: "Обладнання", nav_how: "Як ми працюємо", nav_contacts: "Контакти", nav_location: "Доставка",
            btn_request: "Залишити заявку", 
            hero_title: "Прання килимів Дніпро:<br>100 грн/м² + Безкоштовна доставка",
            hero_subtext: "Ми безкоштовно заберемо від під'їзду, професійно випраємо на обладнанні та привеземо сухим через 3–7 днів",
            badge_pile: "довгий ворс 120 грн/м²", badge_guarantee: "Гарантія якості",
            btn_order: "Замовити чистку", btn_tg: "Написати в Telegram", services_title: "Наші послуги",
            s1: "Прання килимів", s2: "Професійне сушіння", s3: "Хімчистка килимів", s4: "Очищення ворсу",
            s5: "Видалення плям та запахів", s6: "Антибактеріальна обробка", s7: "Відновлення кольору", s8: "Видалення шерсті",
            equip_title: "Професійне обладнання", e1_h: "Центрифуга", e1_p: "Для ідеального віджиму без деформації",
            e2_h: "Полотер", e2_p: "Глибоке механічне чищення ворсу", e3_h: "Мийка високого тиску", e3_p: "Видалення найглибшого бруду",
            how_title: "Як ми працюємо", step1: "Приїхали до під'їзду", step2: "Забрали речі для прання",
            step3: "Попрали та висушили", step4: "Привезли назад чистими", clothes_h: "Прання верхнього одягу",
            clothes_p: "Бережне чищення курток, пуховиків та пальт. Зберігаємо структуру наповнювача.",
            price_clothes: "400 грн / шт", blanket_h: "Прання пледів та ковдр",
            blanket_p: "Глибоке прання та повне висушування. Видаляємо пилових кліщів та сторонні запахи.",
            price_blanket: "300 грн / шт", btn_order_simple: "Замовити", f_comfort: "Ваш комфорт — наша робота",
            f_city: "Дніпро, Україна", f_contacts_h: "Контакти", f_social_h: "Ми в Соц мережах",
            f_rights: "© 2026 Всі права захищені. Ковер-Самолет Дніпро.", m_title: "Швидка заявка",
            m_sub: "Залиште контакти, ми передзвонимо!", 
            opt1: "Прання килима", opt2: "Прання пледа/ковдри", opt3: "Верхній одяг", 
            btn_send: "Відправити",
            extra_title: "Додаткові послуги", ex1: "Матраци (пил, плями, запахи)", ex2: "Одеяла та пледи", 
            ex3: "Килими та килимки", ex4: "М'які іграшки", ex5: "Покривала", ex6: "Чохли від диванів та матраців",
            after_h: "Після чистки:", a1: "Свіжість та чистота", a2: "Охайний вигляд", a3: "Без неприємних запахів", a4: "Безпечно для дітей",
            dist_title: "Доставка по всьому Дніпру",
            dist_sub: "Доставка у вказаних районах — БЕЗКОШТОВНА! Ми самі заберемо і привеземо!",
            dist_right_h: "Правий берег",
            dist_right_p: "Парус, Червоний Камінь, Покровський.",
            dist_left_h: "Лівий берег",
            dist_left_p: "АНД район, Сонячний, Слобожанський, Калинова, Лівобережний, Клочко.",
            faq_title: "Часті питання", 
            q1: "Скільки часу триває прання?", a1_faq: "Зазвичай весь процес (забір, прання, сушіння та доставка) займає від 3 до 7 днів.",
            q2: "Чи виводите ви запах?", a2_faq: "Так, ми використовуємо спеціалізовану хімію, яка розщеплює джерело запаху на молекулярному рівні.",
            q3: "Ви праєте на автомийці?", a3_faq: "Ні! У нас професійний цех з центрифугою та камерою для сушіння.",
            // TG Labels
            tg_new_order: "🚀 *Нова заявка!*",
            tg_name_label: "👤 Ім'я",
            tg_phone_label: "📞 Тел",
            tg_service_label: "🛠 Послуга"
        },
        ru: {
            nav_services: "Услуги", nav_equip: "Оборудование", nav_how: "Как мы работаем", nav_contacts: "Контакты", nav_location: "Доставка",
            btn_request: "Оставить заявку", 
            hero_title: "Стирка ковров Днепр:<br>100 грн/м² + Бесплатная доставка",
            hero_subtext: "Мы бесплатно заберем от подъезда, профессионально постираем на оборудовании и привезем сухим через 3–7 дней",
            badge_pile: "длинный ворс 120 грн/м²", badge_guarantee: "Гарантия качества",
            btn_order: "Заказать чистку", btn_tg: "Написать в Telegram", services_title: "Наши услуги",
            s1: "Стирка ковров", s2: "Профессиональная сушка", s3: "Химчистка ковров", s4: "Очистка ворса",
            s5: "Удаление пятен и запахов", s6: "Антибактериальная обработка", s7: "Восстановление цвета", s8: "Удаление шерсти",
            equip_title: "Профессиональное оборудование", e1_h: "Центрифуга", e1_p: "Для идеального отжима без деформации",
            e2_h: "Полотер", e2_p: "Глубокая механическая чистка ворса", e3_h: "Мойка высокого давления", e3_p: "Удаление глубокой грязи",
            how_title: "Как мы работаем", step1: "Приехали к подъезду", step2: "Забрали вещи для стирки",
            step3: "Постирали и высушили", step4: "Привезли назад чистыми", clothes_h: "Стирка верхней одежды",
            clothes_p: "Бережная чистка курток, пуховиков и пальто. Сохраняем структуру наполнителя.",
            price_clothes: "400 грн / шт", blanket_h: "Стирка пледов и одеял",
            blanket_p: "Глубокая стирка и полная просушка. Удаляем пылевых клещей и запахи.",
            price_blanket: "300 грн / шт", btn_order_simple: "Заказать", f_comfort: "Ваш комфорт — наша работа",
            f_city: "Днепр, Украина", f_contacts_h: "Контакты", f_social_h: "Мы в Соц сетях",
            f_rights: "© 2026 Все права защищены. Ковер-Самолет Днепр.", m_title: "Быстрая заявка",
            m_sub: "Оставьте контакты, мы перезвоним!", 
            opt1: "Стирка ковра", opt2: "Стирка пледа/одеяла", opt3: "Верхняя одежда",
            btn_send: "Отправить",
            extra_title: "Дополнительные услуги", ex1: "Матрасы (пыль, пятна, запахи)", ex2: "Одеяла и пледы", 
            ex3: "Ковры и коврики", ex4: "Мягкие игрушки", ex5: "Покрывала", ex6: "Чехлы от диванов и матрасов",
            after_h: "После чистки:", a1: "Свежесть и чистота", a2: "Опрятный вид", a3: "Без неприятных запахов", a4: "Безопасно для детей",
            dist_title: "Доставка по всему Днепру",
            dist_sub: "Доставка в указанных районах — БЕСПЛАТНАЯ! Мы сами заберем и привезём!",
            dist_right_h: "Правый берег",
            dist_right_p: "Парус, Красный Камень, Покровский.",
            dist_left_h: "Левый берег",
            dist_left_p: "АНД район, Солнечный, Слобожанский, Калиновая, Левобережный, Клочко.",
            faq_title: "Частые вопросы", 
            q1: "Сколько времени длится стирка?", a1_faq: "Обычно весь процесс (забор, стирка, сушка и доставка) занимает от 3 до 7 дней.",
            q2: "Выводите ли вы запах?", a2_faq: "Да, мы используем специализированную химию, которая расщепляет источник запаха на молекулярному уровне.",
            q3: "Вы стираете на автомойке?", a3_faq: "Нет! У нас профессиональный цех с центрифугой и главной сушкой.",
            // TG Labels
            tg_new_order: "🚀 *Новая заявка!*",
            tg_name_label: "👤 Имя",
            tg_phone_label: "📞 Тел",
            tg_service_label: "🛠 Услуга"
        }
    };

    /** 2. ФУНКЦІЯ ПЕРЕКЛАДУ **/
    function changeLanguage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                let translation = translations[lang][key];

                if (element.tagName === 'INPUT') {
                    const cleanText = translation.replace(/[👤📞🛠]/g, '').trim();
                    element.setAttribute('placeholder', cleanText);
                } 
                else if (key === 'hero_title' || key.includes('faq') || key.includes('step') || key.includes('_h')) {
                    element.innerHTML = translation;
                } 
                else {
                    element.textContent = translation;
                }
            }
        });
        document.documentElement.lang = lang;
        localStorage.setItem('preferredLang', lang);
    }

    const langPills = document.querySelectorAll('.lang-pill');
    langPills.forEach(pill => {
        pill.addEventListener('click', () => {
            langPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            changeLanguage(pill.getAttribute('data-lang'));
        });
    });

    const savedLang = localStorage.getItem('preferredLang') || 'ua';
    const activePill = document.querySelector(`.lang-pill[data-lang="${savedLang}"]`);
    if (activePill) {
        langPills.forEach(p => p.classList.remove('active'));
        activePill.classList.add('active');
        changeLanguage(savedLang);
    }

    /** 3. МОБІЛЬНЕ МЕНЮ **/
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

    /** 4. МОДАЛЬНЕ ВІКНО **/
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

    /** 5. ВАЛІДАЦІЯ ТА МАСКА ТЕЛЕФОНУ **/
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

    /** 6. ВІДПРАВКА В TELEGRAM **/
    const contactForm = document.getElementById('contactForm');
    const TELEGRAM_TOKEN = '8611141157:AAEgnyiwna5sJShHfCx2FdHuhSfPJh8S8vI'; 
    const TELEGRAM_CHAT_IDS = ['829947469', '5166749939']; 

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const currentLang = document.documentElement.lang || 'ua';
            const dict = translations[currentLang];
            
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

            const message = `${dict.tg_new_order}\n` +
                            `${dict.tg_name_label}: ${name}\n` +
                            `${dict.tg_phone_label}: ${phone}\n` +
                            `${dict.tg_service_label}: ${selectedServiceText}`;

            submitBtn.disabled = true;
            submitBtn.innerText = currentLang === 'ua' ? 'Відправка...' : 'Отправка...';

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
                submitBtn.innerText = dict.btn_send;
            }
        });
    }

    /** 7. ЛОГІКА FAQ **/
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

    /** 8. ПЛАВНИЙ СКРОЛ **/
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    /** 9. АНІМАЦІЯ ПОЯВИ ЕЛЕМЕНТІВ **/
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