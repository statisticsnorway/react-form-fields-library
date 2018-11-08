import React, { Component } from 'react'
import DCText from './components/DCText'
import DCBoolean from './components/DCBoolean'
import DCNumber from './components/DCNumber'

class DCFormField extends Component {
  formComponents = {
    DCText: DCText,
    DCBoolean: DCBoolean,
    DCNumber: DCNumber
  }

  render () {
    const FormComponent = this.formComponents[this.props.tag]

    return <FormComponent {...this.props.additionalProps} />
  }
}

export default DCFormField
