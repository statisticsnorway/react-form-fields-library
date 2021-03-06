import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import { Container, Form, Grid, Header, Icon } from 'semantic-ui-react'

import { checkValueAndType, cutoffString, fullFormField, UI } from './common'

class UIDate extends Component {
  constructor (props) {
    super(props)
    this.state = { value: this.props.multiple ? [null] : null }
  }

  componentDidMount () {
    const { value } = this.props

    if (checkValueAndType(value, 'string' || checkValueAndType(value, 'array'))) this.setState({ value: value })
  }

  convertDate = (date) => {
    if (date !== null && typeof date === 'string') {
      return new Date(date)
    } else {
      return date
    }
  }

  handleChange = (index, date) => {
    const { valueChange, name, multiple } = this.props

    if (multiple) {
      const value = [...this.state.value]

      value[parseInt(index)] = date

      this.setState({ value: value }, () => valueChange(name, this.state.value))
    } else {
      this.setState({ value: date }, () => valueChange(name, this.state.value))
    }
  }

  handleAddEntry = () => {
    this.setState({ value: [...this.state.value, null] }, () =>
      this.props.valueChange(this.props.name, this.state.value)
    )
  }

  handleRemoveEntry (index) {
    const { valueChange, name } = this.props
    const entries = [...this.state.value]

    entries.splice(parseInt(index), 1)

    this.setState({ value: entries }, () => valueChange(name, this.state.value))
  }

  render () {
    const { value } = this.state
    const { displayName, description, error, warning, required, multiple, languageCode } = this.props
    const icon = <Icon name='calendar alternate outline' size='big' style={{ paddingTop: '0.5rem' }} color='teal' />

    let component

    if (multiple) {
      component =
        <Grid>
          {value.map((entry, index) => {
            const datePicker = <DatePicker selected={this.convertDate(value[index])} onChange={this.handleChange.bind(this, index)}
                                           placeholderText={cutoffString(displayName)}
                                           showWeekNumbers dropdownMode='select' todayButton={UI.TODAY[languageCode]} />
            return (
              <Grid.Row key={index}>
                <Grid.Column width={1} style={{ margin: 0, paddingRight: 0, paddingTop: '0.35rem' }}>
                  <Container textAlign='center'>
                    <Header as='h4' color='teal' content={(index + 1) + '.'} style={{ marginBottom: 0 }} />
                    <Icon link name='close' color='red' onClick={this.handleRemoveEntry.bind(this, index)} />
                  </Container>
                </Grid.Column>
                <Grid.Column width={15} style={{ margin: 0, paddingLeft: 0 }}>
                  <Form.Group inline style={{ margin: 0 }} children={<div>{datePicker}{icon}</div>} />
                </Grid.Column>
              </Grid.Row>
            )
          })}
          <Grid.Row style={{ paddingTop: 0 }}>
            <Grid.Column width={16} style={{ margin: 0 }}>
              <Container textAlign='right'>
                <Icon link name='plus' color='green' size='large' onClick={this.handleAddEntry} />
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    } else {
      const datePicker = <DatePicker selected={this.convertDate(value)} onChange={this.handleChange.bind(this, null)} isClearable
                                     placeholderText={cutoffString(displayName)} showWeekNumbers
                                     dropdownMode='select' todayButton={UI.TODAY[languageCode]} />
      component = <Form.Group inline style={{ margin: 0 }} children={<div>{datePicker}{icon}</div>} />
    }

    return fullFormField(displayName, description, error, warning, required, component)
  }
}

export default UIDate
