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

          for (const key in json) {
            if (json.hasOwnProperty(key)) {
              options.push({
                key: json[key].id,
                text: json[key].name[0].languageText, // TODO: Fix this when the ability to do it becomes available
                value: json[key].id
              })
            }
          }

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
