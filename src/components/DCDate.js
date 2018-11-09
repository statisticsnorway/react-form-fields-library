import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import { FullFormField } from './common/FormField'

class DCDate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: this.props.value
    }
  }

  handleChange = (value) => {
    this.setState({value: value}, () => {
      sessionStorage.setItem(this.props.name, this.state.value)
    })
  }

  render () {
    const {value} = this.state
    const {displayName, description, error, warning, required} = this.props

    const datePicker = <DatePicker selected={value === '' ? null : value} onChange={this.handleChange} isClearable
                                   dateFormat='DD/MM/YYYY' placeholderText={displayName} dropdownMode='select'
                                   todayButton='I dag' showWeekNumbers />

    const component = <Form.Group inline children={datePicker} />

    return FullFormField(displayName, description, error, warning, required, component)
  }
}

export default DCDate
