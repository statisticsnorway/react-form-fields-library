import React, { Component } from 'react'
import { Checkbox } from 'semantic-ui-react'
import { SimpleFormField } from './common/FormField'

class DCBoolean extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: this.props.value
    }
  }

  handleChange = () => {
    this.setState({value: !this.state.value}, () => {
      sessionStorage.setItem(this.props.name, this.state.value)
    })
  }

  render () {
    const {value} = this.state
    const {displayName, description} = this.props
    const component = <Checkbox label={displayName} onChange={this.handleChange} checked={value} />

    return SimpleFormField(displayName, description, component)
  }
}

export default DCBoolean
