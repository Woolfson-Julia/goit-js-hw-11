// Импортируем библиотеку iziToast для отображения уведомлений
import iziToast from "izitoast";

// Находим элементы на странице: 
// - инпут, в который пользователь вводит задержку
// - форму, которую пользователь отправляет
const inputDelayForm = document.querySelector('.js-input');
const formSubmit = document.querySelector('.js-form');


// Функция для получения выбранного значения радио-кнопки (статуса)
const getSelectedState = () => {
    // Находим выбранную радио-кнопку с именем "state"
  const selectedRadio = document.querySelector('input[name="state"]:checked');
   // Если кнопка выбрана, возвращаем её значение fulfilled' или 'rejected'
  if (selectedRadio) {
    return selectedRadio.value;
  }
  // Если ничего не выбрано, возвращаем null
  return null;
}

// Функция для создания и выполнения промиса с заданным состоянием и задержкой
const createPromise = (state, delay) => {
  // Возвращаем новый промис
  return new Promise((resolve, reject) => {
    // Используем setTimeout для выполнения после задержки
    setTimeout(() => {
      if (state === 'fulfilled') {
        // Если состояние 'fulfilled', промис выполняется успешно
        resolve(`Fulfilled promise in ${delay}ms`); // сообщение при успешном выполнении
      } else if (state === 'rejected') {
        // Если состояние 'rejected', промис отклоняется с ошибкой
        reject(`Rejected promise in ${delay}ms`); // сообщение при ошибке
        // Если состояния нет, ничего не делаем
      } else {
        return;
      }
    }, delay); // Задержка в миллисекундах
  })
};
    
// Обработчик события отправки формы
const onCreatePromise = (event) => {
    // Отменяем стандартное поведение формы (перезагрузку страницы)
  event.preventDefault();

    // Получаем состояние (fulfilled/rejected)
  const state = getSelectedState();
    // Преобразуем введенную задержку в число
  const delay = parseInt(inputDelayForm.value, 10);
    // Проверяем, что задержка является положительным числом (первое проверка явл. ли числом)
  if (!isNaN(delay) && delay >= 0) {
    // Если состояние выбрано, создаём и обрабатываем промис
if (state) {
  createPromise(state, delay)
      // Если промис выполнен успешно, отображаем уведомление об успехе
      .then(result => {
        iziToast.success({
          message: result
      })
      })
    .catch(error => {
         // Если промис отклонён, отображаем уведомление об ошибке
        iziToast.error({
          message: error
        })
      });
  }
}
  }
  

// Добавляем обработчик события для отправки формы
formSubmit.addEventListener('submit', onCreatePromise);
