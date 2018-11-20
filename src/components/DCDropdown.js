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
        if (checkValueAndType(this.props.value, 'string') || Array.isArray(this.props.value)) {
          this.setState({value: this.props.value}, () => resolve())
        } else {
          this.setState({value: this.props.multiSelect ? [] : ''}, () => resolve())
        }
      })
    })
  }

  componentDidMount () {
    if (this.props.hasOwnProperty('options')) {
      this.setOptionsAndValue(this.props.options).then(() => this.setState({ready: true}))
    } else {
      Promise.all(
        Object.keys(this.props.endpoints).map(key => {
          return fetchData(this.props.endpoints[key])
        })
      ).then(allOptions => {
        const options = [].concat.apply([], allOptions)

        this.setOptionsAndValue(options).then(() => this.setState({ready: true}))
      }).catch(error => {
        this.setState({
          ready: true,
          problem: true,
          errorMessage: error
        })
      })
    }
  }

  handleChange = (event, data) => {
    this.setState({value: data.value}, () => this.props.valueChange(this.props.name, this.state.value))
  }

  render () {
    const {ready, problem, value, options, errorMessage} = this.state
    const {displayName, description, error, warning, required, multiSelect, searchable} = this.props

    if (!ready) {
      const component = <Dropdown placeholder={displayName} selection options={[]} loading disabled />

      return fullFormField(displayName, description, error, warning, required, component)
    }

    if (ready && problem) {
      const component = <Dropdown selection options={[]} disabled />

      return fullFormField(displayName, description, errorMessage, warning, required, component)
    }

    if (ready && !problem) {
      const component = <Dropdown placeholder={options.length === 0 ? 'No options' : displayName} search={searchable}
                                  value={value} options={options} clearable selection multiple={multiSelect}
                                  disabled={options.length === 0} onChange={this.handleChange}
                                  icon={{
                                    name: searchable ? 'search' : 'dropdown',
                                    disabled: !!searchable,
                                    size: searchable ? 'small' : null
                                  }} />
      return fullFormField(displayName, description, error, warning, required, component)
    }

    return null
  }
}

export default DCDropdown
