export function saveToStorage(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function saveToSessionStorage(key: string, data: any) {
  sessionStorage.setItem(key, JSON.stringify(data));
}
