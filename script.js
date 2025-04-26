document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');
    const notification = document.getElementById('notification');

    function showNotification(message, type = 'success') {
        notification.innerText = message;
        notification.className = `alert alert-${type} mb-3`;
        notification.classList.remove('d-none');

        setTimeout(() => {
            notification.classList.add('d-none');
        }, 2000);
    }

    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!name) {
            showNotification('Пожалуйста, введите ваше имя.', 'danger');
            return;
        }

        const phonePattern = /^\+?\d{10,15}$/;
        if (!phonePattern.test(phone)) {
            showNotification('Введите корректный номер телефона.', 'danger');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showNotification('Введите корректный email.', 'danger');
            return;
        }

        if (password.length < 8) {
            showNotification('Пароль должен содержать минимум 8 символов.', 'danger');
            return;
        }

        showNotification('Регистрация успешно завершена!', 'success');

        registrationForm.reset();
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const appointmentForm = document.getElementById('appointmentForm');
    const notification = document.getElementById('appointmentNotification');
    const appointmentDateInput = document.getElementById('appointmentDate');

    const today = new Date().toISOString().split('T')[0];
    appointmentDateInput.setAttribute('min', today);

    function showNotification(message, type = 'success') {
        notification.innerText = message;
        notification.className = `alert alert-${type} mb-3`;
        notification.classList.remove('d-none');

        setTimeout(() => {
            notification.classList.add('d-none');
        }, 2000);
    }

    appointmentForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('appointmentName').value.trim();
        const phone = document.getElementById('appointmentPhone').value.trim();
        const doctor = document.getElementById('appointmentDoctor').value;
        const service = document.getElementById('appointmentService').value;
        const date = document.getElementById('appointmentDate').value;

        if (!name) {
            showNotification('Пожалуйста, введите ваше имя.', 'danger');
            return;
        }

        const phonePattern = /^\+?\d{10,15}$/;
        if (!phonePattern.test(phone)) {
            showNotification('Введите корректный номер телефона.', 'danger');
            return;
        }

        if (!doctor) {
            showNotification('Пожалуйста, выберите врача.', 'danger');
            return;
        }

        if (!service) {
            showNotification('Пожалуйста, выберите услугу.', 'danger');
            return;
        }

        if (!date) {
            showNotification('Пожалуйста, выберите дату.', 'danger');
            return;
        }

        const selectedDate = new Date(date);
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);

        if (selectedDate < todayDate) {
            showNotification('Пожалуйста, выберите сегодняшнюю или будущую дату.', 'danger');
            return;
        }

        showNotification('Вы успешно записались на прием!', 'success');
        

        appointmentForm.reset();
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const notification = document.getElementById('loginNotification');

    function showNotification(message, type = 'success') {
        notification.innerText = message;
        notification.className = `alert alert-${type} mb-3`;
        notification.classList.remove('d-none');

        setTimeout(() => {
            notification.classList.add('d-none');
        }, 2000);
    }

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showNotification('Введите корректный email.', 'danger');
            return;
        }

        if (password.length < 8) {
            showNotification('Пароль должен содержать минимум 8 символов.', 'danger');
            return;
        }

        showNotification('Вы успешно вошли!', 'success');

        loginForm.reset();
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('carouselExampleIndicators');
    const slides = carousel.querySelectorAll('.carousel-item');
    const indicators = carousel.querySelectorAll('.carousel-indicators button');

    let currentIndex = 0;
    const intervalTime = 3000;

    function activateSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            indicators[i].classList.remove('active');
        });

        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }

    function autoSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        activateSlide(currentIndex);
    }

    let slideInterval = setInterval(autoSlide, intervalTime);

    carousel.addEventListener('mouseenter', function () {
        clearInterval(slideInterval);
    });

    carousel.addEventListener('mouseleave', function () {
        slideInterval = setInterval(autoSlide, intervalTime);
    });

    carousel.addEventListener('slide.bs.carousel', function (event) {
        currentIndex = event.to;
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const serviceModal = new bootstrap.Modal(document.getElementById('serviceModal'));
    const serviceImage = document.getElementById('serviceImage');
    const serviceTableBody = document.getElementById('serviceTableBody');

    const detailButtons = document.querySelectorAll('.view-details');

    detailButtons.forEach(button => {
        button.addEventListener('click', function () {
            const name = button.getAttribute('data-name');
            const description = button.getAttribute('data-description');
            const imageSrc = button.getAttribute('data-image');

            document.getElementById('serviceModalLabel').textContent = name;
            serviceImage.src = imageSrc;

            serviceTableBody.innerHTML = '';

            const tableData = [
                { parameter: 'Цена', value: '5000 ₽' },
                { parameter: 'Продолжительность', value: '30 минут' },
                { parameter: 'Необходимые документы', value: 'Паспорт, медицинская карта' },
            ];

            tableData.forEach((row, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                                <th scope="row">${index + 1}</th>
                                <td>${row.parameter}</td>
                                <td>${row.value}</td>
                               `;
                serviceTableBody.appendChild(tr);
            });

            serviceModal.show();
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('toggle-theme');
    const body = document.body;


    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme + '-theme');
        toggleBtn.innerText = savedTheme === 'dark' ? '🌙' : '☀️';
    } else {
        body.classList.add('light-theme');
        toggleBtn.innerText = '☀️';
    }


    if (toggleBtn) {
        toggleBtn.addEventListener('click', function () {
            const isDark = body.classList.toggle('dark-theme');
            body.classList.toggle('light-theme');
            const theme = isDark ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
            toggleBtn.innerText = isDark ? '🌙' : '☀️';
        });
    }
});

document.getElementById('registrationForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, phone, email, password }),
        });

        const result = await response.json();

        const notification = document.getElementById('notification');
        if (response.ok) {
            notification.className = 'alert alert-success d-block mb-3';
            notification.textContent = result.message;
        } else {
            notification.className = 'alert alert-danger d-block mb-3';
            notification.textContent = result.error || 'Ошибка регистрации.';
        }
    } catch (error) {
        console.error('Ошибка:', error);
        console.log('Отправляемые данные:', { name, phone, email, password });
        alert('Произошла ошибка при отправке данных.');
    }
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        const notification = document.getElementById('loginNotification');
        if (response.ok) {
            notification.className = 'alert alert-success d-block mb-3';
            notification.textContent = result.message;
        } else {
            notification.className = 'alert alert-danger d-block mb-3';
            notification.textContent = result.error || 'Ошибка входа.';
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке данных.');
    }
});