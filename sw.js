const SCHEDULE_WEEKDAY = [
    { hour: 5, minute: 40, message: "Подъём, 2 стакана воды, дыхание" },
    { hour: 8, minute: 0, message: "Стакан воды" },
    { hour: 10, minute: 0, message: "Мини-комплекс для стоп и осанки (см. Тренировка)" },
    { hour: 12, minute: 0, message: "Чёрный кофе 400 мл" },
    { hour: 12, minute: 30, message: "Прогулка 20-30 мин" },
    { hour: 14, minute: 0, message: "Мини-комплекс + вода" },
    { hour: 16, minute: 0, message: "Мини-комплекс + вода" },
    { hour: 19, minute: 0, message: "Основной приём пищи (OMAD) – см. меню дня" },
    { hour: 21, minute: 30, message: "Готовиться ко сну, отбой до 23:00" }
];

const SUNDAY_SCHEDULE = [
    { hour: 5, minute: 40, message: "Подъём, вода" },
    { hour: 8, minute: 0, message: "Вода, можно 2 яйца (если голоден)" },
    { hour: 10, minute: 0, message: "Активация стоп (мини-комплекс)" },
    { hour: 12, minute: 0, message: "Чёрный кофе" },
    { hour: 13, minute: 0, message: "Подготовка к тренировке (гиря, коврик)" },
    { hour: 14, minute: 0, message: "ТРЕНИРОВКА С ГИРЕЙ (см. вкладку Тренировка)" },
    { hour: 18, minute: 0, message: "Ужин после тренировки: говядина, рис/гречка, салат, банан, кефир" },
    { hour: 21, minute: 30, message: "Отбой до 23:00" }
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
            self.registration.showNotification("🔥 FatBurner Pro", {
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
