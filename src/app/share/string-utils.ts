export function format(text: string, params) {
  return text.replace(/{(\d+)}/g, (match, index) => {
    return typeof params[index] !== 'undefined'
      ? params[index]
      : match;
  });
}

export function timeToISOFormat(date: Date, utc = false): string {
  const hour = padLeft(`${utc ? date.getUTCHours() : date.getHours()}`, '0', 2);
  const minute = padLeft(`${utc ? date.getUTCMinutes() : date.getMinutes()}`, '0', 2);

  return `${hour}:${minute}`;
}

export function dateToISOFormat(date: Date, utc = false): string {
  const year = padLeft(`${utc ? date.getUTCFullYear() : date.getFullYear()}`, '0', 4);
  const month = padLeft(`${utc ? date.getUTCMonth() : date.getMonth()}`, '0', 2);
  const day = padLeft(`${utc ? date.getUTCDate() : date.getDate()}`, '0', 2);

  return `${year}-${month}-${day}`;
}


export function dateTimeToISOFormat(date: Date, utc = false): string {
  const year = padLeft(`${utc ? date.getUTCFullYear() : date.getFullYear()}`, '0', 4);
  const month = padLeft(`${utc ? date.getUTCMonth() : date.getMonth()}`, '0', 2);
  const day = padLeft(`${utc ? date.getUTCDate() : date.getDate()}`, '0', 2);
  const hour = padLeft(`${utc ? date.getUTCHours() : date.getHours()}`, '0', 2);
  const minute = padLeft(`${utc ? date.getUTCMinutes() : date.getMinutes()}`, '0', 2);

  return `${year}-${month}-${day}T${hour}:${minute}`;
}

export function padLeft(text: string, nedle: string, count: number) {
  if (text.length >= count) {
    return text;
  }

  return nedle.repeat(count - text.length) + text;
}

export function padRight(text: string, nedle: string, count: number) {
  if (text.length >= count) {
    return text;
  }

  return text + nedle.repeat(count - text.length);
}
