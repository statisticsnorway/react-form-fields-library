import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'

import { fullFormField } from './common/FormField'
import { checkValueAndType, shorten } from './common/Utlities'
import { UI } from './common/ENUM'

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
      const {value, multiSelect} = this.props

      this.setState({options: options}, () => {
        if (checkValueAndType(value, 'string') || (Array.isArray(value) && value.length !== 0)) {
          this.setState({value: value}, () => resolve())
        } else {
          this.setState({value: multiSelect ? [] : ''}, () => resolve())
        }
      })
    })
  }

  componentDidMount () {
    if (this.props.hasOwnProperty('options')) {
      this.setOptionsAndValue(this.props.options).then(() => this.setState({ready: true}))
    } else {
      this.setOptionsAndValue([]).then(() => this.setState({ready: true}))
    }
  }

  handleChange = (event, data) => {
    const {valueChange, name} = this.props

    this.setState({value: data.value}, () => valueChange(name, this.state.value))
  }

  render () {
    const {ready, problem, value, options, errorMessage} = this.state
    const {displayName, description, error, warning, required, multiSelect, searchable, languageCode} = this.props

    if (!ready) {
      const component = <Dropdown placeholder={shorten(displayName)} selection options={[]} loading disabled />

      return fullFormField(displayName, description, error, warning, required, component)
    }

    if (ready && problem) {
      const component = <Dropdown selection options={[]} disabled />

      return fullFormField(displayName, description, error, errorMessage, required, component)
    }

    if (ready && !problem) {
      const component = <Dropdown placeholder={options.length === 0 ? UI.NO_OPTIONS[languageCode] : shorten(displayName)}
                                  value={value} options={options} clearable selection multiple={multiSelect}
                                  disabled={options.length === 0} onChange={this.handleChange} search={searchable}
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
