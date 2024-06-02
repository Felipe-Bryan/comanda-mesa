export function getStorageData(key: string) {
  const data = JSON.parse(localStorage.getItem(key) || '[]');
  return data;
}

export function getSessionStorageData(key: string) {
  const data = JSON.parse(sessionStorage.getItem(key) || '[]');
  return data;
}
