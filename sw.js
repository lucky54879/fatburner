const SCHEDULE_WEEKDAY = [
    { hour: 5, minute: 40, message: "🌅 Подъём! Выпей 2 стакана тёплой воды. Сделай 5 глубоких вдохов." },
    { hour: 8, minute: 0, message: "💧 Вода. Время стакана." },
    { hour: 10, minute: 0, message: "🦶 Мини-комплекс для стоп и осанки:\n1. Подъёмы на носки 20 раз\n2. 'Короткая стопа' 5х10 сек\n3. Сжать ягодицы + втянуть живот 10 раз\n4. Наклон таза кзади 8 раз" },
    { hour: 12, minute: 0, message: "☕ Время чёрного кофе (400 мл). Жиросжигание продолжается!" },
    { hour: 12, minute: 30, message: "🚶 Прогулка 20-30 мин. Следи за осанкой: грудь вперёд, таз нейтральный." },
    { hour: 14, minute: 0, message: "🦶 Мини-комплекс (стопы+таз). Сделай прямо сейчас!" },
    { hour: 16, minute: 0, message: "🦶 Последний мини-комплекс дня. И выпей воды." },
    { hour: 19, minute: 0, message: "🍽 Основной приём пищи (OMAD). 1800-1900 ккал, Б155 Ж78 У130." },
    { hour: 21, minute: 30, message: "😴 Готовься ко сну. Экран в сторону, отбой до 23:00." }
];

const SUNDAY_SCHEDULE = [
    { hour: 5, minute: 40, message: "🌅 Подъём! Сегодня тренировка с гирей и коррекция стоп/таза." },
    { hour: 8, minute: 0, message: "💧 Стакан воды. Можно лёгкий завтрак (2 яйца), если голоден." },
    { hour: 10, minute: 0, message: "🦶 Утренняя активация стоп: подъёмы, короткая стопа, ягодицы." },
    { hour: 12, minute: 0, message: "☕ Чёрный кофе. Через час начнётся тренировка." },
    { hour: 13, minute: 0, message: "💧 Вода. Проверь готовность к тренировке: гиря 20 кг, коврик." },
    { hour: 14, minute: 0, message: "🏋️‍♂️ ТРЕНИРОВКА:\nРазминка (8 мин) – стопы, выпады.\nКруг 4 раза:\n- Махи гирей 15\n- Приседания с гирей 12\n- Тяга в наклоне 12/рука\n- Жим стоя 10/рука\n- Выпады назад 10/нога\n- Боковая планка 30 сек\n- Ягодичный мостик 12/нога\nЗаминка (8 мин) – растяжка сгибателей, 'собака-кошка'." },
    { hour: 18, minute: 0, message: "🍽 Ужин после тренировки: говядина 250 г, рис/гречка 250 г, салат, банан, кефир (2100 ккал)." },
    { hour: 21, minute: 30, message: "😴 Подготовка ко сну. Завтра рабочий день." }
];

self.addEventListener('message', event => {
    if (event.data.action === 'startSchedule') {
        scheduleDailyNotifications();
    }
});

function scheduleDailyNotifications() {
    setInterval(checkAndNotify, 60000);
    checkAndNotify();
}

function checkAndNotify() {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 - воскресенье
    const schedule = (dayOfWeek === 0) ? SUNDAY_SCHEDULE : SCHEDULE_WEEKDAY;

    schedule.forEach(item => {
        if (now.getHours() === item.hour && now.getMinutes() === item.minute) {
            self.registration.showNotification("FatBurner Pro", {
                body: item.message,
                icon: "🔥",
                tag: `${dayOfWeek}-${item.hour}:${item.minute}`
            });
        }
    });
}

self.addEventListener('activate', event => {
    scheduleDailyNotifications();
});
