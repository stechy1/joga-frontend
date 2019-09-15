export function objectToFormData(object: any): FormData {
  const formData = new FormData();

  const keys = Object.keys(object);
  for (const key in keys) {
    const value = object[keys[key]];
    if (value !== undefined) {
      formData.append(keys[key], `${value}`);
    }
  }

  return formData;
}
