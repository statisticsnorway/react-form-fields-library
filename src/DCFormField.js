import React, { Component } from 'react'
import DCText from './components/DCText'
import DCBoolean from './components/DCBoolean'
import DCNumber from './components/DCNumber'
import DCRadio from './components/DCRadio'
import DCDate from './components/DCDate'
import DCDropdown from './components/DCDropdown'

class DCFormField extends Component {
  formComponents = {
    DCText: DCText,
    DCBoolean: DCBoolean,
    DCNumber: DCNumber,
    DCRadio: DCRadio,
    DCDate: DCDate,
    DCDropdown: DCDropdown
  }

  render () {
    const FormComponent = this.formComponents[this.props.properties.component]

    return <FormComponent {...this.props.properties} />
  }
}

export default DCFormField
