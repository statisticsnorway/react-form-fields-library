import React, { Component } from 'react'
import { Checkbox } from 'semantic-ui-react'

import { checkValueAndType, simpleFormField } from './common'

class DCBoolean extends Component {
  constructor (props) {
    super(props)
    this.state = {value: false}
  }

  componentDidMount () {
    const {value} = this.props

    if (checkValueAndType(value, 'boolean')) this.setState({value: value})
  }

  handleChange = () => {
    const {valueChange, name} = this.props

    this.setState({value: !this.state.value}, () => valueChange(name, this.state.value))
  }

  render () {
    const {value} = this.state
    const {displayName, description} = this.props
    const component = <Checkbox label={displayName} onChange={this.handleChange} checked={value} />

    return simpleFormField(displayName, description, component)
  }
}

export default DCBoolean
