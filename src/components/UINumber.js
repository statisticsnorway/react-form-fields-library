import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'

import { checkValueAndType, cutoffString, fullFormField } from './common'

class UINumber extends Component {
  constructor (props) {
    super(props)
    this.state = {value: ''}
  }

  componentDidMount () {
    const {value} = this.props

    if (checkValueAndType(value, 'number')) this.setState({value: value})
  }

  handleChange = (event) => {
    if (!isNaN(event.target.value)) {
      const {valueChange, name} = this.props

      let value = ''

      if (event.target.value !== '') value = parseFloat(event.target.value)

      this.setState({value: value}, () => valueChange(name, this.state.value))
    }
  }

  render () {
    const {value} = this.state
    const {name, displayName, description, error, warning, required} = this.props
    const component = <Input icon={{name: 'hashtag', color: 'teal'}} iconPosition='left' name={name} value={value}
                             placeholder={cutoffString(displayName)} onChange={this.handleChange} />

    return fullFormField(displayName, description, error, warning, required, component)
  }
}

export default UINumber
