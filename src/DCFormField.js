import React, { Component } from 'react'
import DCText from './components/DCText'

class DCFormField extends Component {
  formComponents = {
    DCText: DCText
  }

  render () {
    const FormComponent = this.formComponents[this.props.tag]

    return <FormComponent {...this.props.additionalProps} />
  }
}

export default DCFormField
