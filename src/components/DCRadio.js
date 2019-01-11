import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

import { checkValueAndType, fullFormField } from './common'

class DCRadio extends Component {
  constructor (props) {
    super(props)
    this.state = {value: ''}
  }

  componentDidMount () {
    const {value} = this.props

    if (checkValueAndType(value, 'string')) this.setState({value: value})
  }

  handleChange = (event, {value}) => {
    const {valueChange, name} = this.props

    this.setState({value: value}, () => valueChange(name, this.state.value))
  }

  render () {
    const {value} = this.state
    const {displayName, description, error, warning, required, options} = this.props
    const radios = Object.keys(options).map(key => {
      return (
        <Form.Radio key={key} label={options[key].text} value={options[key].value}
                    checked={value === options[key].value} onChange={this.handleChange} />
      )
    })
    const component = <Form.Group inline children={radios} style={{margin: 0}} />

    return fullFormField(displayName, description, error, warning, required, component)
  }
}

export default DCRadio
