import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'

import { fullFormField } from './common/FormField'
import { checkValueAndType } from './common/Utlities'

class DCNumber extends Component {
  constructor (props) {
    super(props)
    this.state = {value: ''}
  }

  componentDidMount () {
    if (checkValueAndType(this.props.value, 'number')) this.setState({value: this.props.value})
  }

  handleChange = (event) => {
    if (!isNaN(event.target.value)) {
      this.setState({value: event.target.value}, () => sessionStorage.setItem(this.props.name, this.state.value))
    }
  }

  component () {
    const {value} = this.state
    const {name, displayName, description, error, warning, required} = this.props
    const component = <Input name={name} placeholder={displayName} onChange={this.handleChange} value={value} />

    return fullFormField(displayName, description, error, warning, required, component)
  }

  render () {
    return this.component()
  }
}

export default DCNumber
