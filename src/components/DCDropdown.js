import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { FullFormField } from './common/FormField'
import { fetchData } from './common/Fetch'

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

  componentDidMount () {
    Promise.all(
      Object.keys(this.props.endpoints).map(key => {
        const url = this.props.endpoints[key]

        return fetchData(url)
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
