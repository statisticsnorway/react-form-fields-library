import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { FullFormField } from './common/FormField'

class DCDropdown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ready: false,
      problem: false,
      errorMessage: '',
      value: this.props.value,
      options: []
    }
  }

  fetching (url) {
    return new Promise((resolve, reject) => {
      fetch(url, {
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
      })
    })
  }

  componentDidMount () {
    Promise.all(
      Object.keys(this.props.endpoints).map(key => {
        const url = this.props.endpoints[key]

        return this.fetching(url)
      })
    ).then(allOptions => {
      const options = [].concat.apply([], allOptions)

      this.setState({
        ready: true,
        options: options
      })
    }).catch(error => {
      this.setState({
        ready: true,
        problem: true,
        errorMessage: error
      })
    })
  }

  handleChange = (value) => {
    this.setState({value: value}, () => {
      sessionStorage.setItem(this.props.name, this.state.value)
    })
  }

  render () {
    const {ready, problem, value, options, errorMessage} = this.state
    const {displayName, description, error, warning, required, multiSelect} = this.props

    if (!ready) return FullFormField(displayName, description, error, warning, required,
      <Dropdown placeholder={displayName} selection options={[]} loading disabled />)

    if (ready && problem) return FullFormField(displayName, description, errorMessage, warning, required,
      <Dropdown selection options={[]} disabled />)

    if (ready && !problem) return FullFormField(displayName, description, error, warning, required,
      <Dropdown placeholder={displayName} value={value} options={options} clearable selection multiple={multiSelect}
                onChange={(event, {value}) => this.handleChange(value)} />)

    return null
  }
}

export default DCDropdown
