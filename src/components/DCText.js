import React, { Component } from 'react'
import { TextArea } from 'semantic-ui-react'

import { fullFormField } from './common/FormField'
import { checkValueAndType } from './common/Utlities'

class DCText extends Component {
  constructor (props) {
    super(props)
    this.state = {value: ''}
  }

  componentDidMount () {
    if (checkValueAndType(this.props.value, 'string')) this.setState({value: this.props.value})
  }

  handleChange = (event) => {
    this.setState({value: event.target.value}, () => this.props.valueChange(this.props.name, this.state.value))
  }

  component () {
    const {value} = this.state
    const {name, displayName, description, error, warning, required} = this.props
    const component = <TextArea autoHeight rows={1} name={name} placeholder={displayName} value={value}
                                onChange={this.handleChange} />

    return fullFormField(displayName, description, error, warning, required, component)
  }

  render () {
    return this.component()
  }
}

export default DCText
