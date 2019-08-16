export function format(text: string, params) {
  return text.replace(/{(\d+)}/g, (match, index) => {
    return typeof params[index] !== 'undefined'
      ? params[index]
      : match;
  });
}
