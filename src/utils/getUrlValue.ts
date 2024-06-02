export function getUrlValue(key: string): string {
  const urlParams = new URLSearchParams(window.location.search);

  const value = urlParams.get(key) || '';

  return value;
}
