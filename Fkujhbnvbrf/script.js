// ---------- 1. Счётчик (события, манипуляция текстом)
    let counter = 0;
    const counterSpan = document.getElementById('counterValue');
    const incBtn = document.getElementById('incBtn');
    const resetCounterBtn = document.getElementById('resetCounter');

    function updateCounterUI() {
        counterSpan.textContent = counter;
    }

    incBtn.addEventListener('click', () => {
        counter++;
        updateCounterUI();
    });
    resetCounterBtn.addEventListener('click', () => {
        counter = 0;
        updateCounterUI();
    });

    // ---------- 2. Изменение цвета блока + демонстрация работы со стилями
    const colorBlock = document.getElementById('colorBlock');
    const redBtn = document.getElementById('redBtn');
    const blueBtn = document.getElementById('blueBtn');
    const greenBtn = document.getElementById('greenBtn');
    const randomBtn = document.getElementById('randomBtn');

    function setBlockColor(color) {
        colorBlock.style.backgroundColor = color;
    }

    redBtn.addEventListener('click', () => setBlockColor('#ef4444'));
    blueBtn.addEventListener('click', () => setBlockColor('#3b82f6'));
    greenBtn.addEventListener('click', () => setBlockColor('#10b981'));
    randomBtn.addEventListener('click', () => {
        const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
        setBlockColor(randomColor);
    });

    // ---------- 3. ToDo список — работа с массивами, динамическое создание/удаление элементов (функции JS)
    let todos = [
        { id: Date.now() + 1, text: " Изучить HTML структуру" },
        { id: Date.now() + 2, text: " Поэкспериментировать с CSS" },
        { id: Date.now() + 3, text: " Написать JS-функции" }
    ];

    const todoListEl = document.getElementById('todoList');
    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodoBtn');

    function renderTodos() {
        todoListEl.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.text;
            const delButton = document.createElement('button');
            delButton.textContent = '✔';
            delButton.classList.add('del-btn');
            delButton.addEventListener('click', (e) => {
                e.stopPropagation();
                // удаляем элемент из массива
                todos = todos.filter(t => t.id !== todo.id);
                renderTodos();   // перерендер
            });
            li.appendChild(delButton);
            todoListEl.appendChild(li);
        });
    }

    addTodoBtn.addEventListener('click', () => {
        const newText = todoInput.value.trim();
        if (newText === "") {
            alert("Функция проверки: введите задачу!");
            return;
        }
        const newTodo = {
            id: Date.now(),
            text: newText
        };
        todos.push(newTodo);
        renderTodos();
        todoInput.value = '';
    });

    // начальная отрисовка списка
    renderTodos();

    // ---------- 4. Часы / setInterval (демонстрация работы таймеров)
    let clockInterval = null;
    const liveClockSpan = document.getElementById('liveClock');
    const toggleClockBtn = document.getElementById('toggleClockBtn');
    let clockActive = true;

    function updateClock() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('ru-RU', { hour12: false });
        liveClockSpan.textContent = timeStr;
    }

    function startClock() {
        if (clockInterval) clearInterval(clockInterval);
        clockInterval = setInterval(updateClock, 1000);
        updateClock();
    }
    startClock();   // запускаем сразу

    toggleClockBtn.addEventListener('click', () => {
        if (clockActive) {
            clearInterval(clockInterval);
            clockInterval = null;
            toggleClockBtn.textContent = '▶️ Запустить часы';
            clockActive = false;
        } else {
            startClock();
            toggleClockBtn.textContent = '⏸️ Приостановить часы';
            clockActive = true;
        }
    });

    // ---------- 5. localstorage: сохранить состояние (цвет блока и счётчик)
    const saveStateBtn = document.getElementById('saveStateBtn');
    const loadStateBtn = document.getElementById('loadStateBtn');
    const storageMsg = document.getElementById('storageMsg');

    function saveCurrentState() {
        const currentColor = colorBlock.style.backgroundColor; // rgb or hex
        const state = {
            counterValue: counter,
            blockColor: currentColor,
            savedAt: new Date().toLocaleTimeString()
        };
        localStorage.setItem('webLangDemo', JSON.stringify(state));
        storageMsg.textContent = `✅ Сохранено! Цвет: ${currentColor}, счётчик: ${counter}`;
        setTimeout(() => {
            if (storageMsg) storageMsg.textContent = '💾 Состояние сохранено в localStorage';
        }, 2000);
    }

    function loadStateFromStorage() {
        const raw = localStorage.getItem('webLangDemo');
        if (!raw) {
            storageMsg.textContent = '❌ Нет сохранённых данных. Нажми "Сохранить состояние" сначала.';
            return;
        }
        try {
            const saved = JSON.parse(raw);
            if (typeof saved.counterValue === 'number') {
                counter = saved.counterValue;
                updateCounterUI();
            }
            if (saved.blockColor && saved.blockColor !== "") {
                colorBlock.style.backgroundColor = saved.blockColor;
            }
            storageMsg.textContent = `📀 Загружено! счёт: ${saved.counterValue}, цвет восстановлен. (${saved.savedAt || '?'})`;
        } catch(e) {
            storageMsg.textContent = 'Ошибка загрузки';
        }
        setTimeout(() => {
            if (storageMsg && !storageMsg.textContent.includes('❌')) 
                storageMsg.textContent = '✨ Состояние загружено!';
        }, 2000);
    }

    saveStateBtn.addEventListener('click', saveCurrentState);
    loadStateBtn.addEventListener('click', loadStateFromStorage);

    // маленькая дополнительная функция: динамическое приветствие (демо работы с window)
    console.log("Страница загружена. Демонстрируем функции HTML (структура), CSS (визуал, анимации на кнопках), JavaScript (вся логика выше).");
    // Также показываем функцию обработки ввода: при нажатии Enter в todo поле
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodoBtn.click();
        }
    });

    // простой эффект: после загрузки добавим сообщение об уникальных особенностях
    const footer = document.querySelector('footer');
    if (footer) {
        const extraSpan = document.createElement('span');
        extraSpan.style.display = 'block';
        extraSpan.style.marginTop = '8px';
        extraSpan.style.fontSize = '0.75rem';
        extraSpan.innerHTML = '⚙️ JavaScript — функции высшего порядка, обработка событий, манипуляции DOM, работа с массивами, localStorage, setInterval.';
        footer.appendChild(extraSpan);
    }