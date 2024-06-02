export function setNavBtnActive(id: string, active: boolean): void {
  const btn = document.getElementById(id)!;

  if (active) {
    btn.setAttribute('class', 'nav-link mx-1 w-50 text-center fw-semibold text-decoration-underline');
  } else {
    btn.setAttribute('class', 'nav-link mx-1 w-50 text-center');
  }
}
