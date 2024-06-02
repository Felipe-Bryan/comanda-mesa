export function triggerAlert(
  msg: string,
  type: 'primary' | 'secondary' | 'success' | 'danger' | 'info' | 'warning' | 'light' | 'dark'
) {
  const alertPlaceholder = document.getElementById('alertPlaceholder')!;

  const alert = `
      <div class="alert alert-${type} alert-dismissible fixed-bottom mx-2" role="alert">
          <div>${msg}</div>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;

  alertPlaceholder.innerHTML += alert;

  setTimeout(() => {
    closealert();
  }, 4000);
}

function closealert() {
  const alertPlaceholder = document.getElementById('alertPlaceholder')!;

  alertPlaceholder.classList.add('fade');

  setTimeout(() => {
    alertPlaceholder.innerHTML = '';
  }, 500);

  setTimeout(() => {
    alertPlaceholder.classList.remove('fade');
  }, 1100);
}