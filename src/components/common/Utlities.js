export function checkValueAndType (value, type) {
  return value !== undefined && value !== '' && value !== null && typeof value === type
}
