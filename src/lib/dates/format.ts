const DATE_TIME_ZONE = 'Europe/Kyiv';

export function formatDate(value: Date | string): string {
  return new Intl.DateTimeFormat('uk-UA', {
    dateStyle: 'long',
    timeZone: DATE_TIME_ZONE,
  }).format(new Date(value));
}

export function formatDateTime(value: Date | string): string {
  return new Intl.DateTimeFormat('uk-UA', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: DATE_TIME_ZONE,
  }).format(new Date(value));
}
