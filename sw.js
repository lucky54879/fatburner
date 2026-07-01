const WEEKDAY = [
    { hour: 5, minute: 30, message: "Подъём, 2 стакана воды" },
    { hour: 6, minute: 10, message: "Выход из дома" },
    { hour: 8, minute: 0, message: "Начало работы" },
    { hour: 10, minute: 0, message: "Мини-комплекс (стопы+осанка)" },
    { hour: 12, minute: 0, message: "Кофе-брейк (латте/чёрный), можно прогуляться" },
    { hour: 14, minute: 0, message: "Мини-комплекс + вода" },
    { hour: 16, minute: 0, message: "Мини-комплекс + вода" },
    { hour: 17, minute: 0, message: "Окончание работы, выезд" },
    { hour: 18, minute: 10, message: "Пешая прогулка 2 км" },
    { hour: 19, minute: 0, message: "Ужин (см. меню в приложении)" },
    { hour: 21, minute: 30, message: "Подготовка ко сну" }
];
const SUNDAY = [
    { hour: 6, minute: 30, message: "Подъём, вода" },
    { hour: 12, minute: 0, message: "Кофе-брейк" },
    { hour: 14, minute: 0, message: "Тренировка с гирей" },
    { hour: 18, minute: 0, message: "Ужин (спортивное меню)" }
];

self.addEventListener('message', e => { if (e.data.action === 'startSchedule') scheduleDaily(); });
function scheduleDaily() { setInterval(check, 60000); check(); }
function check() {
    const now = new Date();
    const sched = now.getDay() === 0 ? SUNDAY : WEEKDAY;
    sched.forEach(item => {
        if (now.getHours() === item.hour && now.getMinutes() === item.minute) {
            self.registration.showNotification("🔥 FatBurner", { body: item.message, icon: "🔥", tag: `${item.hour}:${item.minute}` });
        }
    });
}
self.addEventListener('activate', () => scheduleDaily());
