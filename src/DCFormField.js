import React, { Component } from 'react'
import DCText from './components/DCText'
import DCBoolean from './components/DCBoolean'

class DCFormField extends Component {
  formComponents = {
    DCText: DCText,
    DCBoolean: DCBoolean
  }

  render () {
    const FormComponent = this.formComponents[this.props.tag]

    return <FormComponent {...this.props.additionalProps} />
  }
}

export default DCFormField
