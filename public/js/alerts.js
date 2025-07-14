export const hideAlert = () => {
  const alert = document.querySelector('.alert');
  if (alert) {
    alert.parentElement.removeChild(alert);
  }
};
export const showAlert = (type, message, time = 8) => {
  hideAlert();
  const markUp = `<div class="alert alert--${type}">${message}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markUp);
  window.setTimeout(hideAlert, time * 1000);
};
