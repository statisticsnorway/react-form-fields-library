import React, { Component } from 'react'
import { TextArea } from 'semantic-ui-react'

import { checkValueAndType, cutoffString, fullFormField } from './common'

class UIText extends Component {
  constructor (props) {
    super(props)
    this.state = {value: ''}
  }

  componentDidMount () {
    const {value} = this.props

    if (checkValueAndType(value, 'string')) this.setState({value: value})
  }

  handleChange = (event) => {
    const {valueChange, name} = this.props

    this.setState({value: event.target.value}, () => valueChange(name, this.state.value))
  }

  render () {
    const {value} = this.state
    const {name, displayName, description, error, warning, required} = this.props
    const component = <TextArea autoHeight rows={1} name={name} placeholder={cutoffString(displayName)} value={value}
                                onChange={this.handleChange} />

    return fullFormField(displayName, description, error, warning, required, component)
  }
}

export default UIText
