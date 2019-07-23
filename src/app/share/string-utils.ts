export function format(text: string, params) {
  return text.replace(/{(\d+)}/g, function(match, number) {
    return typeof params[number] != 'undefined'
      ? params[number]
      : match;
  });
}
