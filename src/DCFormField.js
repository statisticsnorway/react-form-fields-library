import React, { Component } from 'react'

import DCText from './components/DCText'
import DCBoolean from './components/DCBoolean'
import DCNumber from './components/DCNumber'
import DCRadio from './components/DCRadio'
import DCDate from './components/DCDate'
import DCDropdown from './components/DCDropdown'
import DCMultiInput from './components/DCMultiInput'
import DCStatic from './components/DCStatic'

const formComponents = {
  DCText: DCText,
  DCBoolean: DCBoolean,
  DCNumber: DCNumber,
  DCRadio: DCRadio,
  DCDate: DCDate,
  DCDropdown: DCDropdown,
  DCMultiInput: DCMultiInput,
  DCStatic: DCStatic
}

class DCFormField extends Component {
  render () {
    const FormComponent = formComponents[this.props.properties.component]

    return <FormComponent {...this.props.properties} valueChange={this.props.valueChange} />
  }
}

export default DCFormField
