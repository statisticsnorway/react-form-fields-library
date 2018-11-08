import React, { Component } from 'react'
import { TextArea } from 'semantic-ui-react'
import { FullFormField } from './common/FormField'

class DCText extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: this.props.value
    }
  }

  handleChange = (event) => {
    this.setState({value: event.target.value}, () => {
      sessionStorage.setItem(this.props.name, this.state.value)
    })
  }

  render () {
    const {value} = this.state
    const {name, displayName, description, error, warning, required} = this.props

    const component = <TextArea autoHeight rows={1} name={name} placeholder={displayName} onChange={this.handleChange}
                                value={value} />

    return FullFormField(displayName, description, error, warning, required, component)
  }
}

export default DCText
