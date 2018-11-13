import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'

import { fullFormField } from './common/FormField'
import { fetchData } from './common/Fetch'
import { checkValueAndType } from './common/Utlities'

class DCDropdown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ready: false,
      problem: false,
      errorMessage: '',
      value: null,
      options: []
    }
  }

  setOptionsAndValue (options) {
    return new Promise(resolve => {
      this.setState({options: options}, () => {
        if (checkValueAndType(this.props.value, 'string') || checkValueAndType(this.props.value, 'array')) {
          this.setState({value: this.props.value}, () => resolve())
        } else {
          this.setState({value: this.props.multiSelect ? [] : ''}, () => resolve())
        }
      })
    })
  }

  componentDidMount () {
    Promise.all(
      Object.keys(this.props.endpoints).map(key => {
        return fetchData(this.props.endpoints[key])
      })
    ).then(allOptions => {
      const options = [].concat.apply([], allOptions)

      this.setOptionsAndValue(options).then(() => {
        this.setState({ready: true})
      })
    }).catch(error => {
      this.setState({
        ready: true,
        problem: true,
        errorMessage: error
      })
    })
  }

  handleChange = (event, data) => {
    this.setState({value: data.value}, () => sessionStorage.setItem(this.props.name, this.state.value))
  }

  component () {
    const {ready, problem, value, options, errorMessage} = this.state
    const {displayName, description, error, warning, required, multiSelect} = this.props

    if (!ready) return fullFormField(displayName, description, error, warning, required,
      <Dropdown placeholder={displayName} selection options={[]} loading disabled />)

    if (ready && problem) return fullFormField(displayName, description, errorMessage, warning, required,
      <Dropdown selection options={[]} disabled />)

    if (ready && !problem) return fullFormField(displayName, description, error, warning, required,
      <Dropdown placeholder={displayName} value={value} options={options} clearable selection multiple={multiSelect}
                onChange={this.handleChange} />)

    return null
  }

  render () {
    return this.component()
  }
}

export default DCDropdown
