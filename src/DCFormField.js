import React, { Component } from 'react'

import { DCBoolean, DCDate, DCDropdown, DCMultiInput, DCNumber, DCRadio, DCStatic, DCText } from './components'

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
    const {properties, valueChange, languageCode} = this.props
    const FormComponent = formComponents[properties.component]

    return <FormComponent {...properties} valueChange={valueChange} languageCode={languageCode} />
  }
}

export default DCFormField
