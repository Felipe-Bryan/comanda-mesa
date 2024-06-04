export function controlIdGenerate(): string {
  const date = new Date();

  const day = String(date.getTime());

  return `${day[5]}${day[6]}${day[7]}${day[8]} - ${day[9]}${day[10]}${day[11]}${day[12]}`;
}
