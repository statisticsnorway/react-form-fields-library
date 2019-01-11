import React, { Component } from 'react'

import { UIBoolean, UIDate, UIDropdown, UIMultiInput, UINumber, UIRadio, UIStatic, UIText } from './components'

const formComponents = {
  UIText: UIText,
  UIBoolean: UIBoolean,
  UINumber: UINumber,
  UIRadio: UIRadio,
  UIDate: UIDate,
  UIDropdown: UIDropdown,
  UIMultiInput: UIMultiInput,
  UIStatic: UIStatic
}

class UIFormField extends Component {
  render () {
    const {properties, valueChange, languageCode} = this.props
    const FormComponent = formComponents[properties.component]

    return <FormComponent {...properties} valueChange={valueChange} languageCode={languageCode} />
  }
}

export default UIFormField
