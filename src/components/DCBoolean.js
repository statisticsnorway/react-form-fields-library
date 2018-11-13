import React, { Component } from 'react'
import { Checkbox } from 'semantic-ui-react'

import { simpleFormField } from './common/FormField'
import { checkValueAndType } from './common/Utlities'

class DCBoolean extends Component {
  constructor (props) {
    super(props)
    this.state = {value: false}
  }

  componentDidMount () {
    if (checkValueAndType(this.props.value, 'boolean')) this.setState({value: this.props.value})
  }

  handleChange = () => {
    this.setState({value: !this.state.value}, () => sessionStorage.setItem(this.props.name, this.state.value))
  }

  component () {
    const {value} = this.state
    const {displayName, description} = this.props
    const component = <Checkbox label={displayName} onChange={this.handleChange} checked={value} />

    return simpleFormField(displayName, description, component)
  }

  render () {
    return this.component()
  }
}

export default DCBoolean
