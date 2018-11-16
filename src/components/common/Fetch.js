export function fetchData (url, timeout = 3000) {
  return new Promise((resolve, reject) => {
    const controller = new AbortController()
    const signal = controller.signal

    let timer = setTimeout(() => {
      reject('Request timeout for url: ' + url)
      controller.abort()
    }, timeout)

    fetch(url, {
      signal: signal,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
          const options = []

          Object.keys(json).forEach((value, index) => {
            options.push({
              key: json[value].id,
              text: json[value].name[index].languageText, // TODO: Fix this when the ability to do it becomes available
              value: json[value].id
            })
          })

          resolve(options)
        })
      } else {
        response.text().then(text => {
          reject(text + ' (' + url + ')')
        })
      }
    }).catch(error => {
      reject(error.toString() + ' \'' + url + '\'')
    }).finally(() => clearTimeout(timer))
  })
}
