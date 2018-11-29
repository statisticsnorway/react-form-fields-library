export function checkValueAndType (value, type) {
  return value !== undefined && value !== '' && value !== null && typeof value === type
}

export function shorten (string) {
  if (typeof string === 'string' && string.length > 32) {
    return string.substring(0, 30) + '...'
  } else {
    return string
  }
}
