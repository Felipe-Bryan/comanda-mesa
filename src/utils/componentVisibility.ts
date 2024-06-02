export function componentVisibility(id: string, status: 'hide' | 'show'): void {
  const component: HTMLElement = document.getElementById(id)!;

  const selection = status;

  if (selection == 'show') {
    component.removeAttribute('style');
  } else {
    component.setAttribute('style', 'display: none');
  }
}
