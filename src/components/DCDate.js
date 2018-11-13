import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import { Form } from 'semantic-ui-react'

import { fullFormField } from './common/FormField'
import { checkValueAndType } from './common/Utlities'

class DCDate extends Component {
  constructor (props) {
    super(props)
    this.state = {value: null}
  }

  componentDidMount () {
    if (checkValueAndType(this.props.value, 'object')) this.setState({value: this.props.value})
  }

  handleChange = (value) => {
    this.setState({value: value}, () => sessionStorage.setItem(this.props.name, this.state.value))
  }

  component () {
    const {value} = this.state
    const {displayName, description, error, warning, required} = this.props
    const datePicker = <DatePicker selected={value} onChange={this.handleChange} isClearable showWeekNumbers
                                   dateFormat='DD/MM/YYYY' placeholderText={displayName} dropdownMode='select'
                                   todayButton='I dag' />
    const component = <Form.Group inline children={datePicker} style={{margin: 0}} />

    return fullFormField(displayName, description, error, warning, required, component)
  }

  render () {
    return this.component()
  }
}

export default DCDate
