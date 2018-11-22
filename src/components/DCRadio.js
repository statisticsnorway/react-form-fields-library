import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

import { fullFormField } from './common/FormField'
import { checkValueAndType } from './common/Utlities'

class DCRadio extends Component {
  constructor (props) {
    super(props)
    this.state = {value: ''}
  }

  componentDidMount () {
    if (checkValueAndType(this.props.value, 'string')) this.setState({value: this.props.value})
  }

  handleChange = (event, {value}) => {
    this.setState({value: value}, () => this.props.valueChange(this.props.name, this.state.value))
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
