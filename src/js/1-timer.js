// Импортируем библиотеки
import flatpickr from "flatpickr"; // Библиотека для выбора даты и времени
import iziToast from "izitoast"; // Библиотека для отображения уведомлений

// Находим элементы на странице: 
// Кнопка старта, которая будет запускать таймер
let buttonStart = document.querySelector('[data-start]');
// Инпут для выбора даты и времени
let inputEl = document.querySelector('#datetime-picker');

// Инициализируем переменную для выбранной пользователем даты (по умолчанию 0)
let userSelectedDate = 0;
// Сразу отключаем кнопку старта, пока не выбрана правильная дата
buttonStart.disabled = true;
// Опции для инициализации календаря flatpickr
const options = {
  enableTime: true,  // Включаем возможность выбора времени
  time_24hr: true, // Устанавливаем 24-часовой формат времени
  defaultDate: new Date(), // Устанавливаем текущую дату и время по умолчанию
  minuteIncrement: 1, // Инкремент времени по минутам
  onClose(selectedDates) { // Колбэк, когда пользователь выбирает дату и закрывает календарь
        // Сохраняем выбранную дату
    userSelectedDate = selectedDates[0];

       // Проверяем, если выбранная дата раньше текущей
    if (userSelectedDate.getTime() < options.defaultDate.getTime()) {
       // Показываем ошибку, если дата в прошлом
      iziToast.error({
    message: "Please choose a date in the future" // Сообщение об ошибке
      });
      // Отключаем кнопку старта
      buttonStart.disabled = true;
    }
    else {
        // Включаем кнопку старта, если дата корректная
      buttonStart.disabled = false;
    }
  },
};

// Инициализируем flatpickr с заданными опциями
flatpickr("#datetime-picker", options);

// Функция для преобразования миллисекунд в более читаемый формат (дни, часы, минуты, секунды)
function convertMs(ms) {
  // Количество миллисекунд в разных единицах времени
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

   // Вычисляем оставшиеся дни
  const days = Math.floor(ms / day);
  // Вычисляем оставшиеся часы
  const hours = Math.floor((ms % day) / hour);
  // Вычисляем оставшиеся минуты
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Вычисляем оставшиеся секунды
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    // Возвращаем объект с оставшимися днями, часами, минутами и секундами
  return { days, hours, minutes, seconds };
}
// Пример использования функции convertMs
console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}



// Функция для старта таймера
function onTimer() {
  // Отключаем кнопку старта и инпут после начала отсчета
  buttonStart.disabled = true;
  inputEl.disabled = true;
    // Запускаем интервал, который будет обновлять таймер каждую секунду
  const timerInterval = setInterval(() => {
      // Рассчитываем оставшееся время до выбранной даты
    const timeRemaining = userSelectedDate - new Date();
    // Если время вышло (timeRemaining < 0), останавливаем таймер
    if (timeRemaining < 0) {
      clearInterval(timerInterval); // Останавливаем интервал
       // Показываем уведомление, что таймер завершён
      iziToast.success({
      message: "Timer completed"
      })
       // Отключаем кнопку старта, когда таймер завершён
      buttonStart.disabled = true;
       // Включаем инпут, чтобы пользователь мог выбрать другую дату
      inputEl.disabled = false;
    } else {
         // Преобразуем оставшиеся миллисекунды в более читаемый формат
      const { days, hours, minutes, seconds } = convertMs(timeRemaining);
        // Обновляем отображение оставшихся дней, часов, минут и секунд на странице
      document.querySelector('[data-days]').textContent = String(days).padStart(2, '0');
      document.querySelector('[data-hours]').textContent = String(hours).padStart(2, '0');
      document.querySelector('[data-minutes]').textContent = String(minutes).padStart(2, '0');
      document.querySelector('[data-seconds]').textContent = String(seconds).padStart(2, '0');
    }
  }, 1000); // Обновляем каждую секунду
    
    
  }

  // Добавляем обработчик события на кнопку старта
  buttonStart.addEventListener('click', onTimer);



