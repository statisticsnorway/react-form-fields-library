import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'
import { FullFormField } from './common/FormField'

class DCNumber extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: this.props.value
    }
  }

  handleChange = (event) => {
    if (!isNaN(event.target.value)) {
      this.setState({value: event.target.value}, () => {
        sessionStorage.setItem(this.props.name, this.state.value)
      })
    }
  }

  render () {
    const {value} = this.state
    const {name, displayName, description, error, warning, required} = this.props

    const component = <Input name={name} placeholder={displayName} onChange={this.handleChange} value={value} />

    return FullFormField(displayName, description, error, warning, required, component)
  }
}

export default DCNumber
